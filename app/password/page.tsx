"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendOtp, resetPassword } from '../services/Auth';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import OtpInput from '../components/Input/OtpInput';

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
    // const otpRefs = useRef(Array.from({ length: 4 }, () => React.createRef<HTMLInputElement>()));

    const { register: registerEmail, handleSubmit: handleEmailSubmit, formState: { errors: emailErrors } } = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
    });

    const { register: registerOtp, handleSubmit: handleOtpSubmit } = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
    });

    const { register: registerPassword, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors } } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
    });

    const onEmailSubmit = async (data: EmailFormValues) => {
        try {
            const apiResponse = await sendOtp(data.email);
            if (apiResponse.code === 200) {
                setOtpToken(apiResponse.data.otpToken);
                localStorage.setItem('otpToken', apiResponse.data.otpToken);
                setStage('otp');
                toast.success('OTP envoyé ! Vérifiez votre email.');
            } else {
                toast.error(apiResponse.messages!);
            }
        } catch (error) {
            toast.error("Erreur lors de l'envoi de l'OTP.");
        }
    };

    const onOtpSubmits = async (data: OtpFormValues) => {
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

    const onOtpSubmit = (data: { otp: string }) => {
        console.log('OTP soumis:', data.otp);
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
                                    <button className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2" type="submit">Vérifier l'email</button>
                                </form>
                            )}

                            {stage === 'otp' && (
                                <form onSubmit={handleOtpSubmit(onOtpSubmit)} className="space-y-6">
                                    <div className="flex space-x-2">

                                        {/* {otpRefs.current.map((ref, index) => (
                                            <input
                                                key={index}
                                                ref={ref}
                                                type="text"
                                                maxLength={1}
                                                onChange={(e) => {
                                                    if (e.target.value.length === 1 && index < otpRefs.current.length - 1) {
                                                        otpRefs.current[index + 1].current!.focus();
                                                    } else if (e.target.value.length === 0 && index > 0) {
                                                        otpRefs.current[index - 1].current!.focus();
                                                    }
                                                }}
                                                className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm outline-none focus:border-orange-600 focus:ring-black"
                                            />
                                        ))} */} {otpDigits.map((digit, index) => (
                        <OtpInput
                        key={index}
                        ref={(input) => { otpRefs.current[index] = input; }}
                        value={digit}
                        onChange={(value) => handleOtpChange(index, value)}
                    />
                ))}


                                    </div>
                                    <button className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2" type="submit">Vérifier le token</button>
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
                    <Image className="absolute inset-0 h-full w-full object-cover brightness-50" src="/img/mdppasse.jpeg" alt="" layout="fill" objectFit="cover" />
                </div>
            </div>
        </>
    );
}
