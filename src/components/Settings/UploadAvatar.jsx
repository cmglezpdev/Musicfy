import React from 'react'
import { useState, useCallback } from 'react';
import { Image } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone';

import NoAvatar from '../../assets/png/user.png';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebaseStorage } from '../../Hooks/useFirebaseStorage';
import firebaseApp from '../../utils/Firebase';
import { ReloadApp } from '../../actions/uiActions';
import { toast } from 'react-toastify';
import { useFirebaseProfile } from '../../Hooks/useFirebaseProfile';

export const UploadAvatar = () => {
    
    const { uploadFile } = useFirebaseStorage(firebaseApp);
    const { updateUserAvatar } = useFirebaseProfile(firebaseApp);
    const {currentUser: user} = useSelector(state => state.auth);
    const [avatarUrl, setAvatarUrl] = useState(user.photoURL);
    const dispatch = useDispatch();

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        setAvatarUrl(URL.createObjectURL(file));
        
        try {
            await uploadFile(`avatar/${user.uid}`, file);
            await updateUserAvatar(`avatar/${user.uid}`, user);
            dispatch( ReloadApp() );
            toast.success('Avatar actualizado correntamente');
        } catch (error) {
            toast.error("Error al actualizar el avatar");
        }
        
        // eslint-disable-next-line
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    })

    return (
        <div className='user-avatar'{...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Image src={NoAvatar} />
            ) : (
                <Image src={ avatarUrl ? avatarUrl : NoAvatar }/>
            )}
        </div>
    )
}
