import { firebaseApp } from './Firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
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
