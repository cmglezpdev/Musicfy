import firebaseApp from '../utils/Firebase';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { types } from '../types';
import { toast } from 'react-toastify';
import { alertError } from '../utils/alert-errors';


export const loginInFirebase = ({ email, password }) => {
    return async ( dispatch ) => {
        try {
            const auth = getAuth(firebaseApp);
            const response = await signInWithEmailAndPassword(auth, email, password);
            
            dispatch( setUserInSotre( response.user ) );
            if( !response.user.emailVerified ) {
                toast.warning("Por favor, valide su correo electronico");
                dispatch(setActiveUser(false));
            }

        } catch (error) {
            console.log({error});
            alertError(error.code);
        }
    }
}

export const resendEmailForVerification = () => {
    return async ( dispatch, getState ) => {

        try {
            const currentUser = getAuth().currentUser;
            await sendEmailVerification(currentUser);
            toast.success("Se ha enviado el email de verificacion");

        } catch (error) {
            alertError(error.code);
        }
    }
}


export const setUserInSotre = ( user ) => ({
    type: types.authSetUserInStore,
    payload: user
})


export const setActiveUser = ( activeUser ) => ({
    type: types.authSetUserActive,
    payload: activeUser
}) 


export const registerInFirebase = ({ email, password, username }) => {
    return async (dispatch) => {
        try {
            const auth = getAuth();
            await createUserWithEmailAndPassword( auth, email, password )
            
            dispatch(changeUserName(username));
            dispatch(resendEmailForVerification());

        } catch (error) {
            console.log(error);
            toast.error("Error al crear la cuenta");
        }
    }
}

export const changeUserName = (username) => {
    
    return async () => {

        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: username
    
        }).catch((error) => {
            console.log(error);
            toast.error("Error al asignar el nombre de usuario");
        })
    }
}


export const resetAuthStore = () => ({
    type: types.authResetStore   
})