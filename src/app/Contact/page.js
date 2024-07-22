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
  const [technicalHelp, setTechnicalHelp] = useState(false);
  const [other, setOther] = useState(false);
  const { showModal } = useModal();

  const emailLink =
    "mailto:info@perceptiapress.com?subject=Information request";

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setBookSamples(false);
    setOrderQuery(false);
    setSubmission(false);
    setTechnicalHelp(false);
    setOther(false);
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
      technicalHelp,
      other,
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
          `Thanks for getting in touch. We'll reply to ${email} as soon as possible.`
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
          src="/images/contact.webp"
          alt="student asking a question"
          className={classes.bannerImage}
        />
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center mt-5">
        <p className={classes.pageDescription}>Contact form</p>

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

          <Form.Group controlId="formCheckbox" className="mt-4">
            <fieldset required>
              <p>Reasons for getting in contact</p>

              <Form.Check
                type="checkbox"
                label="Inspection copies of books"
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
              <Form.Check
                type="checkbox"
                label="Technical Help (OLS)"
                checked={technicalHelp}
                onChange={(e) => setTechnicalHelp(e.target.checked)}
              />
              <Form.Check
                type="checkbox"
                label="Other"
                checked={other}
                onChange={(e) => setOther(e.target.checked)}
              />
            </fieldset>
          </Form.Group>

          <Form.Group controlId="formMessage" className="mt-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="outline-success" type="submit" className="mt-3">
            Send
          </Button>
        </Form>
        <p style={{ margin: "20px 0 50px 0", padding: 0 }}>
          Alternatively, email us at{" "}
          <a className={classes.linkStyle} href={emailLink}>
            info@perceptiapress.com
          </a>
        </p>
      </div>
    </>
  );
};

export default Contact;
