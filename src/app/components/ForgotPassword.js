import React, { useState, useEffect } from "react";
import { forgotPassword } from "@/firebase/auth/forgotPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const lastReset = localStorage.getItem("lastPasswordReset");
    if (lastReset) {
      const timeElapsed = Date.now() - parseInt(lastReset, 10);
      if (timeElapsed < 5 * 60 * 1000) {
        setIsDisabled(true);
        const remainingTime = 5 * 60 * 1000 - timeElapsed;
        setTimeout(() => {
          setIsDisabled(false);
          localStorage.removeItem("lastPasswordReset");
        }, remainingTime);
      }
    }
  }, []);

  const handleForgotPassword = async () => {
    const { result, error } = await forgotPassword(email);
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage(result);
      localStorage.setItem("lastPasswordReset", Date.now().toString());
      setIsDisabled(true);
      setTimeout(() => {
        setIsDisabled(false);
        localStorage.removeItem("lastPasswordReset");
      }, 1 * 60 * 1000);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control mb-3"
      />
      <button
        onClick={handleForgotPassword}
        className="btn btn-primary mb-3"
        disabled={isDisabled}
      >
        Reset Password
      </button>
      {message && <p>{message}</p>}
      {isDisabled && <p>Please wait a minute to resend the email.</p>}
    </div>
  );
};

export default ForgotPassword;
