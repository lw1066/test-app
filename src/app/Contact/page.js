"use client";

import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useModal } from "@/context/ModalContext";
import classes from "../components/Library.module.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [bookSamples, setBookSamples] = useState(false);
  const [orderQuery, setOrderQuery] = useState(false);
  const [submission, setSubmission] = useState(false);
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
    <>
      <div className={classes.bannerImage}>
        <img
          src="/images/contact_image.jpg"
          alt="student asking a question"
          className={classes.bannerImage}
        />
        <h1 className={classes.pageImageText}>Contact Us</h1>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center mt-2">
        <p className={classes.pageDescription}>
          Give us some feedback, ask a question or just say hi!
        </p>

        <Form onSubmit={handleFormSubmit} className={classes.contactForm}>
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
      </div>
    </>
  );
};

export default Contact;
