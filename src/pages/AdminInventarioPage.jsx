import { useMemo, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import { enlacesAdmin } from '../constants/navegacionPaneles'
import { useInventario } from '../context/InventarioContext'
import { UMBRAL_STOCK_DEMO } from '../services/inventarioService'
import { formatoPrecio } from '../utils/formatoPrecio'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function AdminInventarioPage() {
  useTituloPagina('Inventario')
  const { productos, editar, buscar, categorias, stockBajo } = useInventario()
  const [termino, setTermino] = useState('')
  const [categoria, setCategoria] = useState('')
  const [editando, setEditando] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const lista = useMemo(() => {
    let base = termino ? buscar(termino) : productos
    if (categoria) {
      base = base.filter((p) => p.categoria === categoria)
    }
    return base
  }, [termino, categoria, buscar, productos])

  const bajos = stockBajo()

  return (
    <PlantillaAdmin
      titulo="Inventario"
      descripcion="Productos del catálogo oficial. Alerta demo con stock ≤ umbral configurable."
      enlaces={enlacesAdmin}
    >
      <Alert variant="secondary" className="small">
        Umbral de demostración para stock bajo: {UMBRAL_STOCK_DEMO} unidades.
      </Alert>

      {mensaje && (
        <Alert variant="info" dismissible onClose={() => setMensaje('')}>
          {mensaje}
        </Alert>
      )}

      {bajos.length > 0 && (
        <Alert variant="warning">
          {bajos.length} productos con stock bajo según el umbral demo.
        </Alert>
      )}

      <div className="row g-3 mb-3">
        <Form.Group className="col-md-6">
          <Form.Label>Buscar</Form.Label>
          <Form.Control
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
            placeholder="Nombre o código"
          />
        </Form.Group>
        <Form.Group className="col-md-4">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas</option>
            {categorias().map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>

      <div className="table-responsive">
        <Table striped hover>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Precio</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {lista.map((p) => (
              <tr key={p.codigo}>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{p.stock}</td>
                <td>{formatoPrecio(p.precio)}</td>
                <td>
                  <Button size="sm" onClick={() => setEditando(p)}>
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={Boolean(editando)} onHide={() => setEditando(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar {editando?.codigo}</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            const resultado = editar(editando.codigo, {
              stock: fd.get('stock'),
              precio: fd.get('precio'),
            })
            setMensaje(resultado.ok ? 'Producto actualizado.' : resultado.error)
            setEditando(null)
          }}
        >
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                name="stock"
                type="number"
                min="0"
                defaultValue={editando?.stock}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                name="precio"
                type="number"
                min="0"
                defaultValue={editando?.precio}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditando(null)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </PlantillaAdmin>
  )
}
