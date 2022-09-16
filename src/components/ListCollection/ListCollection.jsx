import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import { useFirebaseStorage } from '../../Hooks';
import { firebaseApp } from '../../utils';

import './listCollection.scss';

export const ListCollection = ({ collection, collBannersFirebase, personalLinkItem }) => {
    return (
        <Grid>
        { 
            collection.map(item => (
                <Grid.Column  key={item.id} mobile={8} tablet={4} computer={3}>
                    <Item item={item} collBannersFirebase={collBannersFirebase} personalLinkItem={personalLinkItem} />
                </Grid.Column>
            )) 
        }
        </Grid>
    )
}

const Item = ({ item, collBannersFirebase, personalLinkItem }) => {
    const { getUrlFile } = useFirebaseStorage(firebaseApp);
    const [banner, setBanner] = useState(null);
  
    useEffect(() => {
      getUrlFile(`${collBannersFirebase}/${item.banner}`)
        .then(url => setBanner(url));
    }, [item, collBannersFirebase, getUrlFile]);
  
    return (
      <Link to={`/${personalLinkItem}/${item.id}`}>
        <div className="collections__item">
          <div 
            className='avatar' 
            style={{backgroundImage: `url('${banner}')`}}
          />
          <h3>{ item.name }</h3>
        </div>
      </Link>
    )
}

ListCollection.propTypes = {
  collection: PropTypes.array.isRequired,
  collBannersFirebase: PropTypes.string.isRequired,
  personalLinkItem: PropTypes.string.isRequired,
}