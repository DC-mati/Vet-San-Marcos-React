import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

function Sidebar() {
  return (
    <div className="sidebar p-3">

            <h4 className="mb-4">
                Veterinaria San Marcos
            </h4>

            <Nav className="flex-column">

                <Nav.Link href="#dashboard">
                Dashboard
                </Nav.Link>

                <Nav.Link href="#citas">
                Citas
                </Nav.Link>

                <Nav.Link href="#pacientes">
                Pacientes
                </Nav.Link>

                <Nav.Link href="#fichas">
                Fichas clínicas
                </Nav.Link>

                <Nav.Link href="#usuarios">
                Usuarios
                </Nav.Link>

                <Nav.Link href="#servicios">
                Servicios
                </Nav.Link>

                <Nav.Link href="#inventario">
                Inventario
                </Nav.Link>

                <Nav.Link href="#reportes">
                Reportes
                </Nav.Link>

            </Nav>

            <Button
                variant="outline-danger"
                className="mt-4 w-100"
            >
                Cerrar sesión
            </Button>

    </div>
  );
}

export default Sidebar;
