import { updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { alertError } from "../utils/alert-errors";
import { reauthentication } from "../utils/Api";

export const updateEmail = ({ email, password }) => {
    return async () => {
        try {
            await reauthentication(password)
            console.log("auth Corrento")
            
        } catch (error) {
            alertError(error?.code);
        }
    }
}

export const updateName = ( user, name ) => {
    return async () => {

        try {
            await updateProfile( user, { displayName: name } )
            // setReloadApp(e => !e);
            toast.success( "Nombre de usuario actualizado correctamente!" );
            // setShowModal(false);
            
        } catch (error) {
            console.error(error);
            toast.error( "Error al actualizar el nombre de usuario!" );   
        }
    }
}

const uploadAvatarUser = (user, file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${user.uid}`);
    
    return uploadBytes(storageRef, file);
}


export const updateAvatar = ( user, file ) => {

    return async () => {
        try {
            
            await uploadAvatarUser( user, file );

            const storage = getStorage();
            const storageRef = ref(storage, `avatar/${user.uid}`);
            const url = await getDownloadURL(storageRef)
            console.log(url);
            updateProfile(user, {photoURL: url});
            // setReloadApp(e => !e);
            toast.success('Avatar actualizado correntamente');
            
        } catch (error) {
            toast.error("Error al actualizar el avatar");
        }
    }
}   