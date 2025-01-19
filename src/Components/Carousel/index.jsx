import React from 'react'
import Slider from 'react-slick'

const Carousel = ({ card }) => {
    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // variableWidth: true,
        adaptiveHeight: true,
    };
    return (
        <Slider {...carouselSettings}>
            {card.images.map((image, imgIndex) => (
                <div key={imgIndex}>
                    <img
                        src={image}
                        alt={`Carousel image ${imgIndex}`}
                        className='w-full h-[200px] object-cover rounded-[5px]'
                    />
                </div>
            ))}
        </Slider>
    )
}

export default Carousel
