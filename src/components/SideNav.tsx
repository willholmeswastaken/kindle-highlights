import React from "react";
import { HoverLink } from ".";
import IdentityPanel from "./identity/identityPanel";
import { NextRouter, useRouter } from "next/router";
import { navItems } from "../info";
import { isCurrentRoute } from "../utils/routing";

const SideNav = () => {
    const router: NextRouter = useRouter();
    return (
        <>
            <div className="sm:flex sm:flex-col mt-6 sm:mt-4 sm:py-8 px-3 sm:px-5">
                <div className="mb-4">
                    <IdentityPanel />
                </div>
                <div className="hidden sm:block">
                    {navItems.map((x) => (
                        <HoverLink
                            key={x.displayName}
                            active={isCurrentRoute(x.linkUrl, router.pathname)}
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
            </div>
        </>
    );
};

export default SideNav;
