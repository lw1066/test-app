// ContactForm.js

'use client'

import { useState, useEffect, useRef  } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Player } from '@lordicon/react';

const smile = require('/public/images/smile.json');

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [bookSamples, setBookSamples] = useState(false);
  const [orderQuery, setOrderQuery] = useState(false);
  const [submission, setSubmission] = useState(false);
  
  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setBookSamples(false);
    setOrderQuery(false);
    setSubmission(false);
  };

  const playerRef = useRef(null);
  
  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

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
            <Player
              ref={playerRef}
              size={120}
              icon={smile}
              onComplete={() => {
                setTimeout(() => {
                  playerRef.current?.playFromBeginning();
                }, 4000);
              }}
              styles={{
                flex: 1,
                gap: 20,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            />
            <h2 className="mb-0 fs-5 mt-3">Hello!</h2>
          </div>
                
          
          Want to ask a question or just say hello? Please fill in the form below, taking care to choose the reason you are contacting us. We'll get back to you as soon as possible...</h2>
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
                <p>Please choose your reasons for getting in contact (You can choose as many as you'd like)...</p>
               
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
