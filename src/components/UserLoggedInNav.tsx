import React from 'react'
import { HoverLink } from '.'
import IdentityPanel from './identity/identityPanel'
import { TemplateIcon } from '@heroicons/react/outline';

const UserLoggedInNav = () => {

    return (
        <>
            <div className="hidden sm:flex sm:flex-col pl-4">
                <IdentityPanel />
                <HoverLink active>
                    <div className="flex flex-row w-fit p-2">
                        <TemplateIcon className="inline-block h-8 w-8" />
                        <div className="flex flex-col">
                            <span className="pl-2 mt-1">Dashboard</span>
                        </div>
                    </div>
                </HoverLink>
            </div>
        </>
    )
}

export default UserLoggedInNav