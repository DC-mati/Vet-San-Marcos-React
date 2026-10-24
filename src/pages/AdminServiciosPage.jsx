import { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import FormularioServicio from '../components/organisms/FormularioServicio'
import { useServicios } from '../context/ServiciosContext'
import { formatoPrecio } from '../utils/formatoPrecio'
import { useTituloPagina } from '../hooks/useTitulodePagina'

const enlaces = [
  { to: '/admin', texto: 'Dashboard' },
  { to: '/admin/servicios', texto: 'Servicios (CRUD)' },
  { to: '/admin/citas', texto: 'Citas' },
]

export default function AdminServiciosPage() {
  useTituloPagina('Admin servicios')
  const { servicios, agregar, editar, eliminar } = useServicios()
  const [mostrarModal, setMostrarModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [feedback, setFeedback] = useState('')

  const abrirNuevo = () => {
    setEditando(null)
    setMostrarModal(true)
  }

  const abrirEditar = (servicio) => {
    setEditando(servicio)
    setMostrarModal(true)
  }

  const guardar = (datos) => {
    const resultado = editando
      ? editar(editando.codigo, datos)
      : agregar(datos)

    setFeedback(resultado.ok ? 'Guardado correctamente.' : resultado.error)
    if (resultado.ok) {
      setMostrarModal(false)
    }
  }

  return (
    <PlantillaAdmin titulo="Administración de servicios" enlaces={enlaces}>
      {feedback && (
        <Alert variant="info" onClose={() => setFeedback('')} dismissible>
          {feedback}
        </Alert>
      )}

      <Button className="mb-3" onClick={abrirNuevo}>
        Nuevo servicio
      </Button>

      <div className="table-responsive">
        <Table striped hover>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {servicios.map((s) => (
              <tr key={s.codigo}>
                <td>{s.codigo}</td>
                <td>{s.nombre}</td>
                <td>{s.categoria}</td>
                <td>{formatoPrecio(s.precio)}</td>
                <td className="text-end">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    className="me-2"
                    onClick={() => abrirEditar(s)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => eliminar(s.codigo)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editando ? 'Editar servicio' : 'Nuevo servicio'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioServicio
            servicioInicial={editando}
            onGuardar={guardar}
            onCancelar={() => setMostrarModal(false)}
          />
        </Modal.Body>
      </Modal>
    </PlantillaAdmin>
  )
}
