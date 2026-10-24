import '@testing-library/jest-dom/vitest'

// jsdom no implementa scrollTo, lo usamos al cambiar de ruta
window.scrollTo = () => {}
