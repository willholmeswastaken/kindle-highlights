import { CloudUploadIcon, UploadIcon } from '@heroicons/react/outline'
import React from 'react'

interface ExportButtonProps {
    onButtonClick: () => void;
}

export const ExportButton = ({ onButtonClick }: ExportButtonProps) => {
    return (
        <button type="button" className="text-blue-600 font-semibold w-16 h-7 mt-1 rounded-lg" onClick={onButtonClick}>
            <UploadIcon className='h-full w-full' />
        </button>
    )
}