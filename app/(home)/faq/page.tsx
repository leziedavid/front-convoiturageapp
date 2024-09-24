// pages/trajet.js
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default async function Page() {

    interface FAQ {
        id: number;
        question: string;
        answer: string;
    }

    const faqs: FAQ[] = [
        {
            id: 1,
            question: "Comment fonctionne Covoit’Ivoire ?",
            answer: "Covoit’Ivoire est une plateforme qui permet aux conducteurs et aux passagers de partager des trajets en voiture. Les conducteurs publient leurs trajets disponibles, et les passagers peuvent réserver une place dans le véhicule. Nous assurons la sécurité et le confort des trajets grâce à un système de vérification et à une interface conviviale.",
        },
        {
            id: 2,
            question: "Comment puis-je devenir conducteur sur Covoit’Ivoire ?",
            answer: "Pour devenir conducteur, inscrivez-vous sur notre plateforme, remplissez les informations nécessaires sur votre véhicule, et soumettez vos trajets. Une fois que vous êtes approuvé, vous pouvez commencer à accepter des réservations de passagers.",
        },
        {
            id: 3,
            question: "Les trajets sont-ils sécurisés ?",
            answer: "Oui, nous prenons la sécurité très au sérieux. Nous vérifions les profils des conducteurs et des passagers, et nous encourageons les utilisateurs à laisser des évaluations après chaque trajet pour garantir un environnement sûr et fiable.",
        },
        {
            id: 4,
            question: "Quels sont les moyens de paiement acceptés ?",
            answer: "Nous acceptons divers moyens de paiement, y compris les cartes de crédit et les paiements en ligne sécurisés. Vous pouvez gérer vos options de paiement directement depuis votre compte utilisateur.",
        },
        {
            id: 5,
            question: "Comment puis-je annuler une réservation ?",
            answer: "Si vous devez annuler une réservation, vous pouvez le faire depuis votre compte utilisateur avant le début du trajet. Veuillez noter que des frais d'annulation peuvent s'appliquer en fonction du moment où vous annulez.",
        },
        {
            id: 6,
            question: "Que faire en cas de problème pendant le trajet ?",
            answer: "Si vous rencontrez un problème pendant le trajet, contactez immédiatement notre support client via l'application ou notre site web. Nous sommes disponibles pour vous aider à résoudre tout problème que vous pourriez rencontrer.",
        },
    ];

    return (
        <>
            <div className="relative isolate overflow-hidden bg-gray-900">
                <Image src="/img/question.jpg" alt="FAQ Background" layout="fill" objectFit="cover" priority className="absolute inset-0 -z-10 brightness-50"/>
                    
                <div className="px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-14">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
                                Vos questions sur Covoit’Ivoire
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-200">
                                Vous avez d&apos;autres questions et vous ne trouvez pas la réponse que vous cherchez ? Contactez notre équipe de support en{' '}
                                <Link href="#" legacyBehavior>
                                    <a className="font-semibold text-[#f7872e] hover:text-[#f7872e]">nous envoyant un email</a>
                                </Link>{' '}
                                et nous vous répondrons dans les plus brefs délais.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="mx-auto max-w-7xl py-14 px-6 lg:px-8">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Questions fréquemment posées</h2>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
                        Vous avez une question différente et vous ne trouvez pas la réponse que vous cherchez ? Contactez notre équipe de support en{' '}
                        <Link href="#" legacyBehavior>
                            <a className="font-semibold text-[#f7872e] hover:text-[#f7872e]">nous envoyant un email</a>
                        </Link>{' '}
                        et nous vous répondrons dès que possible.
                    </p>
                    <div className="mt-20">
                        <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
                            {faqs.map(faq => (
                                <div key={faq.id}>
                                    <dt className="text-base font-semibold leading-7 text-gray-900">{faq.question}</dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </>
    );
}
