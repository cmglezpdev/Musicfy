import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Slider from 'react-slick';

import './basicSliderItems.scss'

export const BasicSliderItems = ({ title, data }) => {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        className: "basic-slider-items__list"
    }
    return (
        <div className='basic-slider-items'>
            <h2>{title}</h2>
            <Slider {...settings}>
                {
                    data.map(item => (
                        <RenderItem 
                            key={item.id}
                            item={item}
                        />
                    ))
                }
            </Slider>
        </div>
    )
}


const RenderItem = ({ item }) => {

    const { name } = item;
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {

        const db = getStorage();
        getDownloadURL(ref(db, `artists/${item.banner}`))
            .then(url => {
                setImageURL(url);
            })
    }, [item]);

    return (
        <div className='basic-slider-items__list-item'> 
            <div 
                className='avatar' 
                style={{ backgroundImage: `url('${imageURL || ""}')` }}
            />
            <h3>{ name }</h3>
        </div>
    )
}