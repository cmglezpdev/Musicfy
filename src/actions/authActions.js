import firebaseApp from '../utils/Firebase';
import { getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
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
            
            const currentUser = getState().auth.currentUser;
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

export const resetAuthStore = () => ({
    type: types.authResetStore   
})