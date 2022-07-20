import { ArrowLeftIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react'

interface BackButtonProps {
    url: string;
}

const BackButton = ({ url }: BackButtonProps) => {
    return (
        <Link href={url}>
            <ArrowLeftIcon className="h-6 w-6 cursor-pointer" />
        </Link>
    )
}

export default BackButton