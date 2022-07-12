import React from "react";
import { HoverLink } from ".";
import IdentityPanel from "./identity/identityPanel";
import {
    CollectionIcon,
    SwitchHorizontalIcon,
    TemplateIcon,
} from "@heroicons/react/solid";
import { NextRouter, useRouter } from "next/router";

interface NavItem {
    icon: JSX.Element;
    linkUrl: string;
    displayName: string;
}

const navItems: NavItem[] = [
    {
        icon: <TemplateIcon className="inline-block h-6 w-6 m-2" />,
        linkUrl: "/dashboard",
        displayName: "Dashboard",
    },
    {
        icon: <CollectionIcon className="inline-block h-6 w-6 m-2" />,
        linkUrl: "/import-history",
        displayName: "Import History",
    },
    {
        icon: <SwitchHorizontalIcon className="inline-block h-6 w-6 m-2" />,
        linkUrl: "/import",
        displayName: "Import",
    },
];

const UserLoggedInNav = () => {
    const router: NextRouter = useRouter();
    const isCurrentRoute: (route: string) => boolean = (route) =>
        router.pathname.toLowerCase() === route.toLowerCase();
    return (
        <>
            <div className="hidden sm:flex sm:flex-col mt-4 py-8 px-5">
                <div className="mb-8">
                    <IdentityPanel />
                </div>
                {navItems.map((x) => (
                    <HoverLink
                        key={x.displayName}
                        active={isCurrentRoute(x.linkUrl)}
                        linkUrl={x.linkUrl}
                    >
                        <div className="flex flex-row w-fit p-1">
                            {x.icon}
                            <div className="flex flex-col">
                                <span className="pl-2 mt-2">{x.displayName}</span>
                            </div>
                        </div>
                    </HoverLink>
                ))}
            </div>
        </>
    );
};

export default UserLoggedInNav;
