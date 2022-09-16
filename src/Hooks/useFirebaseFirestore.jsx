import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
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

    const getDocsByCondition = useCallback(
      async ( addressCollection, field, condition, value ) => {
        const arr = [];
        const q = query(collection(db, addressCollection), where(field, condition, value))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          arr.push({
            ...doc.data(),
            id: doc.id
          })
        });
        return arr;
      }
    , [db])

    const getDocById = useCallback(
      async ( addressCollection, docId ) => {
        const docs = await getCollectionList(addressCollection);
        const doc = docs.find(doc => doc.id === docId);
        return doc;
      }, [getCollectionList])


    const setDocument = useCallback(
      async ( addressCollection, data ) => {
        await addDoc( collection(db, addressCollection), data);
      }, [db])

    return {
        getCollectionList,
        setDocument,
        getDocsByCondition,
        getDocById
    }
}
