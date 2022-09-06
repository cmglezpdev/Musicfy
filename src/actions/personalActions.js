import { updateProfile, updateEmail } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { alertError } from "../utils/alert-errors";
import { reauthentication } from "../utils/Api";
import { LogoutInFirebase, resendEmailForVerification } from "./authActions";
import { ChangeViewModal, ReloadApp } from "./uiActions";


export const updateEmailUser = ({ email, password }) => {
    return async (dispatch, getData) => {
        try {
            const { currentUser: user } = getData().auth;
            console.log(user)
            await reauthentication(password);
            await updateEmail(user, email);
            toast('Email Actualizado Correctamente');

            dispatch( resendEmailForVerification() ) // Send Email for Verification
            dispatch( LogoutInFirebase() ) // Logout for the login again

        } catch (error) {
            alertError(error?.code);
        }
    }
}

export const updateNameUser = ( user, name ) => {
    return async ( dispatch ) => {

        try {
            await updateProfile( user, { displayName: name } )
            dispatch( ReloadApp() );
            toast.success( "Nombre de usuario actualizado correctamente!" );
            dispatch( ChangeViewModal(false) );
            
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

    return async ( dispatch ) => {
        try {
            
            await uploadAvatarUser( user, file );

            const storage = getStorage();
            const storageRef = ref(storage, `avatar/${user.uid}`);
            const url = await getDownloadURL(storageRef)
            console.log(url);
            updateProfile(user, {photoURL: url});
            dispatch( ReloadApp() );
            toast.success('Avatar actualizado correntamente');
            
        } catch (error) {
            toast.error("Error al actualizar el avatar");
        }
    }
}   

// TODO: Sacar todos los toasts, reload app y viewModals(todo lo que no sea la logica) de aqui