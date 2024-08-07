import React, { useEffect, useState } from "react";
import classes from "@/app/components/Library.module.css";

import { useDarkMode } from "@/context/DarkModeContext";
import BookCard from "./BookCard";

function RecommendationsBoxes({ books }) {
  const { darkMode } = useDarkMode();
  const [currentIndices, setCurrentIndices] = useState([0, 1, 2]);
  const [itemsToShow, setItemsToShow] = useState(3); // Default to 3 items
  const [fadeStates, setFadeStates] = useState([
    "fade-in",
    "fade-in",
    "fade-in",
  ]);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 468) {
        setItemsToShow(1);
        setCurrentIndices([0]);
        setFadeStates(["fade-in"]);
      } else {
        setItemsToShow(3);
        setCurrentIndices([0, 1, 2]);
        setFadeStates(["fade-in", "fade-in", "fade-in"]);
      }
    };

    handleResize(); // Call initially
    window.addEventListener("resize", handleResize); // Add event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  useEffect(() => {
    // Shuffle the books array when it changes
    const shuffledBooks = shuffleArray(books);

    // Initialize the current indices based on items to show
    setCurrentIndices((prevIndices) => {
      return prevIndices.map((_, index) =>
        index < itemsToShow ? index : prevIndices[index]
      );
    });

    // Set the fade states initially to fade-in for the visible books
    setFadeStates((prev) => {
      return prev.map((state, index) =>
        index < itemsToShow ? "fade-in" : state
      );
    });

    // Reset hovered and modal open states on books change
    setIsHovered(false);
    setIsModalOpen(false);
  }, [books, itemsToShow]);

  useEffect(() => {
    const changeBook = (index) => {
      setFadeStates((prev) => {
        const newFadeStates = [...prev];
        newFadeStates[index] = "fade-out";
        return newFadeStates;
      });

      setTimeout(() => {
        setCurrentIndices((prevIndices) => {
          const newIndices = [...prevIndices];
          newIndices[index] = (prevIndices[index] + itemsToShow) % books.length;
          return newIndices;
        });

        setFadeStates((prev) => {
          const newFadeStates = [...prev];
          newFadeStates[index] = "fade-in";
          return newFadeStates;
        });
      }, 3000); // 2 seconds for fade-out
    };

    let bookIndex = 0;
    const staggeredInterval = setInterval(() => {
      if (!isHovered && !isModalOpen) {
        changeBook(bookIndex);
        bookIndex = (bookIndex + 1) % currentIndices.length;
      }
    }, 8000); // Change one book every 5 seconds

    return () => clearInterval(staggeredInterval);
  }, [books.length, itemsToShow, isHovered, isModalOpen]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={classes.recommendationsHeaderContainer}>
        <div
          className={classes.headerContainer}
          style={{ backgroundColor: darkMode ? "black" : "#ededed" }}
        >
          <h2 className={classes.headerText}>Suggested titles </h2>
        </div>
        {/* <h2 className={classes.recommendationsHeaderText}></h2> */}
      </div>

      <div className={classes.recommendationsBooksContainer}>
        {currentIndices.map((currentIndex, index) => (
          <div
            key={index}
            className={`${classes.bookBox} ${classes[fadeStates[index]]}`}
          >
            <span
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <BookCard
                book={books[currentIndex]}
                onModalOpen={handleModalOpen}
                onModalClose={handleModalClose}
                onMouseLeave={handleMouseLeave}
              />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default RecommendationsBoxes;
