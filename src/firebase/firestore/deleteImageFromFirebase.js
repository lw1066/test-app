import { getStorage, ref, deleteObject } from "firebase/storage";

export const deleteImageFromFirebase = async (imageUrl) => {
  const storage = getStorage();

  const storageRef = ref(storage, imageUrl);

  try {
    await deleteObject(storageRef);
    console.log("Image deleted successfully");
  } catch (error) {
    if (error.code === "storage/object-not-found") {
      console.log("No image found at the provided URL, nothing to delete");
      return;
    } else {
      console.error("Error deleting image:", error);
      throw error;
    }
  }
};
