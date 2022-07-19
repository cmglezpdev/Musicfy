import React from 'react'
import { useState, useCallback } from 'react';
import { Image } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import firebaseApp from '../../utils/Firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';

import NoAvatar from '../../assets/png/user.png';

export const UploadAvatar = ({ user, setReloadApp }) => {
  
    const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        // console.log(file);
        setAvatarUrl(URL.createObjectURL(file));
        uploadImage(file).then(() => {
            updateUserAvatar();
        })
    })

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    })

    const uploadImage = (file) => {
        const storage = getStorage();
        const storageRef = ref(storage, `avatar/${user.uid}`);
        
        return uploadBytes(storageRef, file);
    }

    const updateUserAvatar = () => {
        const storage = getStorage();
        const storageRef = ref(storage, `avatar/${user.uid}`);
        getDownloadURL(storageRef).then(url => {
            updateProfile(user, {photoURL: url});
            setReloadApp(e => !e);
            toast.success('Avatar actualizado correntamente');
        }).catch((error) => {
            toast.error("Error al actualizar el avatar");
        })
    }   

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
