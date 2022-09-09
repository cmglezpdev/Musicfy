import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'semantic-ui-react'
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { useFirebaseStorage, useFirebaseProfile } from '../../Hooks';
import { firebaseApp } from '../../utils';
import { ReloadApp } from '../../actions/uiActions';
import NoAvatar from '../../assets/png/user.png';

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
