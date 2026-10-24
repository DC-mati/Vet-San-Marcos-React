import { useEffect, useMemo, useRef, useState } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import { useServicios } from '../../context/ServiciosContext'
import { useCitas } from '../../context/CitasContext'
import { useAuth } from '../../context/AuthContext'
import { useMascotas } from '../../context/MascotasContext'
import { correoYaRegistrado } from '../../services/authService'
import { validarDatosNuevaCita } from '../../services/citasService'
import {
  calcularPrecioUrgencia,
  esServicioUrgencia,
} from '../../utils/calcularPrecioUrgencia'
import {
  validarEtapaCita,
  validarSolicitudCita,
  validarEmail,
} from '../../utils/validaciones'
import { formatoPrecio } from '../../utils/formatoPrecio'
import ResumenConfirmacionSolicitud from './ResumenConfirmacionSolicitud'

/**
 * Solicitud de cita en dos etapas: datos de la cita y confirmación con cuenta.
 * variant="publico" no exige login previo; variant="panel" usa la sesión del dueño.
 */
export default function FormularioSolicitudCita({
  codigoInicial = '',
  variant = 'panel',
  valoresIniciales = {},
  mascotasRegistradas: mascotasProp = [],
  onExito,
}) {
  const { servicios } = useServicios()
  const { solicitar } = useCitas()
  const { usuario, login, registroYLogin } = useAuth()
  const { mascotas: mascotasCtx, recargar } = useMascotas()

  const esPanel = variant === 'panel'
  const dueñoAutenticado = esPanel && usuario?.rol === 'cliente'

  const [paso, setPaso] = useState(1)
  const [datos, setDatos] = useState({
    nombreMascota: '',
    especie: 'Perro',
    codigoServicio: codigoInicial,
    fecha: '',
    hora: '',
    nombreDueno: valoresIniciales.nombreDueno || '',
    correo: valoresIniciales.correo || '',
    telefono: '',
    observaciones: '',
    fueraHorario: false,
    mascotaId: '',
    ...valoresIniciales,
  })
  const [clave, setClave] = useState('')
  const [confirmarClave, setConfirmarClave] = useState('')
  const [claveLogin, setClaveLogin] = useState('')
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [cuentaExistente, setCuentaExistente] = useState(false)
  const datosRef = useRef(datos)

  useEffect(() => {
    datosRef.current = datos
  }, [datos])

  const correoSesion = datos.correo.trim().toLowerCase()
  const dueñoEnSesion =
    dueñoAutenticado
    || (usuario?.rol === 'cliente' && usuario.correo === correoSesion)

  useEffect(() => {
    if (dueñoEnSesion && usuario?.correo) {
      recargar(usuario.correo)
    }
  }, [dueñoEnSesion, usuario?.correo, recargar])

  const mascotasRegistradas = dueñoEnSesion
    ? mascotasProp.length
      ? mascotasProp
      : mascotasCtx
    : []

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

  const solicitudResumen = useMemo(
    () => ({
      ...datos,
      nombreServicio: servicioSeleccionado?.nombre || '',
      precioEstimado,
    }),
    [datos, servicioSeleccionado, precioEstimado],
  )

  const actualizarCampo = (campo, valor) => {
    setDatos((prev) => {
      const next = { ...prev, [campo]: valor }
      datosRef.current = next
      return next
    })
    setErrores((prev) => ({ ...prev, [campo]: '' }))
    setMensaje('')
  }

  const elegirMascota = (id) => {
    if (!id) {
      actualizarCampo('mascotaId', '')
      return
    }

    const mascota = mascotasRegistradas.find((m) => m.id === id)
    if (!mascota) {
      return
    }

    setDatos((prev) => {
      const next = {
        ...prev,
        mascotaId: id,
        nombreMascota: mascota.nombre,
        especie: mascota.especie,
      }
      datosRef.current = next
      return next
    })
    setErrores((prev) => ({ ...prev, nombreMascota: '', especie: '' }))
  }

  const continuarEtapaUno = (evento) => {
    evento.preventDefault()
    setMensaje('')

    const actuales = datosRef.current
    const nuevosErrores = validarEtapaCita(actuales)
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    if (
      dueñoAutenticado
      && !actuales.mascotaId
      && !(actuales.nombreMascota || '').trim()
    ) {
      setErrores({
        nombreMascota: 'Selecciona una mascota o escribe un nombre para registrarla.',
      })
      return
    }

    datosRef.current = actuales
    setDatos(actuales)
    setPaso(2)

    if (!dueñoAutenticado && validarEmail(actuales.correo)) {
      setCuentaExistente(correoYaRegistrado(actuales.correo))
    } else if (!dueñoAutenticado) {
      setCuentaExistente(false)
    }
  }

  const volverEtapaUno = () => {
    setPaso(1)
    setMensaje('')
    setErrores({})
  }

  const iniciarSesionEnFlujo = (evento) => {
    evento.preventDefault()
    setMensaje('')
    setErrores({})

    const resultado = login(datos.correo, claveLogin)
    if (!resultado.ok) {
      setErrores({ claveLogin: resultado.error })
      return
    }

    if (resultado.usuario.rol !== 'cliente') {
      setMensaje('Esta cuenta no puede solicitar citas como dueño.')
      return
    }

    setDatos((prev) => ({
      ...prev,
      nombreDueno: resultado.usuario.nombre || prev.nombreDueno,
      correo: resultado.usuario.correo,
    }))
    recargar(resultado.usuario.correo)
    setCuentaExistente(true)
    setClaveLogin('')
  }

  const confirmarSolicitud = () => {
    if (enviando) {
      return
    }

    setEnviando(true)
    setMensaje('')
    setErrores({})

    try {
      const actuales = datosRef.current
      const datosConfirmacion =
        dueñoAutenticado && usuario
          ? {
              ...actuales,
              correo: actuales.correo || usuario.correo,
              nombreDueno: actuales.nombreDueno || usuario.nombre || '',
            }
          : actuales

      const servicioConfirmacion = servicios.find(
        (s) => s.codigo === datosConfirmacion.codigoServicio,
      )
      const precioConfirmacion = servicioConfirmacion
        ? calcularPrecioUrgencia(
            servicioConfirmacion.precio,
            datosConfirmacion.fueraHorario
              && esServicioUrgencia(servicioConfirmacion),
          )
        : precioEstimado

      const nuevosErrores = validarSolicitudCita(datosConfirmacion)

      if (!dueñoAutenticado) {
        if (!validarEmail(datos.correo)) {
          nuevosErrores.correo = 'Escribe un correo válido.'
        }

        const existe = correoYaRegistrado(datos.correo)
        setCuentaExistente(existe)

        if (existe) {
          if (!usuario || usuario.correo !== datos.correo.trim().toLowerCase()) {
            nuevosErrores.general =
              'Inicia sesión con este correo para confirmar la solicitud.'
            setErrores(nuevosErrores)
            return
          }
        } else {
          if (clave.length < 6) {
            nuevosErrores.clave = 'La contraseña debe tener al menos 6 caracteres.'
          }
          if (clave !== confirmarClave) {
            nuevosErrores.confirmarClave = 'Las contraseñas no coinciden.'
          }
        }
      }

      if (Object.keys(nuevosErrores).length > 0) {
        setErrores(nuevosErrores)
        setMensaje('Revisa los datos de la cita. Puedes volver atrás para corregirlos.')
        return
      }

      const correoDuenoSesion =
        dueñoAutenticado || usuario?.rol === 'cliente'
          ? usuario?.correo
          : datos.correo

      if (!correoDuenoSesion) {
        setMensaje('No se pudo identificar la cuenta del dueño.')
        return
      }

      const correoFinal = correoDuenoSesion.trim().toLowerCase()

      const payload = {
        ...datosConfirmacion,
        correo: correoFinal,
        tutorCorreo: correoFinal,
        nombreDueno: dueñoAutenticado
          ? (usuario?.nombre || datosConfirmacion.nombreDueno || '')
          : (datosConfirmacion.nombreDueno || ''),
        nombreServicio: servicioConfirmacion?.nombre || '',
        precioEstimado: precioConfirmacion,
        registrarMascotaEnFlujo: !datosConfirmacion.mascotaId,
      }

      const validacionCita = validarDatosNuevaCita(payload)
      if (!validacionCita.ok) {
        setMensaje(validacionCita.error)
        return
      }

      if (!dueñoAutenticado && !correoYaRegistrado(datos.correo)) {
        const registro = registroYLogin({
          nombre: datos.nombreDueno,
          correo: datos.correo,
          clave,
        })

        if (!registro.ok) {
          setMensaje(registro.error)
          return
        }

        payload.correo = registro.usuario.correo
        payload.tutorCorreo = registro.usuario.correo
        payload.nombreDueno = registro.usuario.nombre || payload.nombreDueno
      }

      const resultado = solicitar(payload)

      if (resultado.ok) {
        onExito?.(resultado.cita)
        return
      }

      setMensaje(resultado.error || 'No se pudo enviar la solicitud.')
    } catch (error) {
      setMensaje(
        error instanceof Error
          ? error.message
          : 'Error inesperado al confirmar la solicitud.',
      )
    } finally {
      setEnviando(false)
    }
  }

  const progreso = (
    <div
      className="flujo-cita-progreso mb-4"
      aria-label="Progreso de la solicitud"
    >
      <span className={paso === 1 ? 'activo' : 'completo'}>
        1. Datos de la cita
      </span>
      <span className="flujo-cita-progreso__separador" aria-hidden="true" />
      <span className={paso === 2 ? 'activo' : ''}>2. Confirmación</span>
    </div>
  )

  if (paso === 1) {
    return (
      <Form onSubmit={continuarEtapaUno} noValidate>
        {progreso}

        <Alert variant="secondary" className="small">
          Completa los datos de la atención. En el siguiente paso confirmarás
          la solicitud {dueñoAutenticado ? 'con tu cuenta' : 'y tu identificación'}.
        </Alert>

        {mascotasRegistradas.length > 0 && (
          <Form.Group className="mb-3" controlId="mascotaRegistrada">
            <Form.Label>Mascota registrada</Form.Label>
            <Form.Select
              value={datos.mascotaId}
              onChange={(e) => elegirMascota(e.target.value)}
            >
              <option value="">Selecciona una mascota...</option>
              {mascotasRegistradas.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre} ({m.especie})
                </option>
              ))}
            </Form.Select>
            <Form.Text muted>
              También puedes escribir una mascota nueva más abajo.
            </Form.Text>
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="nombreMascota">
          <Form.Label>Nombre de la mascota</Form.Label>
          <Form.Control
            value={datos.nombreMascota}
            onChange={(e) => actualizarCampo('nombreMascota', e.target.value)}
            isInvalid={Boolean(errores.nombreMascota)}
            readOnly={Boolean(datos.mascotaId)}
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
            disabled={Boolean(datos.mascotaId)}
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
          <Form.Label>Observaciones (opcional)</Form.Label>
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
          Continuar
        </Button>
      </Form>
    )
  }

  const sesionLista =
    dueñoAutenticado
    || (usuario?.rol === 'cliente'
      && usuario.correo === datos.correo.trim().toLowerCase())

  return (
    <div>
      {progreso}

      {mensaje && (
        <Alert variant="danger" dismissible onClose={() => setMensaje('')}>
          {mensaje}
        </Alert>
      )}

      {errores.general && (
        <Alert variant="warning">{errores.general}</Alert>
      )}

      {!dueñoAutenticado && (
        <>
          <h2 className="h5 mb-3">Datos del dueño</h2>

          <Form.Group className="mb-3">
            <Form.Label>Tu nombre</Form.Label>
            <Form.Control
              value={datos.nombreDueno}
              onChange={(e) => actualizarCampo('nombreDueno', e.target.value)}
              isInvalid={Boolean(errores.nombreDueno)}
              readOnly={sesionLista}
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
              onChange={(e) => {
                actualizarCampo('correo', e.target.value)
                setCuentaExistente(false)
              }}
              onBlur={(e) => {
                const correo = e.target.value
                if (validarEmail(correo)) {
                  setCuentaExistente(correoYaRegistrado(correo))
                }
              }}
              isInvalid={Boolean(errores.correo)}
              readOnly={sesionLista}
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

          {cuentaExistente && !sesionLista && (
            <div className="border rounded p-3 mb-3 bg-light">
              <p className="mb-2 small mb-0">
                Este correo ya tiene cuenta. Inicia sesión para confirmar sin
                volver a registrarte.
              </p>
              <Form onSubmit={iniciarSesionEnFlujo} className="mt-3">
                <Form.Group className="mb-2">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={claveLogin}
                    onChange={(e) => setClaveLogin(e.target.value)}
                    isInvalid={Boolean(errores.claveLogin)}
                    autoComplete="current-password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.claveLogin}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="outline-primary" size="sm">
                  Iniciar sesión y continuar
                </Button>
              </Form>
            </div>
          )}

          {!cuentaExistente && !sesionLista && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Crea una contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  isInvalid={Boolean(errores.clave)}
                  autoComplete="new-password"
                />
                <Form.Control.Feedback type="invalid">
                  {errores.clave}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirma la contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmarClave}
                  onChange={(e) => setConfirmarClave(e.target.value)}
                  isInvalid={Boolean(errores.confirmarClave)}
                  autoComplete="new-password"
                />
                <Form.Control.Feedback type="invalid">
                  {errores.confirmarClave}
                </Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          {sesionLista && (
            <Alert variant="success" className="small">
              Sesión iniciada como {usuario.nombre}. Revisa el resumen y confirma.
            </Alert>
          )}
        </>
      )}

      <h2 className="h5 mb-3">Resumen de la solicitud</h2>

      <ResumenConfirmacionSolicitud
        solicitud={solicitudResumen}
        enviando={enviando}
        onConfirmar={confirmarSolicitud}
        rutaEditar="#"
        ocultarEditar
      />

      <Button
        variant="outline-secondary"
        className="mt-3"
        onClick={volverEtapaUno}
        disabled={enviando}
      >
        Atrás
      </Button>
    </div>
  )
}
