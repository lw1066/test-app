import getAllDocs from "./getAllDocs";

const isLocalStorageAvailable = () => {
  try {
    const testKey = "test";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

const fetchBooks = async () => {
  if (!isLocalStorageAvailable()) {
    console.error("Local storage is not available.");
    return { error: "Local storage is not available." };
  }

  try {
    const { results, error } = await getAllDocs("books");
    if (error) {
      console.error("Error fetching books from getAllDocs:", error);
      return { error };
    } else {
      // Update local storage with the fetched results
      localStorage.setItem("bookArray", JSON.stringify(results));
      localStorage.setItem("bookTimestamp", new Date().toISOString());
      console.log("local updated");
      return { results };
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    return { error };
  }
};

export default fetchBooks;
