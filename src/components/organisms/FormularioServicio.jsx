import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const vacio = {
  codigo: '',
  categoria: '',
  nombre: '',
  especie: '',
  duracion: '',
  precio: '',
  observaciones: '',
}

/** Formulario CRUD de servicios para el panel administrativo. */
export default function FormularioServicio({
  servicioInicial = null,
  onGuardar,
  onCancelar,
}) {
  const [datos, setDatos] = useState(servicioInicial || vacio)
  const [error, setError] = useState('')

  const esEdicion = Boolean(servicioInicial)

  const cambiar = (campo, valor) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }))
    setError('')
  }

  const enviar = (evento) => {
    evento.preventDefault()

    if (!datos.codigo.trim() || !datos.nombre.trim()) {
      setError('Código y nombre son obligatorios.')
      return
    }

    if (Number(datos.precio) <= 0) {
      setError('El precio debe ser mayor que cero.')
      return
    }

    onGuardar(datos)
  }

  return (
    <Form onSubmit={enviar}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Código</Form.Label>
        <Form.Control
          value={datos.codigo}
          disabled={esEdicion}
          onChange={(e) => cambiar('codigo', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Categoría</Form.Label>
        <Form.Control
          value={datos.categoria}
          onChange={(e) => cambiar('categoria', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          value={datos.nombre}
          onChange={(e) => cambiar('nombre', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Especie</Form.Label>
        <Form.Control
          value={datos.especie}
          onChange={(e) => cambiar('especie', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Duración</Form.Label>
        <Form.Control
          value={datos.duracion}
          onChange={(e) => cambiar('duracion', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio (CLP)</Form.Label>
        <Form.Control
          type="number"
          min="1"
          value={datos.precio}
          onChange={(e) => cambiar('precio', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Observaciones</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={datos.observaciones}
          onChange={(e) => cambiar('observaciones', e.target.value)}
        />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button type="submit" variant="primary">
          {esEdicion ? 'Guardar cambios' : 'Crear servicio'}
        </Button>
        {onCancelar && (
          <Button type="button" variant="outline-secondary" onClick={onCancelar}>
            Cancelar
          </Button>
        )}
      </div>
    </Form>
  )
}
