import React, { useEffect, useState } from 'react'
import { BannerHome, BasicSliderItems } from '../../components';
import { useFirebaseFirestore } from '../../Hooks';
import { firebaseApp } from '../../utils';

import './Home.scss';

export const Home = () => {

  const [artists, setArtists] = useState([]);
  const { getCollectionList } = useFirebaseFirestore(firebaseApp);

  useEffect(() => {
    getCollectionList("artists")
    .then(arrayArtist => {
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
