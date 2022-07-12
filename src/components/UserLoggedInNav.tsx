import React from 'react'
import { HoverLink } from '.'
import IdentityPanel from './identity/identityPanel'
import { CollectionIcon, SwitchHorizontalIcon, TemplateIcon } from '@heroicons/react/solid';

const UserLoggedInNav = () => {
    return (
        <>
            <div className="hidden sm:flex sm:flex-col mt-4 py-8 px-5">
                <div className="mb-8">
                    <IdentityPanel />
                </div>
                <HoverLink active>
                    <div className="flex flex-row w-fit p-1">
                        <TemplateIcon className="inline-block h-6 w-6 m-2" />
                        <div className="flex flex-col">
                            <span className="pl-2 mt-2">Dashboard</span>
                        </div>
                    </div>
                </HoverLink>
                <HoverLink>
                    <div className="flex flex-row w-fit p-1">
                        <CollectionIcon className="inline-block h-6 w-6 m-2" />
                        <div className="flex flex-col">
                            <span className="pl-2 mt-2">Import History</span>
                        </div>
                    </div>
                </HoverLink>
                <HoverLink>
                    <div className="flex flex-row w-fit p-1">
                        <SwitchHorizontalIcon className="inline-block h-6 w-6 m-2" />
                        <div className="flex flex-col">
                            <span className="pl-2 mt-2">Import</span>
                        </div>
                    </div>
                </HoverLink>
            </div>
        </>
    )
}

export default UserLoggedInNav