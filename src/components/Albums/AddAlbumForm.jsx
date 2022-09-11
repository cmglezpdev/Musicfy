import { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button, Dropdown, Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';

import NoImage from '../../assets/png/no-image.png';
import './addAlbumForm.scss';

export const AddAlbumForm = () => {
    
    const [albumImage, setAlbumImage] = useState(null);
    const [file, setFile] = useState(null);

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
                    <Dropdown placeholder='The album pertense...' search />
                </Form.Field>
            </Form.Group>
            <Button type='submit'>
                Create Album
            </Button>
        </Form>
    )
}
