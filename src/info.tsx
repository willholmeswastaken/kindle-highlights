import { BookmarkIcon, CollectionIcon, SwitchHorizontalIcon } from "@heroicons/react/solid";

export interface NavItem {
    icon: JSX.Element;
    linkUrl: string;
    displayName: string;
}

export const navItems: NavItem[] = [
    {
        icon: <BookmarkIcon className="inline-block h-8 w-8 sm:h-6 sm:w-6 m-2" />,
        linkUrl: "/vault",
        displayName: "Vault",
    },
    {
        icon: <SwitchHorizontalIcon className="inline-block h-8 w-8 sm:h-6 sm:w-6 m-2" />,
        linkUrl: "/import",
        displayName: "Import",
    },
    {
        icon: <CollectionIcon className="inline-block h-8 w-8 sm:h-6 sm:w-6 m-2" />,
        linkUrl: "/import-history",
        displayName: "Import History",
    }
];
