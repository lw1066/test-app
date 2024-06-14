"use client";

import React, { useEffect, useState, forwardRef } from "react";
import getAllDocs from "../../firebase/firestore/getAllDocs";
import classes from "./Library.module.css";
import BookCard from "../components/BookCard";
import GenreSelector from "../components/GenreSelector";
import LoadingSpinner from "../components/LoadingSpinner"; // Import your LoadingSpinner component
import { library } from "@fortawesome/fontawesome-svg-core";

const Library = forwardRef((props, ref) => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const { results, error } = await getAllDocs("books");
        if (error) {
          setError(error);
        } else {
          setBooks(results);
          setFilteredBooks(results);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, []);

  useEffect(() => {
    if (selectedGenre !== "All") {
      const filtered = books.filter(
        (book) => book.genres && book.genres.includes(selectedGenre)
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
      console.log(filteredBooks);
    }
  }, [selectedGenre, books]);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", fontSize: 32 }} ref={ref}>
        Our Catalogue
      </h2>
      <p style={{ textAlign: "center", paddingInline: 10 }}>
        Choose a category to explore our current titles
      </p>
      <GenreSelector onSelectGenre={handleGenreChange} />
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
  );
});

Library.displayName = "Library";

export default Library;
