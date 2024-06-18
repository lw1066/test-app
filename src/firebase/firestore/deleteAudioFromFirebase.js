import { getStorage, ref, deleteObject } from "firebase/storage";

// Initialize Firebase storage
const storage = getStorage();

export const deleteAudioFromFirebase = async (audioFileUrl) => {
  try {
    console.log(audioFileUrl.downloadURL, "in deletefunction!");
    const fileRef = ref(storage, audioFileUrl.downloadURL);

    // Delete the file
    await deleteObject(fileRef);
    console.log("File deleted successfully:", audioFileUrl);
  } catch (error) {
    if (error.code === "storage/object-not-found") {
      console.log("File not found, skipping deletion:", audioFileUrl);
    } else {
      console.error("Error deleting file:", error);
      throw error; // Propagate other errors if needed
    }
  }
};
