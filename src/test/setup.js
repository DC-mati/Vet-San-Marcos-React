import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach } from 'vitest'

/**
 * Vitest corre en jsdom (Node), no comparte localStorage con el navegador de desarrollo.
 * Limpiamos almacenamiento simulado en cada prueba para que overrides de cuentas demo
 * (por ejemplo desactivar camila@correo.cl) no queden entre archivos de test.
 */
beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

afterEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

// jsdom no implementa scrollTo, lo usamos al cambiar de ruta
window.scrollTo = () => {}

// react-bootstrap Offcanvas usa matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
})
