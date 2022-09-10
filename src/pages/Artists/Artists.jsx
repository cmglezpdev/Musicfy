import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { useFirebaseFirestore, useFirebaseStorage } from '../../Hooks';
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
      <Grid>
        {
          artists.map(artist => (
            <Grid.Column key={artist.id} mobile={8} tablet={4} computer={3}>
              <Artist artist={artist} />
            </Grid.Column>
          ))
        }
      </Grid>
    </div>
  )
}


const Artist = ({ artist }) => {

  const { getUrlFile } = useFirebaseStorage(firebaseApp);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    getUrlFile(`artists/${artist.banner}`)
      .then(url => setBanner(url));
  }, [artist, getUrlFile]);

  return (
    <Link to={`/artist/${artist.id}`}>
      <div className="artists__item">
        <div 
          className='avatar' 
          style={{backgroundImage: `url('${banner}')`}}
        />
        <h3>{ artist.name }</h3>
      </div>
    </Link>
  )
}