import React from 'react'

const CardSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div
                className="bg-gray-300 w-full h-[200px] rounded-[5px]"
            ></div>

            <div className="flex flex-col gap-2 mt-4">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
        </div>
    )
}

export default CardSkeleton
