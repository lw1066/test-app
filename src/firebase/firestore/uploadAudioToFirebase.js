import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // Renamed to avoid conflict with other potential v4 imports

// Function to initialize Firebase storage
const initializeStorage = () => {
  const storage = getStorage();
  return storage;
};

// Function to upload audio to Firebase Storage
export const uploadAudioToFirebase = async (audioFile) => {
  const storage = initializeStorage(); // Ensure storage is initialized
  const storageRef = ref(storage, `audio/${audioFile.name + uuidv4()}`);

  // Define metadata with Cache-Control header
  const metadata = {
    contentType: audioFile.type,
    cacheControl: "public, max-age=604800", // Cache for 1 week
  };

  try {
    // Upload the audio file with metadata
    const uploadTask = uploadBytesResumable(storageRef, audioFile, metadata);

    // Return a promise that resolves when the upload completes
    const snapshot = await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        () => resolve(uploadTask.snapshot)
      );
    });

    // Get the download URL after successful upload
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading audio file:", error);
    throw error; // Propagate the error if needed
  }
};
