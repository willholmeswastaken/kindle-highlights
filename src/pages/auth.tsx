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
    return (
        <>
            <div className="-mt-56 flex min-h-screen flex-col items-center justify-center py-2 px-14 text-center">
                <img
                    className="w-80"
                    src="https://www.thestatesman.com/wp-content/uploads/2019/10/1500x500_ed.jpg"
                    alt="Logo"
                />
                <div className="mt-40">
                    {providers !== null &&
                        Object.values(providers!).map((provider) => (
                            <div key={provider.name}>
                                <button
                                    className="rounded-lg bg-blue-500 p-3 text-white"
                                    onClick={() => signIn(provider.id, { callbackUrl: router.query.callbackUrl as string })}
                                >
                                    Sign in with {provider.name}
                                </button>
                            </div>
                        ))}
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