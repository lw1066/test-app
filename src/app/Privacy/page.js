import React from "react";
import { privacyPolicy } from "../../../public/privacyPolicy";

function Page() {
  // Style for maintaining spacing and formatting
  const style = {
    whiteSpace: "pre-wrap", // Preserve formatting including new lines

    fontSize: "1rem",
    lineHeight: "1.6",
    padding: "0 5%",
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Privacy & Data Policy</h1>
      <div style={style}>
        <p>{privacyPolicy}</p>
      </div>
    </div>
  );
}

export default Page;
