import React, { useState } from "react";
import { auth } from "../../firebase/config";

const SetCustomClaimByEmail = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const setCustomClaim = async (email) => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setStatus("No user logged in");
        return;
      }

      const response = await fetch("/api/SetCustomClaimByEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      setStatus(
        data.success
          ? "Custom claim set successfully"
          : `Failed to set custom claim: ${data.message || "Unknown error"}`
      );
    } catch (error) {
      setStatus("Error occurred while setting custom claim");
      console.error("Error:", error);
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
      <button
        onClick={() => {
          setCustomClaim(email);
        }}
      >
        Set Custom Claim
      </button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SetCustomClaimByEmail;
