import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { firebaseApp } from "../config";

const db = getFirestore(firebaseApp);

export async function getAndModifyDoc(collection, id, updatedData) {
    const docRef = doc(db, collection, id);

    let result = null;
    let error = null;

    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // Document found, update it with the new data
            await updateDoc(docRef, updatedData);
            result = "Document updated successfully";
        } else {
            error = "Document does not exist";
        }
    } catch (e) {
        error = e.message;
    }

    return { result, error };
}
