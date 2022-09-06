import React from 'react'
import { useState, useCallback } from 'react';
import { Image } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone';

import NoAvatar from '../../assets/png/user.png';
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar } from '../../actions/personalActions';

export const UploadAvatar = () => {
    
    const {currentUser: user} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        setAvatarUrl(URL.createObjectURL(file));
        await dispatch( updateAvatar( user, file ) );
        
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
