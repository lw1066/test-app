// components/AudioModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import AudioPlayer from "./AudioPlayer";
import Image from "next/image";
import { useDarkMode } from "@/context/DarkModeContext";

const AudioModal = ({ show, handleClose, audio, bookTitle, bookImage }) => {
  const { darkMode } = useDarkMode();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{bookTitle} Audio</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: darkMode ? "black" : "white",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={bookImage}
            alt={bookTitle}
            width={100}
            height={125}
            object-fit="contain"
            className="img-fluid"
            unoptimized
          />
          <p style={{ textAlign: "center", marginTop: 40 }}>
            Now playing <b>{audio.name}</b>
          </p>
        </div>
        <AudioPlayer url={audio.downloadURL} />
      </Modal.Body>
    </Modal>
  );
};

export default AudioModal;
