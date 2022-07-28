import { RefreshIcon } from '@heroicons/react/outline'
import React from 'react'

export const SkeletonResult = () => {
    return (
        <div className="flex flex-row bg-white rounded-lg hover:bg-gray-50 h-16 border-y border-y-gray-100 py-3 px-2 hover:cursor-pointer">
            <div className="bg-gray-50 rounded-full p-2 h-10 w-10">
                <RefreshIcon className="h-6 w-6 text-gray-400 " />
            </div>
            <div className="flex flex-col pl-2 flex-grow w-full animate-pulse items-center h-full justify-center space-x-5">
                <div className="flex flex-col first-letter:md:gap-x-1 flex-grow w-full">
                    <div className="text-xs md:text-sm first-letter:text-brandText capitalize w-3/4 h-6 bg-gray-300 rounded-md"></div>
                </div>
            </div>
        </div>
    )
}