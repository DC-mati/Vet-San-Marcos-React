import Form from "react-bootstrap/Form";

export function CampoFormulario({
  id,
  nombre,
  etiqueta,
  tipo = "text",
  valor,
  onCambio,
  error = "",
  placeholder = "",
}) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{etiqueta}</Form.Label>
      <Form.Control
        type={tipo}
        name={nombre}
        value={valor}
        placeholder={placeholder}
        onChange={(e) => onCambio(nombre, e.target.value)}
        isInvalid={error !== ""}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}
