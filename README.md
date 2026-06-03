# Front AMS

Miniaplicacion SPA para compra de dispositivos moviles construida sobre React, Vite y TypeScript.

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

## API y cache

La API base se configura con `VITE_API_BASE`.

```txt
VITE_API_BASE=https://itx-frontend-test.onrender.com
```

Los servicios guardan en cache las respuestas de lectura:

- `GET /api/product`
- `GET /api/product/:id`

La cache vive en `localStorage`, expira tras 1 hora y se invalida automaticamente al leerse
si ha caducado. `POST /api/cart` no se cachea.
