import { Dialog, Transition } from '@headlessui/react';
import { Wallet } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { launchRechargements } from '@/app/services/paymentService';

// Définir le schéma de validation mis à jour
const paymentSchema = z.object({
    paymentMethod: z.string().min(1, 'Veuillez sélectionner un moyen de paiement'),
    amount: z.string()
        .min(1, 'Veuillez entrer un montant')
        .regex(/^\d+$/, 'Le montant doit être un nombre valide')
        .transform(value => parseFloat(value))
        .refine(value => value >= 600, 'Le montant doit être d\'au moins 600')
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentProps {
    wallet:  number | undefined;
    fetchStatistics: () => void;
}

const PaymentModal: React.FC<PaymentProps> = ({ wallet,fetchStatistics }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Wave');

    const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormValues>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            paymentMethod: 'Wave',
            amount: 600,
        }
    });

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handlePaymentMethodSelect = (method: string) => {
        setSelectedPaymentMethod(method);
    };

    const onSubmit = async (data: PaymentFormValues) => {
        if (!selectedPaymentMethod) {
            toast.error("Aucun moyen de paiement sélectionné");
            return;
        }

        const payload = {
            paymentMethod: selectedPaymentMethod,
            amount: data.amount
        };

        try {
            const paymentstatus = await launchRechargements(data.amount, selectedPaymentMethod);

            if (paymentstatus.code === 201) {
                toast.success('Payment succeeded');
                fetchStatistics();
                closeModal();
            }
        } catch (error) {
            console.error('Failed to check payment status:', error);
        }
    };

    return (

        <>

            <Toaster position="top-right" reverseOrder={false}/>

            <div onClick={openModal} className="cursor-pointer text-sm font-semibold leading-6 text-white bg-[#000000d1] rounded-xl px-2 py-1 flex justify-center items-center gap-x-2">
                <Wallet className="text-white h-6 w-6" />
                <div>
                    <p className="text-xs mb-0 font-light">Solde</p>
                    <span className="text-white text-xs">
                        {wallet ? wallet.toLocaleString() : '0'} XOF
                        {/* {wallet} */} </span>
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
                                leaveTo="opacity-0 scale-95">
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
                                        <form onSubmit={handleSubmit(onSubmit)} className="md:mx-10">
                                            <div className="grid grid-cols-2 gap-4 py-3">
                                                <div className={`bg-white border-2 p-1 rounded-xl flex items-center gap-3 ${selectedPaymentMethod === 'Wave' ? 'border-blue-500' : 'border-gray-200'}`}
                                                    onClick={() => handlePaymentMethodSelect('Wave')}>
                                                    <Image src="/img/wave.png" alt="Wave" width={40} height={40} className="rounded-full" />
                                                    <div>Wave</div>
                                                </div>

                                                <div className={`bg-white border-2 p-1 rounded-xl flex items-center gap-3 ${selectedPaymentMethod === 'Orange' ? 'border-blue-500' : 'border-gray-200'}`}
                                                    onClick={() => handlePaymentMethodSelect('Orange')}>
                                                    <Image src="/img/orange.png" alt="Orange" width={40} height={40} className="rounded-full" />
                                                    <div>Orange</div>
                                                </div>

                                                <div className={`bg-white border-2 p-1 rounded-xl flex items-center gap-3 ${selectedPaymentMethod === 'Mtn' ? 'border-blue-500' : 'border-gray-200'}`}
                                                    onClick={() => handlePaymentMethodSelect('Mtn')}>
                                                    <Image src="/img/mtn.jpeg" alt="Mtn" width={40} height={40} className="rounded-full" />
                                                    <div>Mtn</div>
                                                </div>
                                            </div>

                                            <div className="col-span-4 sm:col-span-2">
                                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                                    Montant
                                                </label>
                                                <input type="text"  id="amount"  {...register('amount')} className={`mt-1 block w-full rounded-md border ${errors.amount ? 'border-red-500' : 'border-gray-300'} py-2 px-3 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-gray-400 sm:text-sm`}/>
                                                {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                                            </div>

                                            <div className="mt-4 flex justify-end gap-3">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-[#f7872e] text-white px-4 py-2 text-sm font-medium focus:outline-none"
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
                                        </form>
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
