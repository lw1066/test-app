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
  const [searchQuery, setSearchQuery] = useState("");
  const { darkMode } = useDarkMode();

  useEffect(() => {
    async function loadBooks() {
      const storedBookData = localStorage.getItem("bookArray");
      const storedTimestamp = localStorage.getItem("bookTimestamp");
      const isDataStale = checkIfDataIsStale(storedTimestamp);

      if (storedBookData && !isDataStale) {
        console.log("Using cached book data");
        const bookData = JSON.parse(storedBookData);
        setBooks(bookData);
      } else {
        console.log("Fetching book data...");
        const { results, error } = await fetchBooks();
        if (error) {
          setError(error);
        } else {
          setBooks(results);
        }
      }
      setIsLoading(false);
    }

    loadBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedGenre, searchQuery, books]);

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

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className={classes.genreContainer}>
        <div
          className={classes.headerContainer}
          style={{ backgroundColor: darkMode ? "black" : "gray" }}
        >
          <h2 className={classes.headerText}>The Catalogue</h2>
        </div>
        <GenreSelector onSelectGenre={handleGenreChange} />

        <input
          type="text"
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
