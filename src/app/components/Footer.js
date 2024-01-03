'use client'

import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useDarkMode } from '@/context/DarkModeContext';
import Link from 'next/link';

const Footer = () => {
  const { darkMode } = useDarkMode();

  return (
    <footer className="text-center py-4 mt-5 pt-5" >
      <Container>
        <Row className="align-items-center">
          <Col xs={6} md={3} className="text-left mb-3 mb-md-0">
            {/* Privacy and Data Policies Button */}
            <Link href="/privacy" passHref>
              <Button variant={darkMode ? "outline-light" : "outline-dark"} className="me-3" style={{fontSize:'.5rem'}}>Privacy and Data Policies</Button>
            </Link>
            
          </Col>
          <Col xs={12} md={6} className="text-center mb-3 mb-md-0">
            {/* Instagram */}
            <a href="https://www.instagram.com/your_instagram" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
              <FontAwesomeIcon icon={faInstagram} size="lg" color= {darkMode ? "white" : "black"} />
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/your_facebook" target="_blank" rel="noopener noreferrer" className="text-decoration-none ms-3">
              <FontAwesomeIcon icon={faFacebook} size="lg" color= {darkMode ? "white" : "black"} />
            </a>
          </Col>
          <Col xs={6} md={3} className="text-right mb-3 mb-md-0">
          <img src={ darkMode ? "/images/perceptia_logo_negative.jpg" : "/images/perceptia_logo.jpg"} alt="Perceptia Press" className="img-fluid" style={{height: '3rem' }} />
            {/* Copyright */}
            <p className="mb-0">© {new Date().getFullYear()} Perceptia Press</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
