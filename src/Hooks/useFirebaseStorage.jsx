import { useCallback, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const useFirebaseStorage = (firebaseApp) => {
    const [db, ] = useState( getStorage( firebaseApp ) );

    const getUrlFile = useCallback( async ( address ) => {
        const urlFile = await getDownloadURL(ref(db, address));
        return urlFile;
    }, [db]);

    const uploadFile = useCallback( async (address, file, metadata) => {
        const storageRef = ref(db, address);
        return await uploadBytes(storageRef, file, metadata );    
    }, [db])



    return {
        getUrlFile,
        uploadFile,
    
    }
}
