import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { firebaseApp, alertError } from '../utils';
import { types } from '../types';


export const loginInFirebase = ({ email, password }) => {
    return async ( dispatch ) => {
        try {
            const auth = getAuth(firebaseApp);
            const response = await signInWithEmailAndPassword(auth, email, password);
            
            if( !response.user.emailVerified ) {
                toast.warning("Por favor, valide su correo electrónico");
                dispatch(setActiveUser(false));
            } else {
                dispatch( setUserInSotre( response.user ) );
            }

        } catch (error) {
            console.log({error});
            alertError(error.code);
        }
    }
}

export const resendEmailForVerification = () => {
    return async () => {

        try {
            const currentUser = getAuth(firebaseApp).currentUser;
            await sendEmailVerification(currentUser);
            toast.success("Se ha enviado el email de verificación");

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
            const auth = getAuth(firebaseApp);
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

        const auth = getAuth(firebaseApp);
        updateProfile(auth.currentUser, {
          displayName: username
    
        }).catch((error) => {
            console.log(error);
            toast.error("Error al asignar el nombre de usuario");
        })
    }
}

// TODO: resetear todo el store del redux
export const LogoutInFirebase = () => {
    return async ( dispatch ) => {
        const auth = getAuth(firebaseApp);
        await signOut(auth);
        dispatch( resetAuthStore() );
    }
}


export const resetAuthStore = () => ({
    type: types.authResetStore   
})