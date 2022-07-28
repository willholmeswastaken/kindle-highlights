import { PencilAltIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { BackButton, SkeletonResult } from '../../../../components';
import { trpc } from "../../../../utils/trpc";

const ViewBook: NextPage = () => {
    const router = useRouter();
    const { bookid } = router.query;
    const { data: book, isLoading } = trpc.useQuery(["books.getBookById", {
        bookId: bookid as string
    }]);
    return (
        <>
            <Head>
                <title>View Book</title>
                <meta name="description" content="View a selected imported book's highlights." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col w-full gap-y-4 sm:gap-y-8">
                <BackButton />
                <h1 className="text-4xl bold text-brandText">{book?.title}</h1>
                <div className="w-full lg:w-3/4 p-4">
                    <div className="flex flex-col gap-y-5">
                        {
                            isLoading && <SkeletonResult />
                        }
                        {
                            book?.highlights && book.totalHighlights > 0
                                ? book.highlights.map(x => {
                                    return <div className="flex flex-row bg-white rounded-lg h-fit border-y border-y-gray-100 py-3 px-2" key={x.id}>
                                        <div className="bg-blue-50 rounded-full p-2 h-10 w-10">
                                            <PencilAltIcon className="h-6 w-6 text-blue-600 " />
                                        </div>
                                        <div className="flex flex-col pl-2 flex-grow w-full">
                                            <div className="flex flex-col md:flex-row md:gap-x-1">
                                                <span className="text-xs first-letter:text-brandText">{x.content}</span>
                                            </div>
                                        </div>
                                        <button type="button" className="bg-blue-100 text-blue-600 flex-auto font-semibold w-16 h-7 mt-2 rounded-lg">...</button>
                                    </div>;
                                })
                                : 'No book highlights found!'
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewBook;
