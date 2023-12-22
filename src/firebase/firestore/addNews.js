import { firebaseApp } from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

const collectionName = "newsArray"; // Name of the collection

async function setArrayInFirestore(itemsArray) {
    const docRef = doc(db, collectionName);

    try {
        await setDoc(docRef, { items: itemsArray });
        console.log("Items array stored in Firestore!");
    } catch (error) {
        console.error("Error storing items array:", error);
    }
}

setArrayInFirestore(itemsArray);
