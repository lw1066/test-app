import React from "react";
import { Modal } from "react-bootstrap";

const CustomModal = ({ show, onHide, title, children }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static" // Prevents closing the modal by clicking outside
      keyboard={false} // Disables closing the modal with the ESC key
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
