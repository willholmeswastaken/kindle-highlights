import { Dialog, Transition } from '@headlessui/react'
import { VaultRecord, HighlightImport } from '@prisma/client';
import { Fragment } from 'react'
import { trpc } from '../utils/trpc';

interface ExportDialogProps {
    vaultedImport?: VaultRecord & {
        import: HighlightImport;
    };
    isOpen: boolean;
    closeModal: () => void;
}

export const ExportDialog = ({ vaultedImport, isOpen, closeModal }: ExportDialogProps) => {
    if (!vaultedImport) return null;

    const { data: books, isLoading } = trpc.useQuery(["books.getBooksByImportId", {
        importId: vaultedImport.import.id!
    }]);
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
                                        Choose books below to export
                                    </Dialog.Title>
                                    {/* added the below ui, need to polish up the programmed selections to then emit onto the next flow as part of the export click event.
                                    That then needs to trigger a different dialog to select which integration provider to export against.
                                    Then it needs to perform the exporting. */}
                                    <div className="mt-2">
                                        {
                                            vaultedImport === undefined
                                                ? <p className="text-sm text-gray-500">
                                                    Oops, looks like you havent selected a vault record.
                                                </p>
                                                : (<p className="text-sm text-gray-500">
                                                    <div className="flex flex-col">
                                                        {
                                                            !isLoading && books && books.length > 0 &&
                                                            books.map(book => (
                                                                <div className="form-check" key={book.id}>
                                                                    <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white text-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value={book.id} id={book.id} />
                                                                    <label className="form-check-label inline-block text-gray-800 mt-[1.75px]" htmlFor={book.id}>
                                                                        {book.title.substring(0, 34)}...
                                                                    </label>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </p>)
                                        }
                                    </div>

                                    <div className="mt-4 flex flex-row-reverse gap-x-4">

                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-green-100 hover:bg-green-200 text-green-900 focus-visible:ring-green-500"
                                        >
                                            Export
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