import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

/** Filtro por texto y categoría para el catálogo. */
export default function BuscadorServicios({
  termino,
  categoria,
  categorias,
  onTerminoChange,
  onCategoriaChange,
}) {
  return (
    <Row className="g-3 mb-4">
      <Col md={8}>
        <Form.Label htmlFor="buscar-servicios">Buscar servicio</Form.Label>
        <Form.Control
          id="buscar-servicios"
          type="search"
          placeholder="Nombre o categoría..."
          value={termino}
          onChange={(e) => onTerminoChange(e.target.value)}
        />
      </Col>
      <Col md={4}>
        <Form.Label htmlFor="filtro-categoria">Categoría</Form.Label>
        <Form.Select
          id="filtro-categoria"
          value={categoria}
          onChange={(e) => onCategoriaChange(e.target.value)}
        >
          <option value="">Todas</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  )
}
