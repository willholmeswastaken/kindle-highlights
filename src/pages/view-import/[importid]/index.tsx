import { BookOpenIcon } from "@heroicons/react/outline";
import { Book } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import BackButton from "../../../components/BackButton";
import SkeletonResult from "../../../components/SkeletonResult";
import { trpc } from "../../../utils/trpc";

const ViewImport: NextPage = () => {
    const router = useRouter();
    const { importid } = router.query;
    const { data: books, isLoading } = trpc.useQuery(["imports.getBooksByImportId", {
        importId: importid as string
    }]);
    const getTitle: (book: Book) => string = (book) =>
        book.title.length > 25
            ? `${book.title.substring(0, 25)}...`
            : `${book.title}`;
    return (
        <>
            <Head>
                <title>View Import</title>
                <meta name="description" content="View imported books" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col w-full h-full gap-y-4 sm:gap-y-8">
                <BackButton />
                <h1 className="text-4xl bold text-brandText">Imported Books</h1>
                <div className="w-full lg:w-3/4 p-4">
                    <div className="flex flex-col gap-y-5">
                        {
                            isLoading && <SkeletonResult />
                        }
                        {
                            books
                                ? books.map(x => {
                                    return <Link key={x.id} href={`/view-import/${importid}/book/${x.id}`}>
                                        <div className="flex flex-row bg-white rounded-lg hover:bg-gray-50 h-16 border-y border-y-gray-100 py-3 px-2 hover:cursor-pointer" key={x.id}>
                                            <div className="bg-blue-50 rounded-full p-2 h-10 w-10">
                                                <BookOpenIcon className="h-6 w-6 text-blue-600 " />
                                            </div>
                                            <div className="flex flex-col pl-2 flex-grow w-full">
                                                <div className="flex flex-col md:flex-row md:gap-x-1">
                                                    <span className="text-xs md:text-sm first-letter:text-brandText capitalize">{getTitle(x)}</span>
                                                    <span className="hidden md:block text-sm">-</span>
                                                    <span className="text-xs md:text-sm first-letter:text-brandText capitalize">{x.author}</span>
                                                </div>
                                                {x.totalHighlights > 0
                                                    ? <span className="text-xs md:text-sm italic text-gray-400">Includes ({x.totalHighlights}) Highlight{x.totalHighlights > 1 ? 's' : ''}</span>
                                                    : <span className="text-xs md:text-sm italic text-gray-400">No highlights detected</span>}
                                            </div>
                                            <button type="button" className="bg-blue-100 text-blue-600 flex-auto font-semibold w-16 h-7 mt-2 rounded-lg">...</button>
                                        </div>
                                    </Link>;
                                })
                                : 'No imports found!'
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewImport;
