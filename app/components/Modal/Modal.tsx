import React, { useEffect, useState } from 'react';

interface ModalProps {
    buttonColor: string;
    actionMessage: string;
    onDeleteMessage: string;
    onCloseMessage: string;
    id: String | null;
    onDelete: (id: String) => void;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
    buttonColor,
    actionMessage,
    onDeleteMessage,
    onCloseMessage,
    id,
    onDelete,
    isOpen,
    onClose,
}) => {
    const [isDisabled, setIsDisabled] = useState(false);

    const handleDelete = () => {
        if (id !== null) {
            setIsDisabled(true);
            onDelete(id);
        }
    };

    // Réinitialiser isDisabled lorsque le modal est fermé
    useEffect(() => {
        if (!isOpen) {
            setIsDisabled(false);
        }
    }, [isOpen]);

    return (
        isOpen && (
            <div
                id="popup-modal"
                tabIndex={-1}
                className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
                role="dialog"
                aria-modal="true"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                            type="button"
                            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}>
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>

                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                {actionMessage}
                            </h3>

                            <button
                                type="button"
                                className={`py-2.5 px-5 ms-3 text-sm font-medium ${isDisabled ? 'text-gray-400 opacity-50 cursor-not-allowed' : 'text-gray-900'} focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                                onClick={handleDelete}
                                disabled={isDisabled}>
                                {onDeleteMessage}
                            </button>

                            <button
                                type="button"
                                className={`text-white ${buttonColor} hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ms-3 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={onClose}
                                disabled={isDisabled}>
                                {onCloseMessage}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Modal;
