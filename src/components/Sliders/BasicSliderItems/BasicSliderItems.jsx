import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import './basicSliderItems.scss'

export const BasicSliderItems = ({ title, data, folderData, urlName }) => {

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
                            folderData={folderData}
                            urlName={urlName}
                        />
                    ))
                }
            </Slider>
        </div>
    )
}


const RenderItem = ({ item, folderData, urlName }) => {

    const { name } = item;
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        const db = getStorage();
        getDownloadURL(ref(db, `${folderData}/${item.banner}`))
            .then(url => {
                setImageURL(url);
            })
    }, [folderData, item]);

    return (
        <Link to={`/${urlName}/${item.id}`}>
            <div className='basic-slider-items__list-item'> 
                <div 
                    className='avatar' 
                    style={{ backgroundImage: `url('${imageURL || ""}')` }}
                />
                <h3>{ name }</h3>
            </div>
        </Link>
    )
}
