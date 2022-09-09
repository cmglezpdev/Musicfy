import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useCallback } from "react";
import { useState } from "react"

export const useFirebaseStorage = ({ firebaseApp }) => {
    const [db, ] = useState( getStorage( firebaseApp ) );

    const getUrlFile = useCallback( async ( address ) => {
        const urlFile = await getDownloadURL(ref(db, address));
        return urlFile;
    }, [db]);

    return {
        getUrlFile
    }
}
