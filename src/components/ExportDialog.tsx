import { Dialog, Transition } from '@headlessui/react'
import { DocumentCheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { VaultRecord, HighlightImport } from '@prisma/client';
import { Fragment, useEffect, useMemo, useState } from 'react'
import { trpc } from '../utils/trpc';

type ExportResultStatus = 'success' | 'failed';
interface CommonExportResult {
    status: ExportResultStatus;
}
interface ExportFailedResult extends CommonExportResult {
    status: 'failed'
}
interface ExportSuccessResult extends CommonExportResult {
    status: 'success';
    exportedLinkUrl: string;
}
type ExportResult = ExportSuccessResult | ExportFailedResult;

interface ExportDialogProps {
    vaultedImport?: VaultRecord & {
        import: HighlightImport;
    };
    isOpen: boolean;
    closeModal: () => void;
}
export const ExportDialog = ({ vaultedImport, isOpen, closeModal }: ExportDialogProps) => {
    const [selectedBooks, setSelectedBooks] = useState<string[]>();
    const [exportResult, setExportResult] = useState<ExportResult | undefined>(undefined);

    const { data: books, isLoading } = trpc.useQuery(["books.getBooksByImportId", {
        importId: vaultedImport?.import.id!
    }]);

    const exportBooksMutation = trpc.useMutation(['exporter.exportBooksByIds'], {
        onSuccess: (data, variables, context) => {
            setExportResult({
                status: 'success',
                exportedLinkUrl: data
            });
        },
        onError: (error, variables, context) => {
            setExportResult({
                status: 'failed'
            });
        },
    });

    useEffect(() => {
        if (!isOpen)
            setSelectedBooks([]);
    }, [isOpen]);

    const disableForm = useMemo(() => selectedBooks === undefined || selectedBooks.length === 0 || exportBooksMutation.isLoading, [selectedBooks, exportBooksMutation]);

    const onBookSelected = (bookId: string) => {
        if (!selectedBooks) {
            setSelectedBooks([bookId]);
            return;
        }

        if (selectedBooks.includes(bookId)) {
            setSelectedBooks(selectedBooks.filter(x => x !== bookId));
        } else {
            setSelectedBooks([...selectedBooks, bookId]);
        }
    };

    const onExport = () => {
        exportBooksMutation.mutate({ bookIds: selectedBooks ?? [] });
    };

    const dismissAlert = () => {
        setExportResult(undefined);
    };

    if (!vaultedImport) return null;

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
                                        Choose books to export
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        {
                                            exportResult !== undefined && exportResult.status === 'success' && (
                                                <div className="flex p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200" role="alert">
                                                    <DocumentCheckIcon className="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800" />
                                                    <span className="sr-only">Info</span>
                                                    <div className="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
                                                        Your highlights were exported <a href={exportResult.exportedLinkUrl} className="font-semibold underline hover:text-green-800 dark:hover:text-green-900">click to view</a>!
                                                    </div>
                                                    <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300" data-dismiss-target="#alert-3" aria-label="Close" onClick={dismissAlert}>
                                                        <span className="sr-only">Close</span>
                                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                    </button>
                                                </div>
                                            )
                                        }
                                        {
                                            exportResult !== undefined && exportResult.status === 'failed' && (
                                                <div className="flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
                                                    <ExclamationCircleIcon className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" />
                                                    <span className="sr-only">Info</span>
                                                    <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                                                        Oops, the export failed. Please try again!
                                                    </div>
                                                    <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300" data-dismiss-target="#alert-2" aria-label="Close" onClick={dismissAlert}>
                                                        <span className="sr-only">Close</span>
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                    </button>
                                                </div>
                                            )
                                        }
                                        <p className="text-sm text-gray-500">
                                            <div className="flex flex-col">
                                                {
                                                    !isLoading && books && books.length > 0 &&
                                                    books.map(book => (
                                                        <div className="form-check flex" key={book.id}>
                                                            <input
                                                                className="form-check-input appearance-none h-4 w-4 flex-shrink-0 border border-gray-300 rounded-sm bg-white text-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                                type="checkbox"
                                                                value={book.id}
                                                                disabled={exportBooksMutation.isLoading}
                                                                checked={selectedBooks?.some(x => x === book.id)}
                                                                id={book.id}
                                                                onChange={() => onBookSelected(book.id)} />
                                                            <label className="form-check-label inline-block text-gray-800 mt-[1.75px]" htmlFor={book.id}>
                                                                {book.title} - {book.author}
                                                            </label>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </p>
                                    </div>

                                    <div className="mt-4 flex flex-row-reverse gap-x-4">
                                        <button
                                            type="button"
                                            className="text-sm font-medium bg-green-100 text-green-600 disabled:cursor-not-allowed rounded-md px-4 py-2"
                                            disabled={disableForm}
                                            onClick={onExport}>
                                            {
                                                exportBooksMutation.isLoading
                                                    ? (
                                                        <div className="flex flex-row justify-center items-center">
                                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Exporting...
                                                        </div>)
                                                    : 'Export'
                                            }
                                        </button>
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