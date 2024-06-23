"use client";

import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useDarkMode } from "@/context/DarkModeContext";
import Image from "next/legacy/image";
import Link from "next/link";

const Footer = () => {
  const { darkMode } = useDarkMode();

  return (
    <footer
      className="text-center py-3"
      style={{
        backgroundColor: darkMode ? "black" : "white",
        width: "100%",
      }}
    >
      <Container>
        <Row className="align-items-center justify-content-around">
          <Col xs={3} md={3} className="text-left">
            <Link href="Privacy">
              <Button
                variant={darkMode ? "outline-light" : "outline-dark"}
                className="me-3"
                style={{ fontSize: ".5rem" }}
              >
                Privacy and Data Policies
              </Button>
            </Link>
          </Col>
          <Col xs={3} md={6} className="text-center mb-3 mb-md-0">
            <a
              href="https://www.facebook.com/perceptiapress/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none ms-3"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                size="lg"
                color={darkMode ? "white" : "black"}
              />
            </a>
          </Col>
          <Col xs={3} md={3} className="text-right mb-3 mb-md-0">
            <Image
              src={
                darkMode
                  ? "/images/perceptia_logo_negative.jpg"
                  : "/images/perceptia_logo.jpg"
              }
              alt="Perceptia Press"
              className="img-fluid"
              width={30}
              height={40}
            />
            <p className="mb-0" style={{ fontSize: "0.5rem" }}>
              © {new Date().getFullYear()} Perceptia Press
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
