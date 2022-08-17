import firebaseApp from './Firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential } from 'firebase/auth';
const db = getFirestore(firebaseApp);

export async function isUserAdmin(uid) {
    const querySnapshot = await getDocs( collection(db, "admins") );
    let response = false;
    
    querySnapshot.forEach((doc) => {
        if( doc.id === uid ) {
            response = true;
        }
    });

    return response;
}


export const reauthentication = (password) => {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;

    const credencials = EmailAuthProvider.credential(user.email, password);
    return reauthenticateWithCredential(user, credencials);
}