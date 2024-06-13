"use client";
import React, { use } from "react";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../../context/ModalContext";

const Success = () => {
  const { showSuccess, hideModal, modalContent } = useModal();
  const { title, message } = modalContent;

  return (
    <Modal
      size="sm"
      show={showSuccess}
      onHide={hideModal}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
    </Modal>
  );
};

export default Success;
