import '@testing-library/jest-dom/vitest'

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
