import React, { useEffect, useState } from 'react';
import { ListCollection } from '../../components';
import { useFirebaseFirestore } from '../../Hooks';
import { firebaseApp } from '../../utils';

import './Artists.scss';

export const Artists = () => {

  const { getCollectionList } = useFirebaseFirestore(firebaseApp);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
     getCollectionList("artists")
        .then(list => {
          setArtists(list);
        })
  }, [getCollectionList]);

  return (
    <div className='artists'>
      <h1>Artists</h1>

      <ListCollection 
        collection={artists} 
        collBannersFirebase={"artists"} 
        personalLinkItem={"artist"} 
      />
    </div>
  )
}