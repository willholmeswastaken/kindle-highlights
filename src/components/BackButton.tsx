import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react'

interface BackButtonProps {
    urlOverride?: string;
}

export const BackButton = ({ urlOverride }: BackButtonProps) => {
    const router = useRouter();
    const goBack = () => router.back();
    const icon = <ArrowLeftIcon className="h-6 w-6 cursor-pointer" />;
    return (
        urlOverride
            ? (
                <Link href={urlOverride}>
                    {icon}
                </Link>
            )
            : <button onClick={goBack}>
                {icon}
            </button>
    )
}