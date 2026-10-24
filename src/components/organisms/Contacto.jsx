import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const datosIniciales = {
  nombre: '',
  correo: '',
  telefono: '',
  motivo: '',
  mensaje: '',
};

export default function ContactSection() {
  const [datos, setDatos] = useState(datosIniciales);
  const [estado, setEstado] = useState(null);

  function actualizarCampo(evento) {
    const { name, value } = evento.target;

    setDatos((actuales) => ({
      ...actuales,
      [name]: value,
    }));
  }

  function handleSubmit(evento) {
    evento.preventDefault();
    setEstado(null);

    const nombre = datos.nombre.trim();
    const correo = datos.correo.trim();
    const texto = datos.mensaje.trim();

    if (!nombre || !correo || !datos.motivo || !texto) {
      setEstado({
        tipo: 'danger',
        texto: 'Completa los campos obligatorios.',
      });
      return;
    }

    if (!correo.includes('@') || !correo.includes('.')) {
      setEstado({
        tipo: 'danger',
        texto: 'Escribe un correo válido.',
      });
      return;
    }

    try {
      const guardadas = localStorage.getItem('vet_contact_messages');
      const anteriores = guardadas ? JSON.parse(guardadas) : [];

      if (!Array.isArray(anteriores)) {
        throw new Error('Formato de consultas inválido');
      }

      const nuevaConsulta = {
        nombre,
        correo,
        telefono: datos.telefono.trim(),
        motivo: datos.motivo,
        mensaje: texto,
      };

      localStorage.setItem(
        'vet_contact_messages',
        JSON.stringify([...anteriores, nuevaConsulta])
      );

      setDatos({ ...datosIniciales });

      setEstado({
        tipo: 'success',
        texto: 'Consulta registrada correctamente.',
      });
    } catch {
      setEstado({
        tipo: 'danger',
        texto: 'No se pudo guardar la consulta en este navegador.',
      });
    }
  }

  return (
    <section
      id="contacto"
      className="home-section home-contact"
    >
      <Container fluid="xxl" className="px-3 px-lg-4">
        <div className="home-contact__grid">
          <div>
            <p className="home-eyebrow">Estamos para ayudarte</p>

            <h2>Contacto</h2>

            <p>
              Completa el formulario para dejar una consulta.
            </p>

            <p>
              <strong>Ubicación:</strong> Rancagua,
              Región de O'Higgins
            </p>

            <p>
              <strong>Atención:</strong> Perros, gatos,
              conejos y aves
            </p>
          </div>

          <div className="home-contact__panel">
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="contact-name">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  name="nombre"
                  value={datos.nombre}
                  onChange={actualizarCampo}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="contact-email">
                <Form.Label>Correo *</Form.Label>
                <Form.Control
                  name="correo"
                  type="email"
                  value={datos.correo}
                  onChange={actualizarCampo}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="contact-phone">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  name="telefono"
                  type="tel"
                  value={datos.telefono}
                  onChange={actualizarCampo}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="contact-subject">
                <Form.Label>Motivo *</Form.Label>
                <Form.Select
                  name="motivo"
                  value={datos.motivo}
                  onChange={actualizarCampo}
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Cita">Consulta por cita</option>
                  <option value="Servicio">Consulta por servicio</option>
                  <option value="Mascota">Consulta por mascota</option>
                  <option value="Otro">Otra consulta</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="contact-message">
                <Form.Label>Mensaje *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="mensaje"
                  value={datos.mensaje}
                  onChange={actualizarCampo}
                  required
                />
              </Form.Group>

              {estado && (
                <Alert variant={estado.tipo} role="status">
                  {estado.texto}
                </Alert>
              )}

              <Button type="submit" variant="primary">
                Enviar consulta
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
}