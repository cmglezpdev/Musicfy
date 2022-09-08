import React, { useState,useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { Form, Input, Image, Button } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'
import NoImage from '../../assets/png/no-image.png';
import './AddArtistForm.scss'
import { useForm } from '../../Hooks/useForm';
import { toast } from 'react-toastify';
import { saveArtist } from '../../actions/storageActions';

export const AddArtistForm = () => {

    const dispatch = useDispatch();
    const [formData, handleInputChange, reset] = useForm({name: ""})
    const [banner, setBanner] = useState(null);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0]; 
        setFile( file );
        setBanner(URL.createObjectURL(file));
    },[])

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpg, image/png',
        noKeyboard: true,
        onDrop
    });

    const onSubmit = async () => {
        if( !formData.name.trim() === 0 ) {
            toast.warning("Add the artist name!");
            return;
        }
        if( !file ) {
            toast.warning("Add the artist banner!");
            return;
        }

        setIsLoading(true);
        const metadata = {
            contentType: file.type
        }
        await dispatch(saveArtist( {nameArtist: formData.name, banner: file, metadata} ));
        reset();
        setIsLoading(false);
    }

    return (
        <Form className="add-artist-form" onSubmit={onSubmit}>
            <Form.Field className="artist-banner">
                <div 
                    {...getRootProps()} 
                    className="banner" 
                    style={{backgroundImage: `url('${banner}')`}}
                />
                <input {...getInputProps()} /> 
                { !banner && <Image src={NoImage} /> }
            </Form.Field>

            <Form.Field className="artist-avatar">
                <div 
                    className='avatar'
                    style={{backgroundImage: `url('${banner ? banner : NoImage}')`}}
                />
            </Form.Field>
            
            <Form.Field>
                <Input 
                    name="name"
                    type="text" 
                    placeholder='Artist Name'
                    onChange={handleInputChange}
                />
            </Form.Field>
            <Button type='submit' loading={isLoading}>
                Create Artist
            </Button>
        </Form>
    )
}
