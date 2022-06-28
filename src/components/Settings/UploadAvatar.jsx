import React from 'react'
import { useState, useCallback } from 'react';
import { Image } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import firebaseApp from '../../utils/Firebase';
import { } from 'firebase/storage';
import { } from 'firebase/auth';

import NoAvatar from '../../assets/png/user.png';

export const UploadAvatar = ({ user }) => {
  
    const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
    })

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
