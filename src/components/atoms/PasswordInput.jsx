import Form from 'react-bootstrap/Form';

function PasswordInput({ value, onChange }) {
  return (
    <Form.Group className="mb-3" controlId="loginPassword">
      <Form.Label>Contraseña</Form.Label>

      <Form.Control
        type="password"
        placeholder="Ingresa tu contraseña"
        value={value}
        onChange={onChange}
        required
      />
    </Form.Group>
  );
}

export default PasswordInput;
