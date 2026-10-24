# Veterinaria San Marcos

Aplicación web para la gestión de servicios veterinarios, solicitudes de citas y administración de la clínica en Rancagua.

Desarrollada con React, Vite y Bootstrap. Incluye interfaz responsive, componentes reutilizables (Atomic Design) y persistencia local en el navegador.

Repositorio: [Vet-San-Marcos-React](https://github.com/DC-mati/Vet-San-Marcos-React)

## Funcionalidades

- Sitio público: inicio, catálogo de servicios, categorías, detalle, blog, contacto
- Búsqueda y filtro por categoría en el catálogo
- Solicitud de citas con validación, resumen y consulta de estado
- Panel de recepción para confirmar citas o proponer otro horario
- Panel de administración con CRUD de servicios y gestión de citas
- Acceso por roles con cuentas de demostración

## Tecnologías

- React 19 y Vite 8
- JavaScript (JSX)
- Bootstrap 5 y React Bootstrap
- React Router DOM
- Context API
- Vitest y Testing Library

## Requisitos

- Node.js 18 o superior recomendado
- npm

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

Abre la URL que indica Vite (habitualmente `http://localhost:5173`).

En PowerShell, si `npm` falla por políticas de scripts, usa:

```bash
npm.cmd run dev
```

## Pruebas

```bash
npm run test:run
npm run test:cov
```

El informe de cobertura HTML se genera en `coverage/index.html` (carpeta ignorada por Git).

## Build y lint

```bash
npm run build
npm run lint
```

## Cuentas de demostración

Contraseña común: `demo123`

| Correo | Rol |
|--------|-----|
| admin@sanmarcos.cl | Administrador |
| recepcion@sanmarcos.cl | Recepción |
| veterinario@sanmarcos.cl | Veterinario |
| tecnico@sanmarcos.cl | Técnico |
| camila@correo.cl | Cliente |

## Estructura del proyecto

```text
src/
  components/   # Átomos, moléculas, organismos, plantillas
  pages/        # Pantallas por ruta
  data/         # Datos iniciales del catálogo
  services/     # Operaciones CRUD (sin JSX)
  context/      # Estado compartido
  utils/        # Validaciones, formato de precios, reglas de negocio
  test/         # Configuración de pruebas
```

## Notas

Los datos de trabajo se guardan en `localStorage` del navegador. No hay servidor backend en este repositorio. La autenticación por correo y contraseña demo sirve para probar roles en la interfaz.
