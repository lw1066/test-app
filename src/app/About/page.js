'use client'

import { useDarkMode } from '@/context/DarkModeContext';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

const Page = () => {

 const{ darkMode } = useDarkMode();

 console.log(darkMode)
 return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          
          
          <div className="d-flex align-items-center justify-content-center mb-4 mt-5">
            <Image src={darkMode ? '/images/darkAbout.webp' : '/images/lightAbout.webp'}
              alt="Smile animation"
              width={60} // Adjust the width as needed
              height={60} // Adjust the height as needed
            />
            <h2 className="mb-0 fs-5 mt-3 mb-3">Let&apos;s talk...</h2>
          </div>
                
          
          <h2 className="fs-4">We need to talk - let&apos;s get to know each other...</h2>
        
        </Col>
      </Row>
    </Container>
  );
}

export default Page;