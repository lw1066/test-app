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

// Function to upload image to Firebase Storage
export const uploadImageToFirebase = async (imageFile) => {
  const storage = initializeStorage(); // Ensure storage is initialized
  const storageRef = ref(storage, `images/${imageFile.name + uuidv4()}`);

  // Define metadata with Cache-Control header
  const metadata = {
    contentType: imageFile.type,
    cacheControl: "public, max-age=86400", // Cache for 1 day
  };

  try {
    // Upload the image file with metadata
    const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);

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
    console.error("Error uploading image:", error);
    throw error; // Propagate the error if needed
  }
};
