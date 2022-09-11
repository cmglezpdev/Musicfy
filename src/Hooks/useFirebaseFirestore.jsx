import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { useCallback, useState } from "react";

export const useFirebaseFirestore = (firebaseApp) => {
    
    const [db, ] = useState( getFirestore(firebaseApp) );


    const getCollectionList = useCallback(
      async ( addressCollection ) => {
        const querySnapshot = await getDocs(collection(db, addressCollection))
        const arr = []; 
        querySnapshot.forEach((doc) => {
          arr.push({
            ...doc.data(),
            id: doc.id
          });
        });
        return arr;
      }, [db])

      const setDocument = useCallback(
        async ( addressCollection, data ) => {
          await addDoc( collection(db, addressCollection), data);
        }, [db])

    return {
        getCollectionList,
        setDocument,
    }
}