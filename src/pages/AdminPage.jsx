import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Sidebar from "../components/organisms/SideBar.jsx";
import DashboardStats from "../components/organisms/DashBoardStats.jsx";

import '../admin.css';

function AdminPage() {
  return (
    <Container fluid className='admin-page'>
      <Row>

        <Col md={3}>
          <Sidebar />
        </Col>

        <Col md={9} className="admin-content">

          <h1 className="mb-4">
            Panel de Administración
          </h1>

          <DashboardStats />

        </Col>

      </Row>
    </Container>
  );
}

export default AdminPage;