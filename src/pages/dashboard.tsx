import type { NextPage } from "next";
import Head from "next/head";

const Dashboard: NextPage = () => {
    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col h-screen w-full gap-y-4 sm:gap-y-8">
                <h1 className="text-4xl bold text-brandText">Dashboard</h1>
                <div className="bg-white rounded-lg h-1/2 w-full lg:w-3/4"></div>
            </div>
        </>
    );
};

export default Dashboard;
