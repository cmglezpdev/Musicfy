import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { alertError } from "../utils/alert-errors";
import { reauthentication } from "../utils/Api";
import { LogoutInFirebase, resendEmailForVerification } from "./authActions";
import { uploadFile } from "./storageActions";
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

// TODO: Sacar todos los toasts, reload app y viewModals(todo lo que no sea la logica) de aqui

export const updatePasswordUser = ( oldPassword, newPassword ) => {
    return async (dispatch, getData) => {
        try {
            const { currentUser:user } = getData().auth;
            await reauthentication( oldPassword );
            await updatePassword(user, newPassword);
            toast.success("Successfully password updated")

        } catch (error) {
            alertError(error?.code)
        }
        


    }
}