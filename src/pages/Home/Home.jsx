import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { BannerHome } from '../../components/BannerHome/BannerHome';
import { BasicSliderItems } from '../../components/Sliders';

import './Home.scss';

export const Home = () => {

  const [artists, setArtists] = useState([]);

  useEffect(() => {

    const arrayArtists = [];
    const db = getFirestore();
    const q = query(collection(db, "artists"));
    getDocs(q).then(response => {
      response?.docs?.forEach(artist => {
        const data = artist.data();
        data.id = artist.id;
        arrayArtists.push(data);
      })  
    })

    setArtists(arrayArtists);
  }, [])

  return (
    <>
      <BannerHome />
      <div className='home'>
        <BasicSliderItems 
          title="Last Artists"
          data={artists}
        />
      </div>
    </>
  )
}
