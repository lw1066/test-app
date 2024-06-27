import React, { useEffect, useState } from "react";
import classes from "@/app/components/Library.module.css";
import BookCard from "@/app/components/BookCard";
import GenreSelector from "@/app/components/GenreSelector";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import fetchBooks from "@/firebase/firestore/fetchBooks";
import { checkIfDataIsStale } from "@/firebase/firestore/checkIfDataIsStale";
import { useDarkMode } from "@/context/DarkModeContext";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { darkMode } = useDarkMode();

  useEffect(() => {
    async function loadBooks() {
      const storedBookData = localStorage.getItem("bookArray");
      const storedTimestamp = localStorage.getItem("bookTimestamp");
      const isDataStale = checkIfDataIsStale(storedTimestamp);

      if (storedBookData && !isDataStale) {
        console.log("Using cached book data");
        setBooks(JSON.parse(storedBookData));
        setFilteredBooks(JSON.parse(storedBookData));
      } else {
        console.log("Fetching book data...");
        const { results, error } = await fetchBooks();
        if (error) {
          setError(error);
        } else {
          setBooks(results);
          setFilteredBooks(results);
        }
      }
      setIsLoading(false);
    }

    loadBooks();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...books];

      if (selectedGenre !== "All") {
        filtered = filtered.filter(
          (book) => book.genres && book.genres.includes(selectedGenre)
        );
      }

      if (searchQuery !== "") {
        if (selectedGenre === "") {
          filtered = books.filter(
            (book) =>
              book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              book.author.toLowerCase().includes(searchQuery.toLowerCase())
          );
        } else {
          filtered = filtered.filter(
            (book) =>
              book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              book.author.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
      }

      setFilteredBooks(filtered);
    };
    applyFilters();
  }, [selectedGenre, searchQuery, books]);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div
        className={classes.headerContainer}
        style={{ backgroundColor: darkMode ? "black" : "#ededed" }}
      >
        <h2 className={classes.headerText}>Catalogue</h2>
      </div>

      <div className={classes.genreContainer}>
        <GenreSelector onSelectGenre={handleGenreChange} />
        <input
          type="text"
          id="search"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            width: "30%",
            minWidth: "150px",
            padding: "3px",
            margin: "20px 0",
            borderRadius: "4px",
            border: "1px solid black",
            borderColor: darkMode ? "white" : "black",
            backgroundColor: darkMode ? "black" : "white",
            fontSize: ".6rem",
            color: darkMode ? "white" : "black",
          }}
        />

        {isLoading ? (
          <div className="d-flex justify-content-center mt-5">
            <LoadingSpinner />
          </div>
        ) : filteredBooks.length === 0 ? (
          searchQuery === "" ? (
            <p className={classes.instructionText}>
              Choose a category or search by title or author, click on a cover
              for details and to access materials/audio
            </p>
          ) : (
            <p
              className={classes.instructionText}
              style={{
                color: darkMode ? "white" : "black",
              }}
            >
              Sorry, no books found. Try another search term.
            </p>
          )
        ) : (
          <div className={classes.bookgridcontainer}>
            <div className="row g-2">
              {error && <p>Error: {error.message}</p>}
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="col d-flex justify-content-center align-items-center"
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Library.displayName = "Library";

export default Library;
