import { useState, useCallback } from "react"
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, sendEmailVerification, updateEmail, updateProfile } from "firebase/auth";
import { useFirebaseStorage } from "./useFirebaseStorage";

export const useFirebaseProfile = (firebaseApp) => {
    
    const [user, ] = useState( getAuth(firebaseApp).currentUser );
    const { getUrlFile } = useFirebaseStorage(firebaseApp);

    const updateUserAvatar = useCallback( async (addressAvatar, user) => {
        const url = await getUrlFile(addressAvatar);
        await updateProfile(user, {photoURL: url});
    }, [getUrlFile])

    const updateUserEmail = useCallback( async (email) => {
        await updateEmail(user, email);
    }, [user]);

    const reauthentication = useCallback( async (password) => {
        const credencials = EmailAuthProvider.credential(user.email, password);
        return await reauthenticateWithCredential(user, credencials);
    }, [user]);

    const sendEmailForVerification = useCallback( async () => {
        await sendEmailVerification(user);
    }, [user]);


    return {
        updateUserAvatar,
        updateUserEmail,
        reauthentication,
        sendEmailForVerification,
    }
}
