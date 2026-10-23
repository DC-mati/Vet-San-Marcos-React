import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [rol, setRol] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (evento) => {
    evento.preventDefault();

    const emailTrimmed = correo.trim();
    const claveTrimmed = clave.trim();

    // 1. Validar campos vacíos
    if (!emailTrimmed || !claveTrimmed || !rol) {
      setMensaje("Completa todos los campos.");
      return;
    }

    // 2. Validación básica de correo
    if (!emailTrimmed.includes("@") || !emailTrimmed.includes(".")) {
      setMensaje("Escribe un correo válido.");
      return;
    }

    // 3. Validación de contraseña
    if (claveTrimmed.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // Limpiar mensajes si pasa las validaciones
    setMensaje("");

    // Guardar en sessionStorage
    sessionStorage.setItem("vetEmail", emailTrimmed);
    sessionStorage.setItem("vetRole", rol);

    // Tabla de rutas por rol
    const rutasPorRol = {
      admin: "/admin",
      recepcion: "/recepcion",
      veterinario: "/veterinario",
      tecnico: "/tecnico",
      cliente: "/cliente"
    };

    // Redirección adaptativa
    const destino = rutasPorRol[rol] || "/cliente";
    navigate(destino);
  };

  return (
    <Form onSubmit={handleSubmit} id="login-form">
      {mensaje && <Alert variant="danger">{mensaje}</Alert>}

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="nombre@ejemplo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="••••••••"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="role">
        <Form.Label>Rol</Form.Label>
        <Form.Select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="">Selecciona un rol...</option>
          <option value="admin">Administrador</option>
          <option value="recepcion">Recepción</option>
          <option value="veterinario">Veterinario</option>
          <option value="tecnico">Técnico</option>
          <option value="cliente">Cliente</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100 mt-2">
        Iniciar Sesión
      </Button>
    </Form>
  );
}
