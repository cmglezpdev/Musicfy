import firebaseApp from '../utils/Firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
            }

        } catch (error) {
            console.log({error});
            alertError(error.code);
        }
    }
}

export const setUserInSotre = ( user ) => ({
    type: types.authSetUserInStore,
    payload: user
})