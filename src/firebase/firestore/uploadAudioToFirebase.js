import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";

const storage = getStorage();

export const uploadAudioToFirebase = async (audioFile) => {
  const storageRef = ref(storage, `audio/${audioFile.name + v4()}`);

  const metadata = {
    contentType: audioFile.type,
    cacheControl: "public, max-age=604800",
  };

  try {
    const uploadTask = uploadBytesResumable(storageRef, audioFile, metadata);

    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading audio file:", error);
    throw error;
  }
};
