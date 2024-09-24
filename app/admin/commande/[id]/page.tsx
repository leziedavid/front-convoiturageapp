
import Image from 'next/image';
import { Clock, CheckCircle, ArrowDown, X } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function page() {

    const eventTypes = {
        applied: { icon: Clock, bgColorClass: 'bg-gray-400' },
        advanced: { icon: X, bgColorClass: 'bg-orange-500' },
        completed: { icon: CheckCircle, bgColorClass: 'bg-green-500' },
    };

    const timeline = [
        { id: 1, type: eventTypes.applied, content: 'Applied to', target: 'Front End Developer', date: 'Sep 20', datetime: '2020-09-20' },
        { id: 2, type: eventTypes.advanced, content: 'Advanced to phone screening by', target: 'Bethany Blake', date: 'Sep 22', datetime: '2020-09-22' },
        { id: 3, type: eventTypes.completed, content: 'Completed phone screening with', target: 'Martha Gardner', date: 'Sep 28', datetime: '2020-09-28' },
        { id: 4, type: eventTypes.advanced, content: 'Advanced to interview by', target: 'Bethany Blake', date: 'Sep 30', datetime: '2020-09-30' },
        { id: 5, type: eventTypes.completed, content: 'Completed interview with', target: 'Katherine Snyder', date: 'Oct 4', datetime: '2020-10-04' },
    ];


    return (
        <>
            <div className="min-h-full">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Détail utilisateur</h1>
                </div>

                <main className="py-10">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                        <div className="flex items-center space-x-5">
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <Image className="h-16 w-16 rounded-full" src="/img/image.png" alt="User Image" width={64} height={64} />
                                    <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Ricardo Cooper</h1>
                                <p className="text-sm font-medium text-gray-500">CONDUCTEUR</p>
                            </div>
                        </div>
                        <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                            <button type="button" className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                Activer le compte
                            </button>
                        </div>
                    </div>

                    <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                            <section aria-labelledby="applicant-information-title">
                                <div className="bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">Information</h2>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Données personnelles et de lutilisateur.</p>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Application for</dt>
                                                <dd className="mt-1 text-sm text-gray-900">Backend Developer</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                                <dd className="mt-1 text-sm text-gray-900">ricardocooper@example.com</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                                                <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                <dd className="mt-1 text-sm text-gray-900">+1 555-555-5555</dd>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <dt className="text-sm font-medium text-gray-500">About</dt>
                                                <dd className="mt-1 text-sm text-gray-900">Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
                            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900 flex items-center gap-2">
                                    <Clock /> Historique réchargement
                                </h2>

                                <div className="mt-6 flow-root">
                                    <ul role="list" className="-mb-8">
                                        {timeline.map((item) => (
                                            <li key={item.id}>
                                                <div className="relative pb-8">
                                                    {item.id !== timeline.length - 1 && (
                                                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                                    )}
                                                    <div className="relative flex space-x-3">
                                                        <div>
                                                            <span className={`${item.type.bgColorClass} h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`}>
                                                                <item.type.icon className="h-5 w-5 text-white" aria-hidden="true" />
                                                            </span>
                                                        </div>
                                                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                            <div>
                                                                <p className="text-sm text-gray-500">
                                                                    {item.content} <a href="#" className="font-medium text-gray-900">{item.target}</a>
                                                                </p>
                                                            </div>
                                                            <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                                                <time dateTime={item.datetime}>{item.date}</time>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex justify-center items-center mt-3">
                                    <div className="rounded-full bg-white p-2 drop-shadow-sm border-2 border-orange-400">
                                        <ArrowDown className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>

        </>
        
    )
}
