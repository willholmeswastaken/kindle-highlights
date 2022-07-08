import React from 'react'

interface IdentityDetailsProps {
    name: string;
    image: string;
}

const IdentityDetails = ({
    name,
    image
}: IdentityDetailsProps): JSX.Element => {
    return (
        <div className="flex flex-row w-fit p-2">
            <img
                className="inline-block h-8 w-8 rounded-full ring-white"
                src={image}
                alt="profile picture" />
            <div className="flex flex-col">
                <span className="pl-2 mt-1">{name}</span>
            </div>
        </div>
    )
}

export default IdentityDetails