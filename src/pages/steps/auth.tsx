import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import IdentityPanel from '../../components/identity/identityPanel'

const Auth: NextPage = () => {
    const { data: session } = useSession()
    return (
        <div className="container flex flex-col items-center min-h-screen p-10 px-0 mx-auto md:py-20 md:p-10 md:px-0 gap-y-8">
            <h1 className="font-extrabold text-center text-7xl">
                Step One: <span className="text-blue-500">Authenticate</span>
            </h1>
            <IdentityPanel />
            <div className="flex flex-row gap-x-4">
                <Link href="/">
                    <button
                        disabled={!session}
                        className="p-2 px-6 w-fit self-center text-white font-bold bg-blue-500 disabled:bg-gray-400 rounded-full group-hover:bg-blue-600 duration-300">
                        Cancel
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
    )
}

export default Auth