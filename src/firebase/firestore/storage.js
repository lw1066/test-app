import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

// Initialize Firebase storage
const storage = getStorage();

// Function to upload image to Firebase Storage
export const uploadImageToFirebase = async (imageFile) => {
  const storageRef = ref(storage, `images/${imageFile.name + v4()}`);

  try {
    // Upload the image file
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    // Get the download URL after successful upload
    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Propagate the error if needed
  }
};
