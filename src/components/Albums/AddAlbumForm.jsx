import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Dropdown, Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useFirebaseFirestore, useFirebaseStorage,useForm } from '../../Hooks';
import { firebaseApp } from '../../utils';
import { closeModal } from '../../actions/uiActions';

import NoImage from '../../assets/png/no-image.png';
import './addAlbumForm.scss';

export const AddAlbumForm = () => {
    
    const [albumImage, setAlbumImage] = useState(null);
    const [artistsOptions, setArtistsOptions] = useState([]);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { getCollectionList, setDocument } = useFirebaseFirestore(firebaseApp);
    const { uploadFile } = useFirebaseStorage(firebaseApp);

    const [formData, handleInputChange, reset, handleUpdateField] = useForm({
        name: "",
        artist: "",
    });

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

    const onSubmit = async () => {
        if( !formData.name || !formData.artist ) {
            toast.warning("The album and artist are required!")
            return;
        }
        if( !file ) {
            toast.warning("The album image is required!");
            return;
        }
        setIsLoading(true);
        
        try {
            const fileName = uuidv4();
            await uploadFile(`albums/${fileName}`, file, { contentType: file.type })
            await setDocument("albums", {
                name: formData.name,
                artist: formData.artist,
                banner: fileName
            })
            toast.success("Successfully album created!");
            resetForm();
        } catch (error) {
            toast.error("Error to create the album!");            
        }

        setIsLoading(false);
        dispatch(closeModal());
    }

    const resetForm = () => {
        reset();
        setFile(null);
        setAlbumImage(null);
        setArtistsOptions([]);
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
                    <Input 
                        placeholder="Album name" 
                        name="name"
                        onChange={handleInputChange}    
                    />
                    
                    <Dropdown 
                        placeholder='The album pertense...' 
                        search 
                        fluid
                        selection
                        lazyLoad
                        options={artistsOptions}
                        onChange={ (e, data) => handleUpdateField("artist", data.value)}
                    />
                </Form.Field>
            </Form.Group>
            <Button type='submit' loading={isLoading}>
                Create Album
            </Button>
        </Form>
    )
}
