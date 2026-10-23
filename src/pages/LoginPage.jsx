import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useTituloPagina } from '../hooks/useTitulodePagina';
import LoginCard from '../components/organisms/LoginCard';
import '../Login.css';


export default function LoginPage() {
  useTituloPagina('Login');

  return (
    <Container
      fluid
      className="login-page d-flex align-items-center justify-content-center py-4"
  >

      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <LoginCard/>
        </Col>
      </Row>
    </Container>
  );
}
