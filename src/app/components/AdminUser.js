'use server'

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import firebaseAdmin from 'firebase-admin'; // Import Firebase Admin SDK instance

const CustomClaimForm = () => {
  const [email, setEmail] = useState('');
  const [userUid, setUserUid] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleIsAdminChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const handleRecoverUid = async () => {
    try {
      const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
      setUserUid(userRecord.uid);
      setError(null);
    } catch (error) {
      setError('User with this email not found.');
      setUserUid('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userUid) {
        // If UID not retrieved yet, attempt to get it
        await handleRecoverUid();
        if (!userUid) return; // Exit if UID still not available
      }

      // Set the custom claim for the user
      await firebaseAdmin.auth().setCustomUserClaims(userUid, { isAdmin });
      console.log(`Custom claim 'isAdmin' set for user: ${userUid}`);
      // Additional logic after setting the claim
    } catch (error) {
      console.error('Error setting custom claim:', error);
      // Handle errors
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
        </Form.Group>
        <Button variant="primary" onClick={handleRecoverUid}>
          Get UID by Email
        </Button>
        <Form.Group controlId="isAdmin">
          <Form.Check type="checkbox" label="isAdmin" checked={isAdmin} onChange={handleIsAdminChange} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!userUid}>
          Set Custom Claim
        </Button>
      </Form>
      {userUid && <p>Retrieved UID: {userUid}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CustomClaimForm;
