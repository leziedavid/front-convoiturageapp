import { Dialog, Transition } from '@headlessui/react';
import { Wallet } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const PaymentModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handlePaymentMethodSelect = (method: string) => {
        setSelectedPaymentMethod(method);
    };

    const handleSubmit = () => {
        if (selectedPaymentMethod) {
            console.log(`Selected payment method: ${selectedPaymentMethod}`);
            // Ajoutez ici la logique pour soumettre le formulaire ou gérer le paiement
            closeModal();
        }
    };

    return (
        <>
            <div
                onClick={openModal}
                className="cursor-pointer text-sm font-semibold leading-6 text-white bg-[#000000d1] rounded-xl px-2 py-1 flex justify-center items-center gap-x-2"
            >
                <Wallet className="text-white h-6 w-6" />
                <div>
                    <p className="text-xs mb-0 font-light">
                        Solde
                    </p>
                    <span className="text-white text-xs">
                        40 000 XOF
                    </span>
                </div>
            </div>

            <Transition appear show={isOpen} as="div">
                <Dialog as="div" onClose={closeModal} className="relative z-10">
                    <Transition.Child
                        as="div"
                        enter="duration-300 ease-out"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="duration-200 ease-in"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="fixed inset-0 bg-black/25"
                    />
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-1 text-center">
                            <Transition.Child
                                as="div"
                                enter="duration-300 ease-out"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="duration-200 ease-in"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95" >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center gap-3">
                                        <div className="flex items-center gap-3">
                                            <Wallet className="h-6 w-6" /> Rechargement de compte
                                        </div>
                                    </Dialog.Title>

                                    <div className="p-1">
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Veuillez renseigner les informations suivantes pour recharger votre compte
                                            </p>
                                        </div>
                                        <div className="md:mx-10">
                                            <div className="grid grid-cols-2 gap-4 py-3 ">

                                                <div className={`bg-white border-2 p-1 rounded-xl flex items-center gap-3 ${selectedPaymentMethod === 'Wave' ? 'border-blue-500' : 'border-gray-200'}`}
                                                    onClick={() => handlePaymentMethodSelect('Wave')}>
                                                    <Image src="/img/wave.png" alt="Wave" width={40} height={40} className="rounded-full" />
                                                    <div>Wave</div>
                                                </div>

                                                <div className={`bg-white border-2 p-1 rounded-xl flex items-center gap-3 ${selectedPaymentMethod === 'Orange' ? 'border-blue-500' : 'border-gray-200'}`}
                                                    onClick={() => handlePaymentMethodSelect('Orange')} >
                                                    <Image src="/img/orange.png" alt="Orange" width={40} height={40} className="rounded-full" />
                                                    <div>Orange</div>
                                                </div>

                                                <div className={`bg-white border-2 p-1 rounded-xl flex items-center gap-3 ${selectedPaymentMethod === 'Mtn' ? 'border-blue-500' : 'border-gray-200'}`}
                                                    onClick={() => handlePaymentMethodSelect('Mtn')} >
                                                    <Image src="/img/mtn.jpeg" alt="Orange" width={40} height={40} className="rounded-full" />
                                                    <div>Orange</div>
                                                </div>

                                            </div>
                                            <div className="col-span-4 sm:col-span-2">
                                                <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                                                    Montant
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phone-number"
                                                    id="phone-number"
                                                    autoComplete="cc-given-name"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-gray-400 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end gap-3">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-[#f7872e] text-white px-4 py-2 text-sm font-medium focus:outline-none"
                                                onClick={handleSubmit}
                                            >
                                                Valider
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 text-black px-4 py-2 text-sm font-medium focus:outline-none"
                                                onClick={closeModal}
                                            >
                                                Fermer
                                            </button>
                                        </div>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default PaymentModal;
