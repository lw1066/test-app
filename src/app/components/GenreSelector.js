import React, { useState, useEffect } from "react";
import { ButtonGroup, Button } from "react-bootstrap";

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
  const [isVertical, setIsVertical] = useState(false);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    onSelectGenre(genre);
  };

  useEffect(() => {
    const handleResize = () => {
      // Check the window width and set isVertical based on the condition
      setIsVertical(window.innerWidth < 610);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        width: "70%",
        margin: "3rem auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ButtonGroup vertical={isVertical} aria-label="Genres">
        {genres.map((genre) => (
          <Button
            key={genre}
            variant="outline-secondary"
            onClick={() => handleGenreClick(genre)}
            active={selectedGenre === genre}
            style={{ margin: "0.1rem", minWidth: "10px" }}
          >
            {genre}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default GenreSelector;
