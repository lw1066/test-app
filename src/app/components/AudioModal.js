// components/AudioModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import AudioPlayer from "./AudioPlayer";

const AudioModal = ({ show, handleClose, audio, bookTitle, bookImage }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{bookTitle} Audio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={bookImage}
            alt={bookTitle}
            style={{
              width: 75,
              height: "auto",
              objectFit: "cover",
            }}
          />
          <p style={{ textAlign: "center", marginTop: 40 }}>
            Now playing {audio.name}
          </p>
        </div>
        <AudioPlayer url={audio.downloadURL} />
      </Modal.Body>
    </Modal>
  );
};

export default AudioModal;
