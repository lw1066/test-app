"use client";

import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import classes from "@/app/components/Library.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDarkMode } from "@/context/DarkModeContext";

function FAQAccordion() {
  const [activeKey, setActiveKey] = useState(null);
  const { darkMode } = useDarkMode();
  return (
    <>
      <div className={classes.accordion}>
        <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <p style={{ fontSize: "1rem", padding: 0, margin: 0 }}>
                How do I browse titles?
              </p>
            </Accordion.Header>
            <Accordion.Body
              style={{
                backgroundColor: darkMode ? "black" : "white",
                fontSize: ".75rem",
              }}
            >
              <p>
                Thank you for your interest in submitting to Perceptia Press. We
                are always interested in looking at new manuscripts. Please
                fills out the proposal form carefully and in as much detail as
                possible. This is a Microsoft Word document that you can fill in
                with the requested information.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <p style={{ fontSize: "1rem", padding: 0, margin: 0 }}>
                How do I browse titles?
              </p>
            </Accordion.Header>
            <Accordion.Body
              style={{
                backgroundColor: darkMode ? "black" : "white",
                fontSize: ".75rem",
              }}
            >
              <p>
                The library is organized into categories. Click on a category to
                see the books available. Click on the book to see details and
                options to buy.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <p style={{ fontSize: "1rem", padding: 0, margin: 0 }}>
                Where can I buy your books?
              </p>
            </Accordion.Header>
            <Accordion.Body
              style={{
                backgroundColor: darkMode ? "black" : "white",
                fontSize: ".75rem",
              }}
            >
              <p>Information on buying books online etc...</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <p style={{ fontSize: "1rem", padding: 0, margin: 0 }}>
                I am a teacher can I access teacher materials?
              </p>
            </Accordion.Header>
            <Accordion.Body
              style={{
                backgroundColor: darkMode ? "black" : "white",
                fontSize: ".75rem",
              }}
            >
              <p>Information on signing up to get teacher access?</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}

export default FAQAccordion;
