# Veterinaria San Marcos — React (DSY1104 Parcial 2)

Aplicación frontend simulada para la clínica veterinaria **San Marcos** (Rancagua). Catálogo oficial, solicitudes de citas, paneles por rol y CRUD con **localStorage**.

## Tecnologías

React 19, Vite 8, JavaScript, Bootstrap 5, React Bootstrap, React Router 7, Context API, Vitest, Testing Library.

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

Abre la URL que muestra Vite (por defecto `http://localhost:5173`).

## Pruebas y cobertura

```bash
npm run test:run
npm run test:cov
```

Informe HTML en `coverage/index.html`.

## Build y lint

```bash
npm run build
npm run lint
```

## Estructura (Atomic Design)

```text
src/
  components/atoms|molecules|organisms|templates/
  pages/
  data/          # Datos iniciales (Excel)
  services/      # CRUD sin React
  context/       # Estado compartido
  utils/         # Reglas pequeñas (precio, urgencia, validación)
  test/
```

## Funcionalidades

- Inicio, nosotros, contacto, blog, catálogo (31 servicios), categorías, detalle.
- Búsqueda y filtro por categoría.
- Flujo de cita: solicitar → resumen → éxito/error → mis citas.
- Recepción: confirmar o proponer horario.
- Admin: dashboard, CRUD servicios, gestión de citas.
- Login simulado con cuentas demo (rol definido por la cuenta, no por selector libre).

### Cuentas demo (contraseña: `demo123`)

| Correo | Rol |
|--------|-----|
| admin@sanmarcos.cl | Administrador |
| recepcion@sanmarcos.cl | Recepción |
| veterinario@sanmarcos.cl | Veterinario |
| tecnico@sanmarcos.cl | Técnico |
| camila@correo.cl | Dueño de mascota |

## Git

Repositorio: [Vet-San-Marcos-React](https://github.com/DC-mati/Vet-San-Marcos-React)  
Rama de trabajo: **RamaHana** (desde `RamaMatias`).

## Limitaciones

No hay backend ni base de datos real. Los datos persisten solo en el navegador (localStorage / sessionStorage). La autenticación es demostrativa.

## Documentación para la evaluación

Ver carpeta `docs/`:

- `GUIA_ESTUDIANTE.md`
- `GUIA_DEFENSA.md`
- `RECORRIDO_PRUEBAS.md`
- `ARQUITECTURA.md`
- `REQUISITOS_Y_EVIDENCIAS.md`
- `COBERTURA_TESTING.md`
- `PRESENTACION.md`

## Integrantes

Consulta el historial de GitHub del repositorio compartido del equipo.
