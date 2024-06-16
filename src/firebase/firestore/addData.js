import { firebaseApp } from "../config";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import getAllDocs from "./getAllDocs";

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

const manualRefresh = async () => {
  try {
    const { results, error } = await getAllDocs("news");
    if (!error) {
      // setNewsDataArray(results);
      localStorage.setItem("newsDataArray", JSON.stringify(results));
      localStorage.setItem("newsDataTimestamp", new Date().toISOString());
    } else {
      console.error("Error fetching news data:", error);
    }
  } catch (error) {
    console.error("Error fetching news data:", error);
  }
};

export { addData, manualRefresh };
