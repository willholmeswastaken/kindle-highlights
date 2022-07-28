import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'
import { navItems } from '../nav'
import { isCurrentRoute } from '../utils/routing'

interface BottomNavProps {
    currentUrl: string;
}

export const BottomNav = ({ currentUrl }: BottomNavProps) => {
    const { data: session } = useSession();
    return (
        <footer className={`${session ? 'block' : 'hidden'}`}>
            <div className='w-full' >
                <section id="bottom-navigation" className="sm:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                    <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                        <div id="tabs" className="flex justify-between">
                            {
                                navItems.map(x => (
                                    <Link key={x.displayName} href={x.linkUrl}>
                                        <a className={`w-full ${isCurrentRoute(x.linkUrl, currentUrl) ? 'text-blue-700' : 'text-brandText'} justify-center inline-block text-center my-3 pb-1`}>
                                            {x.icon}
                                        </a>
                                    </Link>
                                ))
                            }
                        </div>
                    </section>
                </section>
            </div>
        </footer>
    )
}