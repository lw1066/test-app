import { firebaseApp } from "../config";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import getAllDocs from "./getAllDocs";
import { getAuth, getIdTokenResult } from "firebase/auth";

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

async function addData(collectionName, data) {
  let result = null;
  let error = null;

  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User is not authenticated");
    }

    const idTokenResult = await getIdTokenResult(user);
    console.log("idTokenResult:", idTokenResult);
    if (!idTokenResult.claims.admin) {
      throw new Error("User does not have admin privileges");
    } else {
      console.log("User has admin privileges");
    }

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
