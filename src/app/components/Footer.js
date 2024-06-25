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
            <div className="d-flex flex-column">
              <Link href="Submissions">
                <Button
                  variant={darkMode ? "outline-light" : "outline-dark"}
                  className="mb-1"
                  style={{
                    fontSize: ".5rem",
                    padding: "2px 3px",
                    borderRadius: "4px",
                  }}
                >
                  Submissions
                </Button>
              </Link>
              <Link href="Privacy">
                <Button
                  variant={darkMode ? "outline-light" : "outline-dark"}
                  style={{
                    fontSize: ".45rem",
                    padding: "2px 3px",
                    borderRadius: "4px",
                    minWidth: "65px",
                  }}
                >
                  Privacy & Data Policies
                </Button>
              </Link>
            </div>
          </Col>

          <Col xs={3} md={6} className="text-center mb-3">
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
          <Col xs={3} md={3} className="text-center mb-0">
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
            <p
              className="mb-0 text-center"
              style={{ fontSize: "0.5rem", minWidth: "50px" }}
            >
              © {new Date().getFullYear()} Perceptia Press
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
