import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";

// Initialize Firebase storage
const storage = getStorage();

// Function to upload image to Firebase Storage
export const uploadImageToFirebase = async (imageFile) => {
  const storageRef = ref(storage, `images/${v4() + imageFile.name}`);

  // Define metadata with Cache-Control header
  const metadata = {
    contentType: imageFile.type,
    cacheControl: "public, max-age=86400", // Cache for 1 day
  };

  try {
    // Upload the image file with metadata
    const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);

    // Get the download URL after successful upload
    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Propagate the error if needed
  }
};
