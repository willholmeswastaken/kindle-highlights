import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import IdentityPanel from '../../components/identity/identityPanel'

const Import: NextPage = () => {
    const { data: session } = useSession()
    return (
        <>
            <nav className='flex flex-row'>
                <IdentityPanel />
            </nav>
            <div className="container flex flex-col items-center min-h-screen p-10 px-0 mx-auto md:py-20 md:p-10 md:px-0 gap-y-8">
                <h1 className="font-extrabold text-center text-7xl">
                    Step Two: <span className="text-blue-500">Import Highlights</span>
                </h1>
                <h2 className="font-bold text-center text-4xl">Import from file</h2>
                <input className="form-control block w-80 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile"></input>
                <h2 className="font-bold text-center text-4xl">Or</h2>
                <textarea
                    className="form-control block w-80 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlTextarea1"
                    rows={3}
                    placeholder="Paste here..."
                ></textarea>
                <div className="flex flex-row gap-x-4">
                    <Link href="/steps/auth">
                        <button
                            disabled={!session}
                            className="p-2 px-6 w-fit self-center text-white font-bold bg-blue-500 disabled:bg-gray-400 rounded-full group-hover:bg-blue-600 duration-300">
                            Previous
                        </button>
                    </Link>
                    <Link href="/steps/import">
                        <button
                            disabled={!session}
                            className="p-2 px-6 w-fit self-center text-white font-bold bg-blue-500 disabled:bg-gray-400 rounded-full group-hover:bg-blue-600 duration-300">
                            Continue
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Import