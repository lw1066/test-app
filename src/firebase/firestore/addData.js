import { firebaseApp } from "../config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

async function addData(collectionName, data) {
    let result = null;
    let error = null;

    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        result = docRef.id;
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export { addData };
