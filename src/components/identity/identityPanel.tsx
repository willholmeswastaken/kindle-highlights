import { useSession, signIn, signOut } from "next-auth/react"
import { NextRouter, useRouter } from 'next/router'
import { HoverLink } from '../';
import IdentityDetails from "./identityDetails";

const IdentityPanel = (): JSX.Element => {
  const { data: session } = useSession()
  const router: NextRouter = useRouter()

  const onLinkClick = () => {
    if (session)
      router.push('/account');
    else
      signIn();
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