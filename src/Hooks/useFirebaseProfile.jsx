import { useState, useCallback } from "react"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useFirebaseStorage } from "./useFirebaseStorage";

export const useFirebaseProfile = (firebaseApp) => {
    
    const [database, ] = useState(getFirestore(firebaseApp));
    const [storage,  ] = useState(getStorage(firebaseApp));
    const { getUrlFile } = useFirebaseStorage(firebaseApp);

    const updateAvatar = useCallback( async (addressAvatar, user) => {
        const url = await getUrlFile(addressAvatar);
        await updateProfile(user, {photoURL: url});
    }, [getUrlFile])

    return {
        updateAvatar
    }
}
