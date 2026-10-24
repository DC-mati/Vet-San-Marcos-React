import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import { enlacesPanelDueno } from '../constants/enlacesDueno'
import { useAuth } from '../context/AuthContext'
import { useMascotas } from '../context/MascotasContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

const vacio = {
  nombre: '',
  especie: 'Perro',
  raza: '',
  sexo: '',
  edad: '',
  peso: '',
}

export default function DuenoMascotasPage() {
  useTituloPagina('Mis mascotas')
  const { usuario } = useAuth()
  const { mascotas, recargar, registrar, editar, desactivar } = useMascotas()
  const [mostrarModal, setMostrarModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [datos, setDatos] = useState(vacio)
  const [mensaje, setMensaje] = useState('')
  const [confirmarId, setConfirmarId] = useState(null)

  useEffect(() => {
    if (usuario?.correo) {
      recargar(usuario.correo)
    }
  }, [usuario?.correo, recargar])

  const abrirNueva = () => {
    setEditando(null)
    setDatos(vacio)
    setMostrarModal(true)
  }

  const abrirEditar = (mascota) => {
    setEditando(mascota)
    setDatos({
      nombre: mascota.nombre,
      especie: mascota.especie,
      raza: mascota.raza || '',
      sexo: mascota.sexo || '',
      edad: mascota.edad || '',
      peso: mascota.peso || '',
    })
    setMostrarModal(true)
  }

  const guardar = (evento) => {
    evento.preventDefault()
    setMensaje('')

    const payload = { ...datos, tutorCorreo: usuario.correo }
    const resultado = editando
      ? editar(editando.id, payload, usuario.correo)
      : registrar(payload)

    if (!resultado.ok) {
      setMensaje(resultado.error)
      return
    }

    setMostrarModal(false)
    setMensaje(editando ? 'Mascota actualizada.' : 'Mascota registrada.')
  }

  return (
    <PlantillaAdmin
      titulo="Mis mascotas"
      descripcion="Registra las mascotas asociadas a tu cuenta para solicitar citas."
      enlaces={enlacesPanelDueno}
    >
      {mensaje && (
        <Alert variant="info" dismissible onClose={() => setMensaje('')}>
          {mensaje}
        </Alert>
      )}

      <Button className="mb-3" onClick={abrirNueva}>
        Registrar mascota
      </Button>

      {!mascotas.length && (
        <p className="text-secondary">
          Todavía no tienes mascotas registradas. Puedes crear una aquí o al
          solicitar una cita.
        </p>
      )}

      {mascotas.length > 0 && (
        <div className="table-responsive">
          <Table striped hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Especie</th>
                <th>Raza</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {mascotas.map((m) => (
                <tr key={m.id}>
                  <td>{m.nombre}</td>
                  <td>{m.especie}</td>
                  <td>{m.raza || '—'}</td>
                  <td className="text-end">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-2"
                      onClick={() => abrirEditar(m)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => setConfirmarId(m.id)}
                    >
                      Desactivar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editando ? 'Editar mascota' : 'Nueva mascota'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={guardar}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={datos.nombre}
                onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Especie</Form.Label>
              <Form.Select
                value={datos.especie}
                onChange={(e) => setDatos({ ...datos, especie: e.target.value })}
              >
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="Ave">Ave</option>
                <option value="Conejo">Conejo</option>
                <option value="Otra">Otra</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Raza (opcional)</Form.Label>
              <Form.Control
                value={datos.raza}
                onChange={(e) => setDatos({ ...datos, raza: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setMostrarModal(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={Boolean(confirmarId)} onHide={() => setConfirmarId(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Desactivar mascota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          La mascota dejará de aparecer en nuevas solicitudes. Las citas
          anteriores se conservan.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmarId(null)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              desactivar(confirmarId, usuario.correo)
              setConfirmarId(null)
              setMensaje('Mascota desactivada.')
            }}
          >
            Sí, desactivar
          </Button>
        </Modal.Footer>
      </Modal>
    </PlantillaAdmin>
  )
}
