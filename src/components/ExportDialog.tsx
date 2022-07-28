import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useMemo } from 'react'

type ButtonType = 'success' | 'info' | 'danger';

interface ExportDialogProps {
    title: string;
    description: string;
    buttonText: string;
    isOpen: boolean;
    closeModal: () => void;
    buttonType: ButtonType;
}

export const ExportDialog = ({ title, description, buttonText, isOpen, closeModal, buttonType }: ExportDialogProps) => {
    const buttonColor = useMemo(() => {
        switch (buttonType) {
            case 'success':
                return 'bg-green-100 hover:bg-green-200 text-green-900 focus-visible:ring-green-500';
            case 'info':
                return 'bg-blue-100 hover:bg-blue-200 text-blue-900 focus-visible:ring-blue-500';
            case 'danger':
                return 'bg-red-100 hover:bg-red-200 text-red-900 focus-visible:ring-red-500';
        }
    }, [buttonType]);
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {description}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex flex-row-reverse">
                                        <button
                                            type="button"
                                            className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${buttonColor}`}
                                            onClick={closeModal}
                                        >
                                            {buttonText}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}