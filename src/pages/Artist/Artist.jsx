
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { BannerArtist, BasicSliderItems } from '../../components';
import { useFirebaseFirestore } from '../../Hooks';
import { firebaseApp } from '../../utils';
 
import './artist.scss';

export const Artist = () => {
  
  const params = useParams();
  const { getCollectionList, getDocsByCondition } = useFirebaseFirestore(firebaseApp);
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  
  console.log(albums);

  useEffect(() => {
    getCollectionList("artists")
      .then(coll => {
        const art = coll.filter(a => a.id === params.id)[0];
        setArtist(art);
      })
  }, [getCollectionList, params.id])

  useEffect(() => {
    if( artist ) {
      getDocsByCondition("albums", 'artist', '==', artist.id)
      .then(albs => setAlbums(albs));
    }
  }, [artist, getDocsByCondition])

  return (  
    <div className='artist'>
      { artist && <BannerArtist artist={artist} /> }

      <BasicSliderItems 
        title="Albums"
        folderData="albums"
        urlName="album"
        data={albums}
      />
    </div>
  )
}
