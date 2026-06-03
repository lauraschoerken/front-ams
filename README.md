# Front AMS

Miniaplicacion SPA para compra de dispositivos moviles construida sobre React, Vite y TypeScript.

## Estado actual

Bloque 1 completado:

- Rutas SPA base:
  - `/` para el listado de productos.
  - `/product/:id` para el detalle de producto.
- Layout principal con Header y Breadcrumbs.
- El logo/titulo del Header navega a `/`.
- Navegacion principal hacia productos.
- Placeholder inicial para el contador de carrito en Header.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

El proyecto conserva los nombres existentes. `dev` levanta Vite en modo desarrollo y `build`
compila TypeScript y genera la build de produccion.

## Estructura prevista

```txt
src/
  components/
    Products/
      components/
      containers/
    elements/
      Breadcrumbs/
  layouts/
  navigation/
  services/
  storage/
  models/
```

Los siguientes bloques incorporaran la capa API, cache cliente, PLP, PDP, carrito y tests.
