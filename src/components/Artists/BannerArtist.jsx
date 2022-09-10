import React, { useEffect, useState } from "react";
import { useFirebaseStorage } from "../../Hooks";
import { firebaseApp } from "../../utils";
 
// TODO: agregar en el scss el gradiente del fondo
import './bannerArtist.scss';

export const BannerArtist = React.memo(({ artist }) => {

    const { getUrlFile } = useFirebaseStorage(firebaseApp);
    const [bannerUrl, setBannerUrl] = useState(null);

    useEffect(() => {

        getUrlFile(`artists/${artist.banner}`)
            .then(url => {
                setBannerUrl(url);
            })
    }, [artist, getUrlFile])


    return (
        <div 
            className="banner-artist"
            style={{backgroundImage: `url('${bannerUrl}')`}}
        >
            <div className="banner-artist__gradient" />
            <div className="banner-artist__info">
                <h4>ARTIST</h4>
                <h1>{artist.name}</h1>
            </div>
        </div>
    )
})
