import React from 'react'

interface IdentityDetailsProps {
    name: string;
    email: string;
    image: string;
}

const IdentityDetails = ({
    name,
    email,
    image
}: IdentityDetailsProps): JSX.Element => {
    return (
        <div className="flex flex-row p-2">
            <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src={image}
                alt="profile picture" />
            <div className="flex flex-col">
                <span className="pl-2">{name}</span>
                <span className="text-xs italic pl-2">{email && email.length > 23
                    ? `${email?.substring(0, 23)}...`
                    : email}
                </span>
            </div>
        </div>
    )
}

export default IdentityDetails