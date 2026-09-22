import Form from 'react-bootstrap/Form';

function EmailInput({ value, onChange }) {
  return (
    <Form.Group className="mb-3" controlId="loginEmail">
      <Form.Label>Email</Form.Label>

      <Form.Control
        type="email"
        placeholder="Ingresa tu email"
        value={value}
        onChange={onChange}
        required
      />
    </Form.Group>
  );
}

export default EmailInput;
