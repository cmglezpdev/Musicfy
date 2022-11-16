import { useState, useEffect, useCallback } from 'react';
import { Button, Dropdown, Form, Icon, Input } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuid } from 'uuid';
import { firebaseApp } from '../../utils';
import { useFirebaseFirestore, useFirebaseStorage, useForm } from '../../Hooks';

import './addSongForm.scss';
import { toast } from 'react-toastify';

export const AddSongForm = () => {

    const { getCollectionList, setDocument } = useFirebaseFirestore(firebaseApp);
    const { uploadFile } = useFirebaseStorage(firebaseApp); 
    const [formData, handleInputChange, reset] = useForm({song: "", album: ""});
    const [albums, setAlbums] = useState([]);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    
    useEffect(() => {
        getCollectionList("albums")
        .then(albs => {
            const arralbums = [];
            albs.forEach(({ id, name }) => {
                 arralbums.push({
                    key: id,
                    value: id,
                    text: name
                })
            })
            
            setAlbums(arralbums);
        })
        
    }, [getCollectionList])
    
    const onDrop = useCallback(acceptFile => {
        const file = acceptFile[0];
        setFile(file);
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        accept: '.mp3',
        noKeyboard: true,
        onDrop
    })

    const onSubmit = async (e) => {
        e.preventDefault();
        if( formData.song === "" || formData.album === "" ) {
            toast.warning('The song name and the album are required!');
            return;
        }
        
        // Send to firebase
        try {
            setIsLoading(true);
            const result = await uploadFile(`songs/${uuid()}`, file, {contentType: file.type})
            const data = {
                    name: formData.song,
                    album: formData.album,
                    song: result.metadata.name
                }
            await setDocument("songs", data)
            setIsLoading(false);
            toast.success('Song uploading successfully!');
            resetForm();
        } catch (error) {
            console.log(error);
            toast.error("Error to upload the song. Try later!");
            setIsLoading(false);
        }
    }

    const resetForm = () => {
        setFile(null);
        reset();
    }

    return (
        <Form className="add-song-form" onSubmit={onSubmit}>
            <Form.Field>
                <Input 
                    placeholder="Song Name"
                    name="song"
                    onChange={handleInputChange}
                />
            </Form.Field>

            <Form.Field>
                <Dropdown 
                    placeholder='Select Album'
                    search
                    selection
                    lazyLoad
                    options={albums}
                    onChange={(e, data) => handleInputChange({target:{name:"album", value: data.value}})}
                />
            </Form.Field>
            
            <Form.Field>
                <div className="song-upload" { ...getRootProps() } >
                    <input {...getInputProps} />
                    <Icon name="cloud upload" className={file && 'load'} />
                    <div>
                        <p>Drag your song or click <span>here</span>.</p>
                        {file && (
                            <p>Uploaded Song: <span>{file.name}.mp3</span></p>
                        )}
                    </div>
                </div>
            </Form.Field>

            <Button type='submit' loading={isLoading}>
                Upload Song
            </Button>
        </Form>
    )
}
