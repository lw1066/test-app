import { firebaseApp } from "../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

async function deleteData(collectionName, docId) {
    let result = null;
    let error = null;

    try {
        await deleteDoc(doc(db, collectionName, docId));
        result = 'Document successfully deleted';
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export { deleteData };