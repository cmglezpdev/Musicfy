import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useState } from "react";

export const useFirebaseV9Firestore = ({ firebaseApp }) => {
    
    const [db, ] = useState( getFirestore(firebaseApp) );


    
    const getCollectionList = ( addressCollection ) => {
        const arrayItems = [];
        const q = query(collection(db, addressCollection));
        
        getDocs(q).then(response => {
          response?.docs?.forEach(item => {
            const data = item.data();
            data.id = item.id;
            arrayItems.push(data);
          })  
        })

        return arrayItems;
    }


    return {
        getCollectionList
    }
}
