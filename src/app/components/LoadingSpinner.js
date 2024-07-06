import React from "react";
import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner = () => {
  return (
    <Spinner animation="border" role="status" style={{ marginBottom: "50px" }}>
      <span className="visually-hidden">Opening the door...</span>
    </Spinner>
  );
};

export default LoadingSpinner;
