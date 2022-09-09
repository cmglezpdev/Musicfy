import React, { useState, useEffect } from 'react'
import { useFirebaseStorage } from '../../Hooks';
import { firebaseApp } from '../../utils';

import './bannerHome.scss';

export const BannerHome = () => {

    const [bannerURL, setBannerURL] = useState(null);
    const { getUrlFile } = useFirebaseStorage( firebaseApp );

    useEffect(() => {
        getUrlFile("others/banner-home.webp")
            .then(url => setBannerURL(url));
    }, [getUrlFile])

    if( !bannerURL ) return null;

    return (
        <div 
            className='banner-home'
            style={{backgroundImage: `url('${bannerURL}')`}}
        />
    )
}
