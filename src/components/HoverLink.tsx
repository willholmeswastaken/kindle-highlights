import Link from 'next/link';
import React, { useMemo } from 'react'

interface HoverLinkProps {
    linkUrl?: string | null;
    onClick?: () => void;
    children: JSX.Element;
    active?: boolean;
}

export const HoverLink = ({ linkUrl, children, onClick, active }: HoverLinkProps) => {
    const classNames = 'flex flex-col h-fit w-fill pr-12 rounded-xl text-brandText cursor-pointer'
    const linkClassNames = useMemo(() => active
        ? `${classNames} bg-white text-blue-700`
        : `${classNames} hover:bg-gray-200 ease-in-out duration-500 text-gray-500`, [active]);
    const generateLink: () => JSX.Element = () => {
        const wrappingWithChildren = (
            <a
                className={linkClassNames}
                onClick={onClick}>
                {children}
            </a>
        );
        if (linkUrl) {
            return (
                <Link href={linkUrl}>
                    {wrappingWithChildren}
                </Link>
            )
        } else {
            return wrappingWithChildren;
        }
    }
    return (
        <>
            {generateLink()}
        </>
    )
}