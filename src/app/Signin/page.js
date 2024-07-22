"use client";
import React, { useEffect, useState } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import classes from "../components/Library.module.css";

import ForgotPasswordModal from "../components/ForgotPasswordModal";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RegistrationForm from "../components/RegistrationForm";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const router = useRouter();
  const { showModal } = useModal();

  useEffect(() => {
    if (router.isReady && router.query.fromLink) {
      setIsModalOpen(true);
    }
  }, [router.isReady, router.query]);

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      showModal(
        "Sorry something isn't right",
        "Please check your details and try again."
      );
      return;
    }

    return router.push("/");
  };

  const handleShowRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleRegistrationSubmit = async (formData) => {
    console.log(formData);
    setShowRegisterModal(false);
    const registrationData = { ...formData, registration: true };
    try {
      const response = await fetch("/api/emailer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        showModal(
          `Hi ${formData.firstName}`,
          `Thanks for registering. We'll send your log-in details to ${formData.email} as soon as possible.`
        );
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        showModal(
          "Sorry - something went wrong",
          `There was a problem with your submission. Status: ${
            response.status
          }. Error: ${JSON.stringify(errorData)}`
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
      showModal(
        "Sorry - something went wrong",
        `An unexpected error occurred: ${error.message}`
      );
    }
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
                autoComplete="email"
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
                autoComplete="current-password"
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
