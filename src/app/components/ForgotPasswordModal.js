import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ForgotPassword from "./ForgotPassword";
import classes from "./Library.module.css";

const ForgotPasswordModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="none" className={classes.register} onClick={handleShow}>
        Forgot Password?
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter your email and we will send a link to reset your password</p>
          <ForgotPassword />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForgotPasswordModal;
