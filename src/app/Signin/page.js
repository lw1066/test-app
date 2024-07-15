"use client";
import React, { useState } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import classes from "../components/Library.module.css";
import Link from "next/link";

import ForgotPasswordModal from "../components/ForgotPasswordModal";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RegistrationForm from "../components/RegistrationForm";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const router = useRouter();
  const { showModal } = useModal();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      showModal(
        "Sorry something isn't right",
        "Please check your details and try again."
      );
      return console.log(error);
    }

    return router.push("/");
  };

  const handleShowRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleRegistrationSubmit = (formData) => {
    // Implement your registration logic here
    console.log(formData);
    setShowRegisterModal(false); // Close modal after submission (you may modify this behavior)
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="d-flex flex-column align-items-center justify-content-center mb-2 mt-5 fs-6">
            <h1>Teacher sign-in</h1>
            <p style={{ fontSize: "1.25rem" }}>
              Sign in to access teaching materials or
              <span
                onClick={handleShowRegisterModal}
                className={classes.register}
              >
                {" "}
                register{" "}
              </span>{" "}
              for an account.
            </p>
          </div>

          <Form onSubmit={handleForm}>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="my-4">
              <Button variant="outline-success" type="submit">
                Sign in
              </Button>
              <ForgotPasswordModal />
            </div>
          </Form>
          <RegistrationForm
            show={showRegisterModal}
            onHide={handleCloseRegisterModal}
            onSubmit={handleRegistrationSubmit}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Page;
