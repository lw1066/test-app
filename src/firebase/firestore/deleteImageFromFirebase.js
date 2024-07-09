import { storage } from "../config";
import { ref, deleteObject } from "firebase/storage";

export const deleteImageFromFirebase = async (url) => {
  try {
    const fileRef = ref(storage, url);
    console.log(fileRef);
    await deleteObject(fileRef);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};
