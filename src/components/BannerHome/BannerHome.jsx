import React, { useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'

import './bannerHome.scss';

export const BannerHome = () => {

    const [bannerURL, setBannerURL] = useState(null);

    useEffect(() => {
        const db = getStorage();
        getDownloadURL(ref(db, "others/banner-home.webp"))
            .then(url => {
                setBannerURL(url);
            })
            .catch(error => {})
    }, [])

    if( !bannerURL ) return null;

    return (
        <div 
            className='banner-home'
            style={{backgroundImage: `url('${bannerURL}')`}}
        />
    )
}
