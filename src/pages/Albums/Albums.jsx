
import { useEffect, useState } from 'react';
import { ListCollection } from '../../components';
import { useFirebaseFirestore } from '../../Hooks'
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
            <ListCollection 
                collection={albums} 
                collBannersFirebase={"albums"} 
                personalLinkItem={"album"} 
            />
        </div>
    )
}
