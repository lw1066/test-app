import React, { useEffect, useState, useRef } from "react";
import classes from "@/app/components/Library.module.css";
import BookCard from "@/app/components/BookCard";
import GenreSelector from "@/app/components/GenreSelector";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import fetchBooks from "@/firebase/firestore/fetchBooks";
import { checkIfDataIsStale } from "@/firebase/firestore/checkIfDataIsStale";
import { useDarkMode } from "@/context/DarkModeContext";
import RecommendationsCarousel from "./RecommendationsCarousel";
import Link from "next/link";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const { darkMode } = useDarkMode();
  const catalogueRef = useRef(null);

  useEffect(() => {
    async function loadBooks() {
      const storedBookData = localStorage.getItem("bookArray");
      const storedTimestamp = localStorage.getItem("bookTimestamp");
      const isDataStale = checkIfDataIsStale(storedTimestamp);

      if (storedBookData && storedBookData !== "[]" && !isDataStale) {
        console.log("Using cached book data");
        const parsedData = JSON.parse(storedBookData);
        setBooks(parsedData);
        setFilteredBooks(parsedData);
      } else {
        console.log("Fetching book data...");
        let attempts = 0;
        let success = false;
        let results = [];
        let error = null;

        while (attempts < 3 && !success) {
          attempts++;
          try {
            const fetchResult = await fetchBooks();
            if (fetchResult.error) {
              error = fetchResult.error;
            } else {
              results = fetchResult.results;
              success = true;
            }
          } catch (err) {
            error = err;
            console.error(`Attempt ${attempts} failed:`, err);
          }
        }

        if (success) {
          setBooks(results);
          setFilteredBooks(results);
          localStorage.setItem("bookArray", JSON.stringify(results));
          localStorage.setItem("bookTimestamp", new Date().toISOString());
        } else {
          setError("Sorry cannot access the server - try again later");
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

  const scrollToCatalogue = () => {
    if (catalogueRef.current) {
      const element = catalogueRef.current;
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      const offset = -160;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY + offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className={classes.welcomeText}>
        <p style={{ width: "70%", margin: "3% auto" }}>
          Since 2004, Perceptia Press has been publishing innovative and
          award-winning materials, written by teachers, that aim to inspire
          learners. Check our{" "}
          <span
            className={classes.register}
            onClick={scrollToCatalogue}
            style={{ cursor: "pointer" }}
          >
            catalogue
          </span>{" "}
          below for full details and information about ordering. Teachers can
          access extra resources by{" "}
          <Link className={classes.linkStyle} href={"/Signin"}>
            registering
          </Link>{" "}
          for a free account.
        </p>
      </div>
      {!isLoading && <RecommendationsCarousel books={books} />}

      <div
        ref={catalogueRef}
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
            width: "40%",
            minWidth: "150px",
            padding: "3px",
            margin: "20px 0",
            borderRadius: "4px",
            border: "1px solid black",
            borderColor: darkMode ? "white" : "black",
            backgroundColor: darkMode ? "black" : "white",
            color: darkMode ? "white" : "black",
            fontSize: ".75rem",
          }}
        />

        {isLoading ? (
          <div className="d-flex justify-content-center mt-5">
            <LoadingSpinner />
          </div>
        ) : filteredBooks.length === 0 ? (
          searchQuery === "" ? (
            <p className={classes.instructionText}>
              Choose a category or search for an author / title
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

export default Library;
