// ContactForm.js

"use client";

import { useState, useEffect, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDarkMode } from "@/context/DarkModeContext";
import Image from "next/legacy/image";
import Success from "../components/Success";
import { useModal } from "@/context/ModalContext";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [bookSamples, setBookSamples] = useState(false);
  const [orderQuery, setOrderQuery] = useState(false);
  const [submission, setSubmission] = useState(false);
  const { darkMode } = useDarkMode();
  const { showModal } = useModal();

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setBookSamples(false);
    setOrderQuery(false);
    setSubmission(false);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      message,
      bookSamples,
      orderQuery,
      submission,
    };

    console.log(formData);

    try {
      const response = await fetch("/api/emailer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        resetForm();
        showModal(
          `Hi ${name}`,
          `Thanks for your email, we'll reply to ${email} as soon as possible.`
        );
      } else {
        const errorData = await response.json();
        showModal(
          "Sorry - something went wrong",
          `There was a problem with your submission: ${errorData}`
        );
      }
    } catch (error) {
      showModal(
        "Sorry - something went wong",
        `An unexpected error occurred: ${error.message}`
      );
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className="d-flex align-items-center justify-content-center mb-4 mt-5">
              <Image
                src={
                  darkMode
                    ? "/images/darkSmile.webp"
                    : "/images/thickSmile.webp"
                }
                alt="Smile animation"
                width={60} // Adjust the width as needed
                height={60} // Adjust the height as needed
              />
              <h2 className="mb-0 fs-5 mt-3 mb-3">
                Ask us a question or just say hello!
              </h2>
            </div>

            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

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

              <Form.Group controlId="formMessage" className="mt-3">
                <Form.Label>Please enter your message here</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCheckbox" className="mt-4">
                <fieldset required>
                  <p>Reasons for getting in contact</p>

                  <Form.Check
                    type="checkbox"
                    label="Sample copies of books"
                    checked={bookSamples}
                    onChange={(e) => setBookSamples(e.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Order query"
                    checked={orderQuery}
                    onChange={(e) => setOrderQuery(e.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Discuss a submission"
                    checked={submission}
                    onChange={(e) => setSubmission(e.target.checked)}
                  />
                </fieldset>
              </Form.Group>

              <Button variant="outline-success" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
