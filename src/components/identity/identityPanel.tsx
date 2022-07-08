import { useSession, signIn, signOut } from "next-auth/react"
import { HoverLink } from '../';
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
    const onLinkClick = () => {
        if (session)
            onLogout();
        else
            onLogin();
    };

    return (
        <>
            <HoverLink onClick={onLinkClick}>
                <IdentityDetails
                    name={session?.user?.name ?? 'Sign In'}
                    image={session?.user?.image ?? 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'}
                />
            </HoverLink>
        </>
    )
}

export default IdentityPanel;