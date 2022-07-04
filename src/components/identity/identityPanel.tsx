import { useSession, signIn, signOut } from "next-auth/react"
import IdentityDetails from "./identityDetails";

const IdentityPanel = (): JSX.Element => {
    const { data: session } = useSession()
    console.log(session);

    const onLogout = () => {
        const shouldLogout = confirm('Are you sure that you want to logout?');
        if (!shouldLogout) return;
        signOut();
    }

    const onLogin = () => signIn();

    return (
        <>
            {session ?
                (
                    <a className="flex flex-col h-14 w-full sm:w-60 border border-gray-400 rounded-full mt-4 cursor-pointer" onClick={onLogout}>
                        <IdentityDetails
                            name={session?.user?.name!}
                            email={session?.user?.email!}
                            image={session?.user?.image!}
                        />
                    </a>
                )
                : (
                    <a className="flex flex-col h-14 w-full sm:w-60 border border-gray-400 rounded-full mt-4 cursor-pointer" onClick={onLogin}>
                        <IdentityDetails
                            name="Sign in"
                            email="It's free!"
                            image="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                        />
                    </a>
                )}
        </>
    )
}

export default IdentityPanel;