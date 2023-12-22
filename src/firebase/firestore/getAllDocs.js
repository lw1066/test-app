import { firebaseApp } from "../config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default async function getAllDocs(collectionName) {
    const collectionRef = collection(db, collectionName);

    let results = [];
    let error = null;

    try {
        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
        });
    } catch (e) {
        error = e;
    }

    return { results, error };
}

// export default async function getAllDocs(collectionName, pageSize, startAfterDoc) {
//     const collectionRef = collection(db, collectionName);
//     let query = collectionRef.orderBy('__name__').limit(pageSize);

//     if (startAfterDoc) {
//         query = query.startAfter(startAfterDoc);
//     }

//     try {
//         const querySnapshot = await getDocs(query);
//         const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];

//         return { results, lastDocument };
//     } catch (error) {
//         return { error };
//     }
// }

