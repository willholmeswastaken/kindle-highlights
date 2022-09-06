import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutlined } from '@heroicons/react/24/outline';
import React from 'react'

interface FavouriteButtonProps {
    onButtonClick: () => void;
    isFavourite: boolean;
}

export const FavouriteButton = ({ onButtonClick, isFavourite }: FavouriteButtonProps) => {
    return (
        <button type="button" className="text-red-600 font-semibold w-16 h-7 mt-1 rounded-lg" onClick={onButtonClick}>
            {isFavourite ?
                <HeartIcon className="h-full w-full" />
                : <HeartIconOutlined className="h-full w-full" />}
        </button>
    )
}