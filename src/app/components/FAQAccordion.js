"use client";

import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import classes from "@/app/components/Library.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDarkMode } from "@/context/DarkModeContext";

import { faqs } from "../../../public/faqsList";

function FAQAccordion() {
  const [activeKey, setActiveKey] = useState(null);
  const { darkMode } = useDarkMode();
  return (
    <>
      <div className={classes.accordion}>
        {faqs.map((faq, sectionIndex) => (
          <div key={sectionIndex} style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "1.25rem" }}>{faq.section}</h2>
            <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
              {faq.questions.map((item, questionIndex) => (
                <Accordion.Item
                  eventKey={`${sectionIndex}-${questionIndex}`}
                  key={questionIndex}
                >
                  <Accordion.Header>{item.question}</Accordion.Header>
                  <Accordion.Body
                    style={{
                      backgroundColor: darkMode ? "black" : "white",
                    }}
                  >
                    <p>{item.answer}</p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </>
  );
}

export default FAQAccordion;
