import { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button, Dropdown, Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useFirebaseFirestore } from '../../Hooks';
import { firebaseApp } from '../../utils';

import NoImage from '../../assets/png/no-image.png';
import './addAlbumForm.scss';

export const AddAlbumForm = () => {
    
    const [albumImage, setAlbumImage] = useState(null);
    const [artistsOptions, setArtistsOptions] = useState([]);
    const [file, setFile] = useState(null);
    const { getCollectionList } = useFirebaseFirestore(firebaseApp);

    useEffect(() => {
        getCollectionList("artists")
            .then(arts => {
                let arr = [];
                arts.forEach(artist => {
                    arr.push({
                        key: artist.id,
                        value: artist.id,
                        text: artist.name
                    })
                })
                setArtistsOptions(arr);
            })
    }, [getCollectionList])


    const onDrop = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setFile(file);
        setAlbumImage(URL.createObjectURL(file));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpg, image/png",
        noKeyboard: true,
        onDrop
    })


    const onSubmit = () => {
        console.log("Sending Form");
    }

    return (
        <Form className="add-album-form" onSubmit={onSubmit}>
            <Form.Group>
                <Form.Field className="album-avatar" widt={5}>
                    <div 
                        {...getRootProps()}
                        className="avatar"
                        style={{backgroundImage: `url('${albumImage}')`}}
                    />
                    <input {...getInputProps()} />
                    { !albumImage && <Image src={NoImage} /> }
                </Form.Field>

                <Form.Field className="album-inputs" width={11}>
                    <Input placeholder="Album name" />
                    
                    <Dropdown 
                        placeholder='The album pertense...' 
                        search 
                        fluid
                        selection
                        lazyLoad
                        options={artistsOptions}
                    />
                </Form.Field>
            </Form.Group>
            <Button type='submit'>
                Create Album
            </Button>
        </Form>
    )
}
