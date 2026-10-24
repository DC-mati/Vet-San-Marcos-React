import { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import { enlacesAdmin, etiquetaRol } from '../constants/navegacionPaneles'
import {
  actualizarUsuarioAdmin,
  crearUsuarioAdmin,
  listarUsuariosParaAdmin,
} from '../services/usuariosService'
import { useTituloPagina } from '../hooks/useTitulodePagina'

const ROLES = [
  { valor: 'cliente', etiqueta: 'Dueño de mascota' },
  { valor: 'recepcion', etiqueta: 'Recepcionista' },
  { valor: 'admin', etiqueta: 'Administrador' },
  { valor: 'veterinario', etiqueta: 'Veterinario' },
  { valor: 'tecnico', etiqueta: 'Técnico' },
]

export default function AdminUsuariosPage() {
  useTituloPagina('Usuarios')
  const [usuarios, setUsuarios] = useState(() => listarUsuariosParaAdmin())
  const [mensaje, setMensaje] = useState('')
  const [mostrarAlta, setMostrarAlta] = useState(false)
  const [editando, setEditando] = useState(null)
  const [formAlta, setFormAlta] = useState({
    nombre: '',
    correo: '',
    rol: 'cliente',
  })

  const usuarios = useMemo(
    () => listarUsuariosParaAdmin(),
    [tick],
  )

  const recargar = () => setTick((n) => n + 1)

  const guardarAlta = (evento) => {
    evento.preventDefault()
    const resultado = crearUsuarioAdmin(formAlta)
    setMensaje(resultado.ok ? 'Usuario creado (simulación).' : resultado.error)
    if (resultado.ok) {
      setMostrarAlta(false)
      setFormAlta({ nombre: '', correo: '', rol: 'cliente' })
      recargar()
    }
  }

  return (
    <PlantillaAdmin
      titulo="Gestión de usuarios"
      descripcion="Simulación académica. Las contraseñas no se muestran en tablas."
      enlaces={enlacesAdmin}
    >
      <Alert variant="info" className="small">
        Las cuentas demo no se editan aquí. Puedes crear cuentas nuevas o
        actualizar las registradas.
      </Alert>

      {mensaje && (
        <Alert variant="info" dismissible onClose={() => setMensaje('')}>
          {mensaje}
        </Alert>
      )}

      <Button className="mb-3" onClick={() => setMostrarAlta(true)}>
        Crear cuenta demo
      </Button>

      <div className="table-responsive">
        <Table striped hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Origen</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.correo}>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{etiquetaRol[u.rol] || u.rol}</td>
                <td>{u.activo ? 'Activo' : 'Inactivo'}</td>
                <td>{u.origen}</td>
                <td>
                  {u.editable && (
                    <Button size="sm" onClick={() => setEditando(u)}>
                      Editar
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={mostrarAlta} onHide={() => setMostrarAlta(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva cuenta</Modal.Title>
        </Modal.Header>
        <Form onSubmit={guardarAlta}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={formAlta.nombre}
                onChange={(e) =>
                  setFormAlta({ ...formAlta, nombre: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                value={formAlta.correo}
                onChange={(e) =>
                  setFormAlta({ ...formAlta, correo: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rol</Form.Label>
              <Form.Select
                value={formAlta.rol}
                onChange={(e) =>
                  setFormAlta({ ...formAlta, rol: e.target.value })
                }
              >
                {ROLES.map((r) => (
                  <option key={r.valor} value={r.valor}>
                    {r.etiqueta}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setMostrarAlta(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={Boolean(editando)} onHide={() => setEditando(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar {editando?.correo}</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            const resultado = actualizarUsuarioAdmin(editando.correo, {
              nombre: fd.get('nombre'),
              rol: fd.get('rol'),
              activo: fd.get('activo') === 'true',
            })
            setMensaje(resultado.ok ? 'Usuario actualizado.' : resultado.error)
            setEditando(null)
            recargar()
          }}
        >
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="nombre"
                defaultValue={editando?.nombre}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select name="rol" defaultValue={editando?.rol}>
                {ROLES.map((r) => (
                  <option key={r.valor} value={r.valor}>
                    {r.etiqueta}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Select
                name="activo"
                defaultValue={editando?.activo ? 'true' : 'false'}
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditando(null)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Guardar cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </PlantillaAdmin>
  )
}
