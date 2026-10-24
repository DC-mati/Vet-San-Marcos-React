import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react'

import {
  MemoryRouter,
  useLocation,
} from 'react-router-dom'

import AppProviders from '../context/AppProviders'
import FormularioLogin from '../components/organisms/FormularioLogin'
import { CLAVE_DEMO } from '../data/usuariosDemo'

function RutaActual() {
  const { pathname } = useLocation()

  return (
    <output data-testid="ruta-actual">
      {pathname}
    </output>
  )
}

function renderFormulario() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <AppProviders>
        <FormularioLogin />
        <RutaActual />
      </AppProviders>
    </MemoryRouter>,
  )
}

function completarFormulario({
  correo = 'admin@sanmarcos.cl',
  clave = CLAVE_DEMO,
} = {}) {
  fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
    target: { value: correo },
  })

  fireEvent.change(screen.getByLabelText(/contraseña/i), {
    target: { value: clave },
  })
}

function enviarFormulario() {
  const formulario = document.querySelector('#login-form')

  if (!formulario) {
    throw new Error('No se encontró el formulario de login.')
  }

  fireEvent.submit(formulario)
}

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

afterEach(() => {
  cleanup()
  localStorage.clear()
  sessionStorage.clear()
})

describe('FormularioLogin', () => {
  it('1. muestra los campos del formulario', () => {
    renderFormulario()

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
  })

  it('2. muestra un mensaje si los campos están vacíos', () => {
    renderFormulario()
    enviarFormulario()

    expect(screen.getByText(/completa correo y contraseña/i)).toBeInTheDocument()
  })

  it('3. rechaza un correo con formato incorrecto', () => {
    renderFormulario()
    completarFormulario({ correo: 'correo-invalido' })
    enviarFormulario()

    expect(screen.getByText('Escribe un correo válido.')).toBeInTheDocument()
  })

  it('4. rechaza una contraseña de menos de seis caracteres', () => {
    renderFormulario()
    completarFormulario({ clave: '12345' })
    enviarFormulario()

    expect(
      screen.getByText('La contraseña debe tener al menos 6 caracteres.'),
    ).toBeInTheDocument()
  })

  it('5. rechaza credenciales incorrectas', () => {
    renderFormulario()
    completarFormulario({ clave: 'otra-clave' })
    enviarFormulario()

    expect(
      screen.getByText(/correo o contraseña incorrectos/i),
    ).toBeInTheDocument()
  })

  it.each([
    ['admin@sanmarcos.cl', '/admin'],
    ['recepcion@sanmarcos.cl', '/recepcion'],
    ['veterinario@sanmarcos.cl', '/veterinario'],
    ['tecnico@sanmarcos.cl', '/tecnico'],
    ['camila@correo.cl', '/dueno'],
  ])('redirige %s a %s', (correo, rutaEsperada) => {
    renderFormulario()
    completarFormulario({ correo })
    enviarFormulario()

    expect(screen.getByTestId('ruta-actual')).toHaveTextContent(rutaEsperada)
  })

  it('10. guarda el correo y el rol en la sesión', () => {
    renderFormulario()
    completarFormulario({
      correo: 'camila@correo.cl',
      clave: CLAVE_DEMO,
    })
    enviarFormulario()

    expect(sessionStorage.getItem('vetEmail')).toBe('camila@correo.cl')
    expect(sessionStorage.getItem('vetRole')).toBe('cliente')
  })
})
