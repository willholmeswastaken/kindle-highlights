import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react'
import { trpc } from '../utils/trpc';

interface RemoveImportDialogProps {
    importId: string;
    isOpen: boolean;
    closeModal: () => void;
    onRemoved: () => void;
}

export const RemoveImportDialog = ({ importId, isOpen, closeModal, onRemoved }: RemoveImportDialogProps) => {
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showFailureMessage, setShowFailureMessage] = useState<boolean>(false);
    const removeFromApp = trpc.useMutation(['imports.removeImport'], {
        onSuccess: () => {
            onRemoved();
            setShowFailureMessage(false);
            setShowSuccessMessage(true);
        },
        onError: () => {
            setShowSuccessMessage(false);
            setShowFailureMessage(true);
        }
    });

    const onRemove = (): void => {
        removeFromApp.mutate({ importId });
    };

    const onDismissFailureMessage = (): void => {
        setShowFailureMessage(false);
    };

    useEffect(() => {
        if (!isOpen) {
            if (showSuccessMessage) {
                setShowSuccessMessage(false);
            }
            if (showFailureMessage) {
                setShowFailureMessage(false);
            }
        }
    }, [isOpen, showSuccessMessage, showFailureMessage]);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in"
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
                                leave="ease-in"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Remove import from application
                                    </Dialog.Title>
                                    <div className="my-6">
                                        {
                                            showSuccessMessage && (
                                                <div className="flex p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200" role="alert">
                                                    <CheckCircleIcon className="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800" />
                                                    <span className="sr-only">Info</span>
                                                    <div className="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
                                                        Import was successfully removed from the system!
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            showFailureMessage && (
                                                <div className="flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
                                                    <ExclamationCircleIcon className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" />
                                                    <span className="sr-only">Info</span>
                                                    <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                                                        Oops, the import failed to be removed. Please try again!
                                                    </div>
                                                    <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300" data-dismiss-target="#alert-2" aria-label="Close" onClick={onDismissFailureMessage}>
                                                        <span className="sr-only">Close</span>
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                    </button>
                                                </div>
                                            )
                                        }
                                        {
                                            !showSuccessMessage && (
                                                <p className="text-sm text-gray-500">
                                                    Are you sure? You cant undo this action.
                                                </p>
                                            )
                                        }
                                    </div>

                                    <div className="mt-4 flex flex-row-reverse gap-x-4">
                                        {
                                            !showSuccessMessage && (
                                                <button
                                                    type="button"
                                                    className="text-sm font-medium bg-red-100 text-red-600 disabled:cursor-not-allowed rounded-md px-4 py-2"
                                                    disabled={removeFromApp.isLoading}
                                                    onClick={onRemove}>
                                                    {
                                                        removeFromApp.isLoading
                                                            ? (
                                                                <div className="flex flex-row justify-center items-center">
                                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                    </svg>
                                                                    Removing...
                                                                </div>)
                                                            : 'Remove'
                                                    }
                                                </button>
                                            )
                                        }
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-blue-100 hover:bg-blue-200 text-blue-900 focus-visible:ring-blue-500"
                                            onClick={closeModal}
                                        >
                                            Close
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