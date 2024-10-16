"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendOtp, resetPassword } from '../services/Auth';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import OtpInput from '../components/Input/OtpInput';


interface DecodedToken {
    id: string;
    exp: number;
    otp?: string; // Si l'OTP est inclus dans le token
}


const emailSchema = z.object({
    email: z.string().min(1, 'Email requis').email('Email invalide'),
});

const otpSchema = z.object({
    otp: z.string().length(4, 'Le code doit faire 4 chiffres'),
});

const passwordSchema = z.object({
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    confirmerPassword: z.string().min(6, 'La confirmation du mot de passe doit contenir au moins 6 caractères')
}).refine(data => data.password === data.confirmerPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmerPassword"],
});

type EmailFormValues = z.infer<typeof emailSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function Page() {

    const router = useRouter();
    const [stage, setStage] = useState<'email' | 'otp' | 'reset'>('email');
    const [otpToken, setOtpToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);


    const { register: registerEmail, handleSubmit: handleEmailSubmit, formState: { errors: emailErrors } } = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
    });

    // const { register: registerOtp, handleSubmit: handleOtpSubmit } = useForm<OtpFormValues>({
    //     resolver: zodResolver(otpSchema),
    // });

    const { register, handleSubmit, formState: { errors } } = useForm<OtpFormValues>();


    const { register: registerPassword, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors } } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
    });




    const startCountdown = (token: string) => {
        const decodedToken = jwt.decode(token) as DecodedToken;
        const expirationTime = decodedToken.exp * 1000; // Convertir en millisecondes
        const now = Date.now();
        const timeLeft = expirationTime - now;

        if (timeLeft > 0) {
            setCountdown(Math.floor(timeLeft / 1000)); // Convertir en secondes

            const interval = setInterval(() => {
                setCountdown(prev => {
                    if (prev !== null && prev > 0) {
                        return prev - 1;
                    } else {
                        clearInterval(interval);
                        setStage('email'); // Retourner au formulaire d'email si le temps est écoulé
                        return null;
                    }
                });
            }, 1000);
        } else {
            setStage('email'); // Si le token est déjà expiré
        }
    };


    const onEmailSubmit = async (data: EmailFormValues) => {
        try {
            const apiResponse = await sendOtp(data.email);
            if (apiResponse.code === 200) {
                setOtpToken(apiResponse.data.token);
                localStorage.setItem('otpToken', apiResponse.data.token);
                setStage('otp');
                startCountdown(apiResponse.data.token); // Démarrer le décompte
                toast.success('OTP envoyé ! Vérifiez votre email.');
            } else {
                toast.error(apiResponse.messages!);
            }
        } catch (error) {
            toast.error("Erreur lors de l'envoi de l'OTP.");
        }
    };

    // Effet pour nettoyer le décompte lorsque le composant est démonté
    useEffect(() => {
        return () => {
            setCountdown(null); // Réinitialiser le décompte
        };
    }, []);

    const onOtpSubmits2 = async (data: OtpFormValues) => {
        console.log('OTP soumis:', data); // Ajoute ceci pour vérifier l'appel
        const otp = data.otp;
    
        const decodedToken = jwt.decode(otpToken!) as any;
        const isExpired = decodedToken.exp * 1000 < Date.now();
    
        if (isExpired) {
            toast.error("Le token a expiré. Veuillez ressaisir votre email.");
            setStage('email');
            return;
        }
    
        if (otp === decodedToken.otp) {
            toast.success("Token vérifié avec succès !");
            setStage('reset');
        } else {
            toast.error("Token invalide.");
        }
    };

    const onOtpSubmit = async () => {
        
        const otp = otpDigits.join('');
        
        // Validation simple
        if (otp.length !== 4) {
            toast.error("L'OTP doit faire 4 chiffres.");
            return;
        }

        setIsLoading(true); // Démarrer le chargement

        try {
            console.log('OTP soumis:', otp);

            // Vérifiez que otpToken est valide
            const otpTokens = localStorage.getItem('otpToken');
            if (!otpTokens) {
                toast.error("Token OTP manquant. Veuillez ressaisir votre email.");
                setStage('email');
                return;
            }

            const decodedToken = jwt.decode(otpTokens) as DecodedToken; // Utiliser l'interface

            console.log('decoded Token:', decodedToken);
            // Vérifiez si le token a une propriété exp
            if (!decodedToken || typeof decodedToken.exp !== 'number') {
                toast.error("Token OTP invalide.");
                setStage('email');
                return;
            }

            const isExpired = decodedToken.exp * 1000 < Date.now();

            if (isExpired) {
                toast.error("Le token a expiré. Veuillez ressaisir votre email.");
                setStage('email');
                return;
            }

            // Vérifiez si l'OTP correspond
            if (otp === decodedToken.otp) {
                toast.success("Token vérifié avec succès !");
                setStage('reset');
            } else {
                toast.error("Token invalide.");
                // Réinitialiser les champs d'OTP si nécessaire
                setOtpDigits(['', '', '', '']);
            }
        } catch (error) {
            console.error("Erreur lors de la vérification de l'OTP:", error);
            toast.error("Une erreur s'est produite lors de la vérification.");
        } finally {
            setIsLoading(false); // Arrêter le chargement
        }
    };
    
    const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleOtpChange = (index: number, value: string) => {
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = value;
        setOtpDigits(newOtpDigits);

        if (value && index < 3) {
            otpRefs.current[index + 1]?.focus();
        } else if (!value && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };
    const onPasswordSubmit = async (data: PasswordFormValues) => {
        try {
            const apiResponse = await resetPassword(data.password);
            if (apiResponse.code === 200) {
                toast.success("Mot de passe modifié avec succès !");
                router.push('/login');
            } else {
                toast.error(apiResponse.messages!);
            }
        } catch (error) {
            toast.error("Erreur lors de la modification du mot de passe.");
        }
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="flex min-h-full h-screen">
                <div className="flex flex-1 flex-col justify-center py-0 px-6 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <h1 className="text-4xl font-bold tracking-tight">Modifier mon mot de passe</h1>
                        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">{stage === 'email' ? "Entrez votre email" : stage === 'otp' ? "Entrez votre OTP" : "Choisissez un nouveau mot de passe"}</h1>
                        <div className="mt-6">

                            {stage === 'email' && (
                                <form onSubmit={handleEmailSubmit(onEmailSubmit)} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                                        <input
                                            id="email"
                                            {...registerEmail('email')}
                                            type="email"
                                            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                        />
                                        {emailErrors.email && <p>{emailErrors.email.message}</p>}
                                    </div>
                                    <button className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2" type="submit">Vérifier l&apos;email</button>
                                </form>
                            )}

                            {stage === 'otp' && (

                                <form onSubmit={handleSubmit(onOtpSubmit)} className="space-y-6">
                                    <div className="flex space-x-2">
                                        {otpDigits.map((digit, index) => (
                                            <OtpInput
                                                key={index}
                                                ref={(input) => { otpRefs.current[index] = input; }}
                                                value={digit}
                                                onChange={(value) => handleOtpChange(index, value)}
                                            />
                                        ))}
                                    </div>
                                    {countdown !== null && (
                                        <p>Temps restant : {countdown} secondes</p>
                                    )}
                                    <button
                                        className={`flex w-full justify-center rounded-md border border-transparent ${isLoading ? 'bg-gray-400' : 'bg-black'} py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2`}
                                        type="submit"
                                        disabled={isLoading} >
                                        {isLoading ? 'Vérification...' : 'Vérifier le token'}
                                    </button>
                                    {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
                                </form>

                            )}

                            {stage === 'reset' && (
                                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900" htmlFor="password">Nouveau mot de passe</label>
                                        <input
                                            id="password"
                                            {...registerPassword('password')}
                                            type="password"
                                            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                        />
                                        {passwordErrors.password && <p>{passwordErrors.password.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900" htmlFor="confirmerPassword">Confirmer le mot de passe</label>
                                        <input
                                            id="confirmerPassword"
                                            {...registerPassword('confirmerPassword')}
                                            type="password"
                                            className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                        />
                                        {passwordErrors.confirmerPassword && <p>{passwordErrors.confirmerPassword.message}</p>}
                                    </div>
                                    <button className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2" type="submit">Modifier le mot de passe</button>
                                </form>
                            )}

                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">

                    {/* <Image className="absolute inset-0 h-full w-full object-cover brightness-50" src="/img/password.jpg" alt="" layout="fill" objectFit="cover" /> */}

                    <div className="absolute inset-0 h-full w-full">
                        <Image
                            src="/img/password.jpg"
                            alt=""
                            fill
                            className="object-cover brightness-50"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                </div>
            </div>
        </>
    );
}
