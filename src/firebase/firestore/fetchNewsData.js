import getAllDocs from "./getAllDocs";

const fetchNewsData = async () => {
  try {
    console.log("Fetching news data...");
    const { results, error } = await getAllDocs("news");
    if (!error) {
      localStorage.setItem("newsDataArray", JSON.stringify(results));
      localStorage.setItem("newsDataTimestamp", new Date().toISOString());
      return { results };
    } else {
      console.error("Error fetching news data:", error);
      return { error };
    }
  } catch (error) {
    console.error("Error fetching news data:", error);
    return { error };
  }
};

export default fetchNewsData;
