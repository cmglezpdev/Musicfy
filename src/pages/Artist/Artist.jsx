import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { BannerArtist } from '../../components';
import { useFirebaseFirestore } from '../../Hooks';
import { firebaseApp } from '../../utils';
 
export const Artist = () => {
  
  const params = useParams();
  const { getCollectionList } = useFirebaseFirestore(firebaseApp);
  const [artist, setArtist] = useState(null);
  

  useEffect(() => {
    getCollectionList("artists")
      .then(coll => {
        const art = coll.filter(a => a.id === params.id)[0];
        setArtist(art);
      })
  }, [params, getCollectionList])

  return (  
      <div className='artist'>
        { artist && <BannerArtist artist={artist} /> }
        <h2>More Information</h2>
      </div>
    )
}
