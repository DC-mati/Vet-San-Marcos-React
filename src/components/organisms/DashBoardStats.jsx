import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import StatCard from '../molecules/StatCard';

function DashboardStats() {
  return (
    <Row className="g-3">

      <Col md={3}>
        <StatCard
          title="Citas"
          value="20"
          description="Agenda actual"
        />
      </Col>

      <Col md={3}>
        <StatCard
          title="Pacientes"
          value="15"
          description="Fichas disponibles"
        />
      </Col>

      <Col md={3}>
        <StatCard
          title="Usuarios"
          value="10"
          description="Todos los roles"
        />
      </Col>

      <Col md={3}>
        <StatCard
          title="Productos"
          value="25"
          description="Inventario"
        />
      </Col>

    </Row>
  );
}

export default DashboardStats;