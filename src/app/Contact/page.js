// ContactForm.js

'use client'

import { useState, useEffect, useRef  } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDarkMode } from '@/context/DarkModeContext';
import Image from 'next/image';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [bookSamples, setBookSamples] = useState(false);
  const [orderQuery, setOrderQuery] = useState(false);
  const [submission, setSubmission] = useState(false);
  const { darkMode } = useDarkMode();
  
  
  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
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

    console.log(formData)

    const response = await fetch('/api/emailer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        resetForm();
      } 
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          
          <h2 className="mb-4 fs-5 mt-3">
          <div className="d-flex align-items-center justify-content-center mb-4">
            <Image src={darkMode ? '/images/darkSmile.webp' : '/images/thickSmile.webp'}
              alt="Smile animation"
              width={60} // Adjust the width as needed
              height={60} // Adjust the height as needed
            />
            <h2 className="mb-0 fs-5 mt-3 mb-3">Hello!</h2>
          </div>
                
          
          Want to ask a question or just say hello? Please fill in the form below and we&apos;ll get back to you as soon as possible...</h2>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </Form.Group>

            <Form.Group controlId="formCheckbox" className="mt-4">
              <fieldset required>
                <p>Please choose your reasons for getting in contact (You can choose as many as you&apos;d like)...</p>
               
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
  );
};

export default Contact;
