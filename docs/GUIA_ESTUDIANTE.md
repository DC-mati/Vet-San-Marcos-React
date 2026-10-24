# Guía para estudiantes — Veterinaria San Marcos

Esta guía explica el proyecto con palabras simples y ejemplos reales del código.

## 1. React y Vite

- **React** dibuja la interfaz con componentes.
- **Vite** inicia el servidor de desarrollo y compila el proyecto.
- Entrada: `src/main.jsx` monta `<App />` dentro de `#root`.

## 2. JSX

JSX mezcla HTML y JavaScript. Ejemplo en `TarjetaServicio.jsx`: recibe `servicio` por props y muestra nombre y precio.

## 3. Componentes y props

Un componente es una función que devuelve JSX. **Props** son datos que el padre envía al hijo.

## 4. Estado (`useState`)

Cuando el usuario escribe en un formulario, guardamos el valor en estado local. Ver `FormularioSolicitudCita.jsx`.

## 5. Context (`useContext`)

**Context** comparte datos entre muchas pantallas sin pasar props en cadena.

- `ServiciosContext` → lista de servicios actualizada.
- `CitasContext` → citas y solicitudes.
- `AuthContext` → usuario logeado.

Flujo típico:

1. El usuario hace clic en guardar.
2. La página llama a una función del Context.
3. El Context llama al **service** (CRUD).
4. El service escribe en **localStorage**.
5. El Context recarga la lista y React actualiza la vista.

## 6. Atomic Design

| Nivel | Carpeta | Ejemplo |
|-------|---------|---------|
| Átomo | `atoms/` | `EtiquetaEstadoCita` |
| Molécula | `molecules/` | `TarjetaServicio` |
| Organismo | `organisms/` | `ListaServicios` |
| Plantilla | `templates/` | `PlantillaPublica` |
| Página | `pages/` | `ServiciosPage.jsx` |

## 7. React Router

`App.jsx` define rutas: `/servicios`, `/solicitar-cita`, `/admin`, etc.

## 8. Services (CRUD)

Los CRUD viven en `src/services/`, sin JSX. Ejemplo: `serviciosService.js` → `crearServicio`, `eliminarServicio`.

## 9. localStorage

Simula una base de datos en el navegador. Claves en `utils/storage.js` (`vet_data_services`, `vet_data_appointments`).

## 10. Vitest y Testing Library

Pruebas junto al código (`*.test.js`). Comando: `npm run test:run`.

## 11. Regla de urgencia

`utils/calcularPrecioUrgencia.js` suma **$10.000** una sola vez si la consulta de urgencia es fuera de horario.
