import { KeyIcon, ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { HighlightImport, VaultRecord } from "@prisma/client";
import { formatDistance, formatRelative } from "date-fns";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { SkeletonResult } from "../components";
import { ExportDialog } from "../components/ExportDialog";
import { trpc } from "../utils/trpc";

const Vault: NextPage = () => {
    const { data: vaultRecords, isLoading } = trpc.useQuery(["vault.get"]);
    const [selectedVaultRecord, setSelectedVaultRecord] = useState<VaultRecord & { import: HighlightImport; }>();
    const [isExportDialogOpen, setIsExportDialogOpen] = useState<boolean>(false);

    const onCloseExportModal = () => {
        setIsExportDialogOpen(false);
    };
    const onOpenExportModal = (vaultRecord: VaultRecord & { import: HighlightImport; }) => {
        setSelectedVaultRecord(vaultRecord);
        setIsExportDialogOpen(true);
    };
    return (
        <>
            <Head>
                <title>Vault</title>
                <meta name="description" content="View your vault, it contains all of your saved imports" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col w-full gap-y-4 sm:gap-y-8">
                <h1 className="text-4xl bold text-brandText">Vault</h1>
                <div className="rounded-lg w-full lg:w-3/4 p-4">
                    <div className="flex flex-col gap-y-5">
                        {
                            isLoading && <SkeletonResult />
                        }
                        {
                            !isLoading && vaultRecords && vaultRecords.length > 0
                                ? vaultRecords.map(x => {
                                    return <div key={x.id} className="flex flex-row bg-white rounded-lg h-fit border-y border-y-gray-100 py-3 px-2">
                                        <Link key={x.id} href={`/view-import/${x.import.id}`}>
                                            <a className="flex flex-row flex-grow hover:cursor-pointer" key={x.id}>
                                                <div className="bg-blue-50 rounded-full p-2 h-10 w-10">
                                                    <KeyIcon className="h-6 w-6 text-blue-600 " />
                                                </div>
                                                <div className="flex flex-col pl-2 flex-grow">
                                                    <span className="text-brandText hidden md:block capitalize">Imported {formatRelative(x.import.importedOn, new Date())}</span>
                                                    <span className="text-sm text-brandText md:hidden">Imported {formatDistance(x.import.importedOn, new Date(), { addSuffix: true })}</span>
                                                    {x.import.totalBookCount > 0
                                                        ? <span className="text-sm italic text-gray-400">Includes ({x.import.totalBookCount}) Book{x.import.totalBookCount > 1 ? 's' : ''}</span>
                                                        : <span className="text-xs md:text-sm italic text-gray-400">No books imported</span>}
                                                </div>
                                            </a>
                                        </Link>
                                        <button type="button" className="text-blue-600 font-semibold w-16 h-7 mt-1 rounded-lg" onClick={() => onOpenExportModal(x)}>
                                            <ArrowUpOnSquareIcon className='h-full w-full' />
                                        </button>
                                    </div>
                                })
                                : 'No vault records found!'
                        }
                    </div>
                </div>
            </div>
            <ExportDialog
                isOpen={isExportDialogOpen}
                vaultedImport={selectedVaultRecord}
                closeModal={onCloseExportModal}
            />
        </>
    );
};

export default Vault;
