import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Loader } from 'semantic-ui-react';
import { useFirebaseFirestore, useFirebaseStorage } from '../../Hooks';
import { firebaseApp } from '../../utils';
 
import './album.scss';

export const Album = () => {
  
  const params = useParams();
  const { getCollectionList, getDocument } = useFirebaseFirestore(firebaseApp);
  const { getUrlFile } = useFirebaseStorage(firebaseApp);
  const [album, setAlbum] = useState(null);
  const [banner, setBanner] = useState(null);
  const [artist, setArtist] = useState(null);
  

  useEffect(() => {
    getCollectionList("albums")
      .then(coll => {
        const alb = coll.filter(a => a.id === params.id)[0];
        setAlbum(alb);
      })
  }, [params, getCollectionList])

  useEffect(() => {
    if( album ) {
        getUrlFile(`albums/${album?.banner}`)
        .then(url => setBanner(url));
    }
  }, [album, getUrlFile])

  useEffect(() => {
    if( album?.artist ) {
        getDocument("artists", album.artist)
        .then(art => setArtist(art))
    }
  }, [album, getDocument])

  if( !album || !artist ) {
    return <Loader active>Loading...</Loader>
  }

  return (  
      <div className='album'>
        <HeaderAlbum 
            album={album} 
            artist={artist} 
            banner={banner}
        />
        <div className="album__songs">
            <p>Songs list</p>
        </div>
      </div>
    )
}

const HeaderAlbum = ({ album, artist, banner }) => {
    return (
        <div className='album__header'>
            <div 
                className='image'
                style={{backgroundImage: `url(${banner})`}}
            />
            <div className="info">
                <h1>{album.name}</h1>
                <p>{artist.name}</p>
            </div>
        </div>
    )
}