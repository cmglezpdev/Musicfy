// import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useFirebaseStorage } from '../../../Hooks';
import { firebaseApp } from '../../../utils';

import './basicSliderItems.scss'
// TODO: Arreglar la pila de renders que se hacen innecesariamente. Las fotos salen repetidas dos veces
// el map con los items se reccore solo una vez pero RenderItem se renderiza muchas veces mas

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
                    data.map((item, index) => {
                        console.log(index, " => ", item); 
                        return (
                        <RenderItem 
                            key={item.id}
                            item={item}
                            folderData={folderData}
                            urlName={urlName}
                        />
                    )})
                }
            </Slider>
        </div>
    )
}


const RenderItem = ({ item, folderData, urlName }) => {

    const [imageURL, setImageURL] = useState(null);
    const { getUrlFile } = useFirebaseStorage(firebaseApp);

    useEffect(() => {
        getUrlFile(`${folderData}/${item.banner}`)
            .then(url => setImageURL(url))
    }, [folderData, getUrlFile, item.banner]);

    console.log('repetition');

    return (
        <Link to={`/${urlName}/${item.id}`}>
            <div className='basic-slider-items__list-item'> 
                <div 
                    className='avatar' 
                    style={{ backgroundImage: `url('${imageURL}')` }}
                />
                <h3>{ item.name }</h3>
            </div>
        </Link>
    )
}
