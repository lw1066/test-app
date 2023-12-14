import React from 'react';
import Modal from 'react-bootstrap/Modal';

const Success = ({ showSuccess, onHide }) => {

  return (
    <Modal
      size="sm"
      show={showSuccess}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          Small Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>...</Modal.Body>
    </Modal>
  );
};

export default Success;