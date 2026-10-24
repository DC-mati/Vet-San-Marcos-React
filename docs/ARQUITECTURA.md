# Arquitectura

## Carpetas

- `pages/` — una pantalla por ruta.
- `components/` — UI reutilizable (Atomic Design).
- `data/catalogoInicial.js` — 31 servicios + 22 medicamentos (semilla).
- `services/` — CRUD puro JavaScript.
- `context/` — puente React ↔ services.
- `utils/` — funciones pequeñas (precio, urgencia, validación).

## Flujo de datos (servicios)

```text
ServiciosPage → useServicios() → serviciosService → localStorage
                     ↑__________________________________|
```

## Flujo de citas

```text
ConfirmacionCitaPage → useCitas().solicitar → citasService → localStorage
MisCitasPage → lee mismo storage filtrado por correo
```

## Rutas principales

| Ruta | Página |
|------|--------|
| `/servicios` | Catálogo |
| `/solicitar-cita` | Formulario |
| `/mis-citas` | Consulta dueño |
| `/recepcion` | Gestión recepción |
| `/admin/servicios` | CRUD |
