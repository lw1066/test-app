import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

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
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      console.log("User authenticated:", user.uid);
      await user.getIdToken(true); // Force refresh the token to include the latest claims
      const idTokenResult = await user.getIdTokenResult();
      console.log("User claims:", idTokenResult.claims);

      // Verify if user has the required custom claims
      if (!idTokenResult.claims.admin) {
        throw new Error("User does not have admin privileges");
      }
    } else {
      throw new Error("User is not authenticated");
    }

    // Upload the image file with metadata
    const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);

    // Return a promise that resolves when the upload completes
    const snapshot = await new Promise((resolve, reject) => {
      console.log("Starting upload...");
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Error during upload:", error);
          reject(error);
        },
        () => {
          console.log("Upload completed");
          resolve(uploadTask.snapshot);
        }
      );
    });
    console.log("Upload successful, getting download URL...");

    // Get the download URL after successful upload
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("Download URL obtained:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Propagate the error if needed
  }
};
