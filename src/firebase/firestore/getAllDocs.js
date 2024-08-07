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
    console.error("Error fetching documents:", e);
  }

  return { results, error };
}
