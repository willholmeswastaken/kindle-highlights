import React, { FunctionComponent } from 'react'
import {
    ClientSafeProvider,
    getProviders,
    LiteralUnion,
    signIn,
} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import { useRouter } from 'next/router'

interface AuthProps {
    providers: Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
    > | null
}

const Auth: FunctionComponent<AuthProps> = ({ providers }) => {
    const router = useRouter();

    const renderProviders = () => {
        if (providers == null) return null;
        return (
            Object.values(providers!).map((provider) => (
                <div key={provider.name}>
                    <button
                        className="rounded-2xl w-full bg-blue-600 hover:bg-blue-700 p-3 text-white font-semibold"
                        onClick={() => signIn(provider.id, { callbackUrl: router.query.callbackUrl as string })}
                    >
                        Sign in with {provider.name}
                    </button>
                </div>
            ))
        )
    };

    return (
        <>
            <div className="flex flex-row w-screen h-screen sm:items-center sm:justify-center">
                <div className="flex flex-col w-full md:w-1/2 px-4 pt-12 sm:pt-0 items-end">
                    <div className="flex flex-col w-96">
                        <span className="text-4xl tracking-wide text-brandText font-bold">Log in to</span>
                        <span className="text-4xl tracking-wide text-brandText font-bold">Kindle Highlights</span>
                        <span className="text-md tracking-wide text-gray-500 mt-4">Choose from any of our providers below.</span>
                        <div className='mt-40 sm:mt-20'>
                            {renderProviders()}
                        </div>
                    </div>
                </div>
                <div className='flex flex-row w-1/2'>
                    <div className="flex flex-row w-full px-4 md:px-0">
                        <img
                            className="w-60 lg:w-80 hidden sm:block md:ml-12 lg:ml-48 rounded-lg shadow"
                            src="https://www.thestatesman.com/wp-content/uploads/2019/10/1500x500_ed.jpg"
                            alt="Logo"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders()
    return {
        props: {
            providers,
        },
    }
}

export default Auth