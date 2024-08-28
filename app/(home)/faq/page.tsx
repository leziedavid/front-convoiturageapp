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
            question: "What's the best thing about Switzerland?",
            answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
        },
        {
            id: 2,
            question: "How does Tailwind CSS work?",
            answer: "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup.",
        },
        {
            id: 3,
            question: "What is the purpose of Next.js?",
            answer: "Next.js is a React framework that enables server-side rendering and generating static websites for React-based web applications.",
        },
        {
            id: 4,
            question: "What is the purpose of Next.js?",
            answer: "Next.js is a React framework that enables server-side rendering and generating static websites for React-based web applications.",
        },
        {
            id: 5,
            question: "What is the purpose of Next.js?",
            answer: "Next.js is a React framework that enables server-side rendering and generating static websites for React-based web applications.",
        },
        {
            id: 6,
            question: "What is the purpose of Next.js?",
            answer: "Next.js is a React framework that enables server-side rendering and generating static websites for React-based web applications.",
        },
        // Ajoutez plus de questions ici si nécessaire
    ];


    return (
        <>
            <div className="relative isolate overflow-hidden bg-gray-900">
                <Image src="/img/question.jpg" alt="FAQ Background" layout="fill" objectFit="cover" priority className="absolute inset-0 -z-10 brightness-50"/>
                    
                <div className="px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-14">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
                                Vos questions sur covoit’ivoire
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-200">
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="mx-auto max-w-7xl py-14 px-6 lg:px-8">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
                        Have a different question and can’t find the answer you’re looking for? Reach out to our support team by{' '}
                        <Link href="#" legacyBehavior>
                            <a className="font-semibold text-[#f7872e] hover:text-[#f7872e]">sending us an email</a>
                        </Link>{' '}
                        and we’ll get back to you as soon as we can.
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
    )
}