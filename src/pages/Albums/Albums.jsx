
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { useFirebaseFirestore, useFirebaseStorage } from '../../Hooks'
import { firebaseApp } from '../../utils';

import './albums.scss';

export const Albums = () => {

    const { getCollectionList } = useFirebaseFirestore(firebaseApp);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        getCollectionList("albums")
        .then(arrayAlbums => setAlbums(arrayAlbums))
    }, [getCollectionList])


    return (
        <div className='albums'>
            <h1>Albums</h1>

            <Grid>
                { 
                    albums.map(album => (
                        <Grid.Column  key={album.id} mobile={8} tablet={4} computer={3}>
                            <Album album={album} />
                        </Grid.Column>
                    )) 
                }
            </Grid>
        </div>
    )
}


const Album = ({ album }) => {
    const { getUrlFile } = useFirebaseStorage(firebaseApp);
    const [banner, setBanner] = useState(null);
  
    useEffect(() => {
      getUrlFile(`albums/${album.banner}`)
        .then(url => setBanner(url));
    }, [album, getUrlFile]);
  
    return (
      <Link to={`/album/${album.id}`}>
        <div className="artists__item">
          <div 
            className='avatar' 
            style={{backgroundImage: `url('${banner}')`}}
          />
          <h3>{ album.name }</h3>
        </div>
      </Link>
    )
}