import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-5">
      <Container>
        <Row>
          <Col>
            <p>&copy; {new Date().getFullYear()} Patrimoine Économique. Tous droits réservés.</p>
            <p>
              <a href="https://example.com" className="text-white" target="_blank" rel="noopener noreferrer">
                Politique de confidentialité
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
