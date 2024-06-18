// components/AudioModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import AudioPlayer from "./AudioPlayer";

const AudioModal = ({ show, handleClose, audio }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Audio Player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ textAlign: "center", marginTop: 40 }}>
          Now playing {audio.name}
        </p>
        <AudioPlayer url={audio.downloadURL} />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default AudioModal;
