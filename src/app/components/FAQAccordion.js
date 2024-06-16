"use client";

import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import classes from "./Library.module.css";

function FAQAccordion() {
  const [activeKey, setActiveKey] = useState(null);

  return (
    <>
      <div className={classes.accordion}>
        <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Do you accept submissions or book ideas?
            </Accordion.Header>
            <Accordion.Body>
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
            <Accordion.Header>How do I browse titles?</Accordion.Header>
            <Accordion.Body>
              <p>
                The library is organized into categories. Click on a category to
                see the books available. Click on the book to see details and
                options to buy.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Where can I buy your books?</Accordion.Header>
            <Accordion.Body>
              <p>Information on buying books online etc...</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              I am a teacher can I access teacher materials?
            </Accordion.Header>
            <Accordion.Body>
              <p>Information on signing up to get teacher access?</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}

export default FAQAccordion;
