import React, { useEffect } from 'react'
import { useState } from 'react';
import { BannerHome } from '../../components/BannerHome/BannerHome';
import { BasicSliderItems } from '../../components/Sliders';
import { useFirebaseFirestore } from '../../Hooks/useFirebaseFirestore';
import firebaseApp from '../../utils/Firebase';

import './Home.scss';

export const Home = () => {

  const [artists, setArtists] = useState([]);
  const { getCollectionList } = useFirebaseFirestore(firebaseApp);

  useEffect(() => {
    getCollectionList("artists")
    .then(arrayArtist => {
      console.log(arrayArtist);
      setArtists(arrayArtist)
    });
  }, [getCollectionList])

  return (
    <>
      <BannerHome />
      <div className='home'>
        <BasicSliderItems 
          title="Last Artists"
          data={artists}
          folderData="artists"
          urlName="artist"
        />
      </div>
    </>
  )
}
