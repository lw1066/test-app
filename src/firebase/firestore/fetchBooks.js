import getAllDocs from "./getAllDocs";

const fetchBooks = async () => {
  try {
    const { results, error } = await getAllDocs("books");
    if (error) {
      return { error };
    } else {
      localStorage.setItem("bookArray", JSON.stringify(results));
      localStorage.setItem("bookTimestamp", new Date().toISOString());
      return { results };
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    return { error };
  }
};

export default fetchBooks;
