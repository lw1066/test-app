"use client";

import React, { useEffect, useState, forwardRef } from "react";
import classes from "./Library.module.css";
import BookCard from "../components/BookCard";
import GenreSelector from "../components/GenreSelector";
import LoadingSpinner from "../components/LoadingSpinner";
import fetchBooks from "../../firebase/firestore/fetchBooks";
import { checkIfDataIsStale } from "../../firebase/firestore/checkIfDataIsStale";
import { useDarkMode } from "@/context/DarkModeContext";

const Library = forwardRef((props, ref) => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    if (selectedGenre !== "All") {
      const filtered = books.filter(
        (book) => book.genres && book.genres.includes(selectedGenre)
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [selectedGenre, books]);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <>
      <div className={classes.genreContainer}>
        <GenreSelector onSelectGenre={handleGenreChange} />
        <p style={{ fontSize: ".75rem", textAlign: "center" }}>
          Choose a category, click on a cover for details
        </p>

        {isLoading ? (
          <div className="d-flex justify-content-center mt-5">
            <LoadingSpinner />
          </div>
        ) : (
          <div className={`container ${classes.bookgridcontainer}`}>
            <div className="row g-4">
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
});

Library.displayName = "Library";

export default Library;
