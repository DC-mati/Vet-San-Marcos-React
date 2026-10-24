import { useMemo, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import { useServicios } from '../../context/ServiciosContext'
import {
  calcularPrecioUrgencia,
  esServicioUrgencia,
} from '../../utils/calcularPrecioUrgencia'
import { validarSolicitudCita } from '../../utils/validaciones'
import { formatoPrecio } from '../../utils/formatoPrecio'

/**
 * Formulario principal para solicitar una cita veterinaria.
 * Valida campos y entrega los datos listos al componente padre.
 */
export default function FormularioSolicitudCita({
  codigoInicial = '',
  valoresIniciales = {},
  bloquearDatosCuenta = false,
  onContinuar,
}) {
  const { servicios } = useServicios()
  const [datos, setDatos] = useState({
    nombreMascota: '',
    especie: 'Perro',
    codigoServicio: codigoInicial,
    fecha: '',
    hora: '',
    nombreDueno: '',
    correo: '',
    telefono: '',
    observaciones: '',
    fueraHorario: false,
    ...valoresIniciales,
  })
  const [errores, setErrores] = useState({})

  const servicioSeleccionado = useMemo(
    () => servicios.find((s) => s.codigo === datos.codigoServicio),
    [servicios, datos.codigoServicio],
  )

  const precioEstimado = useMemo(() => {
    if (!servicioSeleccionado) {
      return 0
    }

    const fuera =
      datos.fueraHorario && esServicioUrgencia(servicioSeleccionado)

    return calcularPrecioUrgencia(servicioSeleccionado.precio, fuera)
  }, [servicioSeleccionado, datos.fueraHorario])

  const actualizarCampo = (campo, valor) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }))
    setErrores((prev) => ({ ...prev, [campo]: '' }))
  }

  const enviar = (evento) => {
    evento.preventDefault()
    const nuevosErrores = validarSolicitudCita(datos)

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    onContinuar({
      ...datos,
      nombreServicio: servicioSeleccionado?.nombre || '',
      precioEstimado,
    })
  }

  return (
    <Form onSubmit={enviar} noValidate>
      <Alert variant="secondary" className="small">
        Simulación frontend: no hay calendario real de disponibilidad.
        La recepción confirmará o propondrá otro horario.
      </Alert>

      <Form.Group className="mb-3">
        <Form.Label>Nombre de la mascota</Form.Label>
        <Form.Control
          value={datos.nombreMascota}
          onChange={(e) => actualizarCampo('nombreMascota', e.target.value)}
          isInvalid={Boolean(errores.nombreMascota)}
        />
        <Form.Control.Feedback type="invalid">
          {errores.nombreMascota}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Especie</Form.Label>
        <Form.Select
          value={datos.especie}
          onChange={(e) => actualizarCampo('especie', e.target.value)}
          isInvalid={Boolean(errores.especie)}
        >
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          <option value="Ave">Ave</option>
          <option value="Conejo">Conejo</option>
          <option value="Otra">Otra</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errores.especie}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Servicio</Form.Label>
        <Form.Select
          value={datos.codigoServicio}
          onChange={(e) => actualizarCampo('codigoServicio', e.target.value)}
          isInvalid={Boolean(errores.codigoServicio)}
        >
          <option value="">Selecciona...</option>
          {servicios.map((s) => (
            <option key={s.codigo} value={s.codigo}>
              {s.nombre} ({formatoPrecio(s.precio)})
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errores.codigoServicio}
        </Form.Control.Feedback>
      </Form.Group>

      {servicioSeleccionado && esServicioUrgencia(servicioSeleccionado) && (
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Solicitud fuera de horario (+$10.000 CLP, una sola vez)"
            checked={datos.fueraHorario}
            onChange={(e) => actualizarCampo('fueraHorario', e.target.checked)}
          />
        </Form.Group>
      )}

      <div className="row">
        <Form.Group className="mb-3 col-md-6">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="date"
            value={datos.fecha}
            onChange={(e) => actualizarCampo('fecha', e.target.value)}
            isInvalid={Boolean(errores.fecha)}
          />
          <Form.Control.Feedback type="invalid">
            {errores.fecha}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 col-md-6">
          <Form.Label>Hora</Form.Label>
          <Form.Control
            type="time"
            value={datos.hora}
            onChange={(e) => actualizarCampo('hora', e.target.value)}
            isInvalid={Boolean(errores.hora)}
          />
          <Form.Control.Feedback type="invalid">
            {errores.hora}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Tu nombre</Form.Label>
        <Form.Control
          value={datos.nombreDueno}
          onChange={(e) => actualizarCampo('nombreDueno', e.target.value)}
          isInvalid={Boolean(errores.nombreDueno)}
          readOnly={bloquearDatosCuenta}
        />
        <Form.Control.Feedback type="invalid">
          {errores.nombreDueno}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Correo</Form.Label>
        <Form.Control
          type="email"
          value={datos.correo}
          onChange={(e) => actualizarCampo('correo', e.target.value)}
          isInvalid={Boolean(errores.correo)}
          readOnly={bloquearDatosCuenta}
        />
        <Form.Control.Feedback type="invalid">
          {errores.correo}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Teléfono (opcional)</Form.Label>
        <Form.Control
          value={datos.telefono}
          onChange={(e) => actualizarCampo('telefono', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Observaciones</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={datos.observaciones}
          onChange={(e) => actualizarCampo('observaciones', e.target.value)}
        />
      </Form.Group>

      {precioEstimado > 0 && (
        <p className="fw-semibold">
          Precio estimado: {formatoPrecio(precioEstimado)}
        </p>
      )}

      <Button type="submit" variant="primary">
        Revisar solicitud
      </Button>
    </Form>
  )
}
