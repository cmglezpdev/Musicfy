import { getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid'
import { ChangeViewModal } from "./uiActions";
import firebaseApp from '../utils/Firebase';


export const saveArtist = ({ nameArtist, banner }) => {
    return async ( dispatch ) => {
        try {
            // Save the Banner
            const bannerName = uuidv4();
            await uploadFile(`artists/${bannerName}`, banner);
            
            // Save the Artist
            const data = {
                name: nameArtist,
                banner: bannerName 
            };
            const db = getFirestore(firebaseApp);
            await addDoc( collection(db, "artists"), data);

            toast.success("Successfully the artist created")
        } catch (error) {
            toast.error("Error in save the artist!");
        }

        dispatch( ChangeViewModal(false) );
    }
}


export const uploadFile = (address, file) => {
   
    try {
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, address);
        
        return uploadBytes(storageRef, file);
        
    } catch (error) {
        toast.error("Error in the upload File!");
    }

}
