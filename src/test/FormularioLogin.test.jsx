import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';

import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import {
  MemoryRouter,
  useLocation,
} from 'react-router-dom';

import FormularioLogin from '../components/organisms/FormularioLogin';

function RutaActual() {
  const { pathname } = useLocation();

  return (
    <output data-testid="ruta-actual">
      {pathname}
    </output>
  );
}

function renderFormulario() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <FormularioLogin />
      <RutaActual />
    </MemoryRouter>
  );
}

function completarFormulario({
  correo = 'usuario@ejemplo.com',
  clave = 'secreto123',
  rol = 'admin',
} = {}) {
  fireEvent.change(
    screen.getByLabelText(/correo electrónico/i),
    { target: { value: correo } }
  );

  fireEvent.change(
    screen.getByLabelText(/contraseña/i),
    { target: { value: clave } }
  );

  fireEvent.change(
    screen.getByLabelText(/^rol$/i),
    { target: { value: rol } }
  );
}

function enviarFormulario() {
  const formulario = document.querySelector('#login-form');

  if (!formulario) {
    throw new Error('No se encontró el formulario de login.');
  }

  fireEvent.submit(formulario);
}

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(() => {
  cleanup();
  sessionStorage.clear();
});

describe('FormularioLogin', () => {
  it('1. muestra los campos del formulario', () => {
    renderFormulario();

    expect(
      screen.getByLabelText(/correo electrónico/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/contraseña/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/^rol$/i)
    ).toBeInTheDocument();
  });

  it('2. muestra un mensaje si los campos están vacíos', () => {
    renderFormulario();

    enviarFormulario();

    expect(
      screen.getByText('Completa todos los campos.')
    ).toBeInTheDocument();
  });

  it('3. rechaza un correo con formato incorrecto', () => {
    renderFormulario();

    completarFormulario({
      correo: 'correo-invalido',
    });

    enviarFormulario();

    expect(
      screen.getByText('Escribe un correo válido.')
    ).toBeInTheDocument();
  });

  it('4. rechaza una contraseña de menos de seis caracteres', () => {
    renderFormulario();

    completarFormulario({
      clave: '12345',
    });

    enviarFormulario();

    expect(
      screen.getByText(
        'La contraseña debe tener al menos 6 caracteres.'
      )
    ).toBeInTheDocument();
  });

  it.each([
    ['admin', '/admin'],
    ['recepcion', '/recepcion'],
    ['veterinario', '/veterinario'],
    ['tecnico', '/tecnico'],
    ['cliente', '/cliente'],
  ])(
    'redirige el rol %s a %s',
    (rol, rutaEsperada) => {
      renderFormulario();

      completarFormulario({ rol });
      enviarFormulario();

      expect(
        screen.getByTestId('ruta-actual')
      ).toHaveTextContent(rutaEsperada);
    }
  );

  it('10. guarda el correo y el rol en la sesión', () => {
    renderFormulario();

    completarFormulario({
      correo: 'matias@ejemplo.com',
      clave: 'secreto123',
      rol: 'cliente',
    });

    enviarFormulario();

    expect(
      sessionStorage.getItem('vetEmail')
    ).toBe('matias@ejemplo.com');

    expect(
      sessionStorage.getItem('vetRole')
    ).toBe('cliente');
  });
});
