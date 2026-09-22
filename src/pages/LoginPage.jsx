import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoginCard from '../components/organisms/LoginCard';

function LoginPage() {
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

export default LoginPage;
