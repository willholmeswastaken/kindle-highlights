import { CloudArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HighlightImport, VaultRecord } from "@prisma/client";
import { formatDistance, formatRelative } from "date-fns";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FavouriteButton, SkeletonResult } from "../components";
import { RemoveImportDialog } from "../components/RemoveImportDialog";
import { trpc } from "../utils/trpc";

const ImportHistory: NextPage = () => {
    const [showRemoveImportDialog, setShowRemoveImportDialog] = useState<boolean>(false);
    const [importIdToRemove, setImportIdToRemove] = useState<string | undefined>(undefined);

    const onCloseRemoveImportDialog = (): void => {
        setShowRemoveImportDialog(false);
        setImportIdToRemove(undefined);
    };

    const onOpenRemoveImportDialog = (importId: string): void => {
        setImportIdToRemove(importId);
        setShowRemoveImportDialog(true);
    };

    const onImportRemovedFromApp = (): void => {
        imports.refetch();
    };

    const imports = trpc.useQuery(["imports.getAllImports"]);
    const addToVault = trpc.useMutation(['vault.addImport'], {
        onSuccess: () => {
            imports.refetch();
        }
    });
    const removeFromVault = trpc.useMutation(['vault.removeImport'], {
        onSuccess: () => {
            imports.refetch();
        }
    });

    const onVaultInteractionClicked: (highlightImport: (HighlightImport & {
        vaultRecord: VaultRecord | null;
    })) => void = (highlightImport) => {
        if (highlightImport.vaultRecord)
            removeFromVault.mutate({ importId: highlightImport.id });
        else
            addToVault.mutate({ importId: highlightImport.id });
    };

    return (
        <>
            <Head>
                <title>Import History</title>
                <meta name="description" content="View import history from your kindle devices" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col w-full gap-y-4 sm:gap-y-8">
                <h1 className="text-4xl bold text-brandText">Import History</h1>
                <div className="rounded-lg w-full lg:w-3/4 p-4">
                    <div className="flex flex-col gap-y-5">
                        {
                            imports.isLoading && <SkeletonResult />
                        }
                        {
                            !imports.isLoading && imports.data && imports.data.length > 0
                                ? imports.data.map(x => {
                                    const isFavourite = x.vaultRecord !== null;
                                    return <div key={x.id} className="flex flex-row bg-white rounded-lg hover:bg-gray-50 h-fit border-y border-y-gray-100 py-3 px-2">
                                        <Link href={`/view-import/${x.id}`}>
                                            <a className="flex flex-row flex-grow hover:cursor-pointer" key={x.id}>
                                                <div className="bg-blue-50 rounded-full p-2 h-10 w-10">
                                                    <CloudArrowUpIcon className="h-6 w-6 text-blue-600 " />
                                                </div>
                                                <div className="flex flex-col pl-2 flex-grow w-full">
                                                    <span className="text-brandText hidden md:block capitalize">Imported {formatRelative(x.importedOn, new Date())}</span>
                                                    <span className="text-sm text-brandText md:hidden">Imported {formatDistance(x.importedOn, new Date(), { addSuffix: true })}</span>
                                                    {x.totalBookCount > 0
                                                        ? <span className="text-xs md:text-sm italic text-gray-400">Includes ({x.totalBookCount}) Book{x.totalBookCount > 1 ? 's' : ''}</span>
                                                        : <span className="text-xs md:text-sm italic text-gray-400">No books imported</span>}
                                                </div>
                                            </a>
                                        </Link>
                                        <div className="inline-block">
                                            <FavouriteButton isFavourite={isFavourite} onButtonClick={() => onVaultInteractionClicked(x)} />
                                            <button type="button" disabled={isFavourite} className="text-red-600 font-semibold w-16 h-7 mt-1 rounded-lg disabled:cursor-not-allowed" onClick={() => onOpenRemoveImportDialog(x.id)}>
                                                <TrashIcon className='h-full w-full' />
                                            </button>
                                        </div>

                                    </div>;
                                })
                                : 'No imports found!'
                        }
                    </div>
                </div>
            </div>
            <RemoveImportDialog
                importId={importIdToRemove!}
                isOpen={showRemoveImportDialog}
                closeModal={onCloseRemoveImportDialog}
                onRemoved={onImportRemovedFromApp} />
        </>
    );
};

export default ImportHistory;
