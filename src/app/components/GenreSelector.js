import React, { useState } from "react";
import { Button } from "react-bootstrap";
import classes from "@/app/components/Library.module.css";
import { useDarkMode } from "@/context/DarkModeContext";

const GenreSelector = ({ onSelectGenre }) => {
  const genres = [
    "Reading",
    "Speaking",
    "Writing",
    "Listening",
    "Culture",
    "Medical",
    "All",
  ];
  const [selectedGenre, setSelectedGenre] = useState("");
  const { darkMode } = useDarkMode();

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    onSelectGenre(genre);
  };

  return (
    <div className={classes.buttonGroupContainer}>
      {genres.map((genre) => (
        <Button
          key={genre}
          variant={darkMode ? "outline-light" : "outline-secondary"}
          onClick={() => handleGenreClick(genre)}
          active={selectedGenre === genre}
          className={classes.button}
          style={{
            fontSize: "12px",
            padding: "5px 10px",
            margin: "3px",
            borderRadius: "4px",
          }}
        >
          {genre}
        </Button>
      ))}
    </div>
  );
};

export default GenreSelector;
