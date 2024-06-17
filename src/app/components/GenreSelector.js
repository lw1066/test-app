import React, { useState } from "react";
import { Button } from "react-bootstrap";
import classes from "./Library.module.css";

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

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    onSelectGenre(genre);
  };

  return (
    <div className={classes.buttonGroupContainer}>
      {genres.map((genre) => (
        <Button
          key={genre}
          variant="outline-secondary"
          onClick={() => handleGenreClick(genre)}
          active={selectedGenre === genre}
          className={classes.button}
        >
          {genre}
        </Button>
      ))}
    </div>
  );
};

export default GenreSelector;
