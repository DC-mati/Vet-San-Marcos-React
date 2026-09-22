import { useState } from 'react';
import Form from 'react-bootstrap/Form';

import EmailInput from '../atoms/EmailInput';
import PasswordInput from '../atoms/PasswordInput';
import PrimaryButton from '../atoms/PrimaryButton';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(email);
    console.log(password);
    console.log(rememberMe);
  };

  return (
    <Form onSubmit={handleSubmit}>

      <EmailInput
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <PasswordInput
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Form.Check
        type="checkbox"
        label="Recuérdame"
        checked={rememberMe}
        onChange={(event) => setRememberMe(event.target.checked)}
        className="mb-3"
      />

      <PrimaryButton />

    </Form>
  );
}

export default LoginForm;
