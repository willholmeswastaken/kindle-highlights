import React from "react";
import { HoverLink } from ".";
import IdentityPanel from "./identity/identityPanel";
import { navItems } from "../nav";
import { isCurrentRoute } from "../utils/routing";
import { useSession } from "next-auth/react";

interface SideNavProps {
    currentUrl: string;
}

export const SideNav = ({ currentUrl }: SideNavProps) => {
    const { data: session } = useSession();
    return (
        <nav className="flex-auto sm:w-[12rem] md:w-[26rem]">
            <div className="sm:flex sm:flex-col mt-6 sm:mt-4 sm:py-8 px-3 sm:px-5">
                <div className="mb-4">
                    <IdentityPanel />
                </div>
                {
                    session && (
                        <div className="hidden sm:block">
                            {navItems.map((x) => (
                                <HoverLink
                                    key={x.displayName}
                                    active={isCurrentRoute(x.linkUrl, currentUrl)}
                                    linkUrl={x.linkUrl}
                                >
                                    <div className="flex flex-row w-fit p-1">
                                        {x.icon}
                                        <div className="hidden md:flex md:flex-col">
                                            <span className="pl-2 mt-2">{x.displayName}</span>
                                        </div>
                                    </div>
                                </HoverLink>
                            ))}
                        </div>
                    )
                }
            </div>
        </nav>
    );
};
