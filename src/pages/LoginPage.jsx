import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useTituloPagina } from '../hooks/useTitulodePagina';
import LoginCard from '../components/organisms/LoginCard';

export default function LoginPage() {
  useTituloPagina('Login');

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={8} md={6} lg={4}>
          <LoginCard />
        </Col>
      </Row>
    </Container>
  );
}