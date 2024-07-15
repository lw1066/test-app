"use client";

import { Container, Row, Col } from "react-bootstrap";
import { useDarkMode } from "@/context/DarkModeContext";
import Image from "next/legacy/image";
import Link from "next/link";
import classes from "./Library.module.css";
import { SocialLinks } from "./SocialLinks";
const Footer = () => {
  const { darkMode } = useDarkMode();

  return (
    <footer
      className="text-center py-3"
      style={{
        backgroundColor: darkMode ? "black" : "#ededed",
        width: "100%",
      }}
    >
      <Container>
        <Row className="align-items-center justify-content-around">
          <Col xs={3} md={3} className="text-left">
            <div className="d-flex flex-column ">
              <Link href="Submissions" className={classes.linkStyle}>
                <p
                  style={{
                    margin: "0",
                  }}
                >
                  Submissions
                </p>
              </Link>
              <Link href="Privacy" className={classes.linkStyle}>
                <p>Privacy & Data policy</p>
              </Link>
            </div>
          </Col>

          <Col xs={4} md={6} className="mb-3 ">
            <SocialLinks />
          </Col>
          <Col xs={3} md={3} className="text-center mb-0">
            <Image
              src={
                darkMode
                  ? "/images/perceptia_logo_negative.jpg"
                  : "/images/perceptia_logo-gray.jpg"
              }
              alt="Perceptia Press"
              className="img-fluid"
              width={30}
              height={40}
            />
            <p
              className="mb-0 text-center"
              style={{ fontSize: "0.5rem", minWidth: "50px" }}
            >
              © {new Date().getFullYear()} Perceptia Press LLC
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
