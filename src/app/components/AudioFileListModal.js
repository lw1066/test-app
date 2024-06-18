"use client";

import React, { useEffect, useState } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import AudioModal from "../components/AudioModal";

const Home = (audioFileUrls) => {
  const [showModal, setShowModal] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState("");
  const [audioFileUrls, setAudioFileUrls] = useState([]);

  const handleShowModal = (url) => {
    setCurrentAudioUrl(url);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentAudioUrl("");
  };

  return (
    <Container>
      <h1 style={{ textAlign: "center", margin: "1rem" }}>Audio Files</h1>
      <ListGroup>
        {audioFileUrls.map((audio, index) => (
          <ListGroupItem
            key={index}
            action
            onClick={() => handleShowModal(audio.downloadURL)}
          >
            {audio.name}
          </ListGroupItem>
        ))}
      </ListGroup>
      <AudioModal
        show={showModal}
        handleClose={handleCloseModal}
        audioUrl={currentAudioUrl}
      />
    </Container>
  );
};

export default Home;
