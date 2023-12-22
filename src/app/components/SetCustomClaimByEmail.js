import React, { useState } from 'react';
import 'firebase/auth';
import { firebaseApp, auth } from '../../firebase/config';

const SetCustomClaimByEmail = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const setCustomClaim = async () => {
    try {
      // Fetch the currently logged-in user
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setStatus('No user logged in');
        return;
      }

      console.log(JSON.stringify({email}))
      // Check if the user is an admin (optional)
      // const idTokenResult = await currentUser.getIdTokenResult();
      // if (!idTokenResult.claims.admin) {
      //   setStatus('You must be an admin to perform this action');
      //   return;
      // }

      // Set custom claim by email
      const response = await fetch('/api/SetCustomClaimByEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('reeeeeeeeeeeeeeeeeeeeeeeeees',)

      const data = await response.json();
      
      setStatus(data.success ? 'Custom claim set successfully' : 'Failed to set custom claim');
    } catch (error) {
      setStatus('Error occurred');
      console.error('Error:', error);
    }

    



  };

  return (
    <div>
      <h2>Set Custom Claim by Email</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={setCustomClaim}>Set Custom Claim</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SetCustomClaimByEmail;
