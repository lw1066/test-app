"use client";
import React, { useState } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import classes from "../components/Library.module.css";
import Link from "next/link";

import ForgotPasswordModal from "../components/ForgotPasswordModal";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="d-flex flex-column align-items-center justify-content-center mb-2 mt-5">
            <h1 className="fs-5">Teacher sign-in</h1>
            <p>Please sign in to access teaching materials</p>
            <p>
              <Link className={classes.linkstyle} href="Contact">
                Contact us
              </Link>{" "}
              to register for an account
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
            <p id="emailHelp" className={classes.emailText}>
              We&apos;ll <strong>never</strong> share your email with anyone.
            </p>
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

            <div className="mt-3">
              <Button variant="outline-success" type="submit">
                Sign in
              </Button>
              <ForgotPasswordModal />
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Page;
