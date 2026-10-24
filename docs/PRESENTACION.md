# Presentación (~15 min + 5 preguntas, Guía 16)

## 1. Negocio (2 min)

Veterinaria San Marcos, Rancagua. Problema: citas y catálogo dispersos. Solución: web React simulada.

## 2. Arquitectura (3 min)

Atomic Design, services, context, localStorage. Mostrar árbol en `ARQUITECTURA.md`.

## 3. Demo en vivo (6 min)

- Inicio y catálogo con búsqueda.
- Detalle de servicio.
- Solicitud de cita completa.
- Mis citas.
- Login recepción → confirmar.
- Admin CRUD servicio.

## 4. Código clave (2 min)

- `serviciosService.js` (CRUD).
- `FormularioSolicitudCita.jsx` (validación).
- `calcularPrecioUrgencia.js` (regla de negocio).

## 5. Pruebas (2 min)

`npm run test:run` — 27 pruebas. Mostrar un test de service y uno de login.

## Preguntas individuales (ejemplos)

- ¿Por qué Context y no Redux? → Curso pide Context; es más simple de explicar.
- ¿Dónde persisten los datos? → localStorage, claves `vet_data_*`.
- ¿Cómo conectar backend después? → Reemplazar services por fetch manteniendo la misma interfaz.

## Cierre

Limitaciones: sin backend real, auth demo. Trabajo en rama **RamaHana**.
