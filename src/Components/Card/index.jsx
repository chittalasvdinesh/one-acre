import React from 'react'
import Carousel from '../Carousel'

const Card = ({ card }) => {
    return (
        <div
            className="rounded-xl border bg-card text-card-foreground group relative h-full shadow-md hover:shadow-xl p-4 bg-[#f0f0f0] rounded-[5px] card_content"
        >
            <Carousel card={card} />

            <div className="flex flex-col gap-2">
                <div className="flex gap-5">
                    <p className="text-ellipsis text-nowrap font-bold text-black">₹ {card.landPrice}</p>
                    <ul className="list-disc pl-5">
                        <li><span>{card.landSize.acres && `${card.landSize.acres} Acres`} {card.landSize.cents && `${card.landSize.cents} Cents`} {card.landSize.guntas && `${card.landSize.guntas} Guntas`}</span></li>
                    </ul>

                </div>
                <p>{card.mandal}, {card.district}(dt)</p>
            </div>
        </div>
    )
}

export default Card
