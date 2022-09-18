import { useState, useEffect } from 'react';
import { Button, Dropdown, Form, Input } from 'semantic-ui-react';
import { firebaseApp } from '../../utils';
import { useFirebaseFirestore } from '../../Hooks';

export const AddSongForm = () => {

    const { getCollectionList } = useFirebaseFirestore(firebaseApp);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        getCollectionList("albums")
        .then(albs => {
            const arralbums = albs.map(({ id, name }) => ({
                key: id,
                value: id,
                text: name
            }))

            setAlbums(arralbums);
        })

    }, [getCollectionList])



    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Sending Form");
    }

    return (
        <Form className="add-song-form" onSubmit={onSubmit}>
            <Form.Field>
                <Input 
                    placeholder="Song Name"
                />
            </Form.Field>

            <Form.Field>
                <Dropdown 
                    placeholder='Select Album'
                    search
                    selection
                    lazyLoad
                    options={albums}
                />
            </Form.Field>
            
            <Form.Field>
                <h2>Upload Song</h2>
            </Form.Field>

            <Button type='submit'>
                Upload Song
            </Button>
        </Form>
    )
}
