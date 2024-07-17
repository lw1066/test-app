// context/BookContext.js
import { createContext, useState, useContext } from "react";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [bookUpdateInfo, setBookUpdateInfo] = useState("");
  const [newsUpdateInfo, setNewsUpdateInfo] = useState("");

  return (
    <BookContext.Provider
      value={{
        bookUpdateInfo,
        setBookUpdateInfo,
        newsUpdateInfo,
        setNewsUpdateInfo,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => useContext(BookContext);
