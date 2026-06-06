# Front AMS

Miniaplicacion SPA para compra de dispositivos moviles construida con React, Vite y TypeScript.

## Scripts

```bash
npm run start
npm run dev
npm run build
npm run lint
npm run test
npm run preview
```

- `start`: alias de `npm run dev`.
- `dev`: levanta Vite en modo desarrollo.
- `build`: compila TypeScript y genera la build de produccion.
- `lint`: ejecuta ESLint.
- `test`: ejecuta la suite de Vitest.
- `preview`: sirve la build generada por Vite.

## Rutas

- `/`: Product List Page con busqueda por marca/modelo, paginacion en cliente y compra rapida desde cada card.
- `/product/:id`: Product Details Page con breadcrumb, caracteristicas, selector de almacenamiento/color y accion de carrito.
- `*`: pagina 404 con enlace de vuelta al listado.

## API

La API base se configura con `VITE_API_BASE`.

```txt
VITE_API_BASE=https://itx-frontend-test.onrender.com
```

Endpoints usados:

- `GET /api/product`
- `GET /api/product/:id`
- `POST /api/cart`

## Estrategia de cache

Se cachean en cliente las respuestas de lectura:

- Listado de productos (`GET /api/product`).
- Detalle de producto (`GET /api/product/:id`).

La cache vive en `localStorage` y cada entrada tiene una validez de 1 hora.

Cuando una entrada no ha expirado, se devuelve directamente desde cache. Cuando una entrada ha expirado, la aplicacion usa una estrategia tipo `stale-while-revalidate`: si existe dato cacheado pero esta caducado, se muestra temporalmente y se lanza una revalidacion contra el API para actualizar la cache.

Si la respuesta nueva cambia respecto a la guardada, se actualiza la vista abierta. Si la respuesta es igual, solo se renueva la cache durante otra hora. Si la revalidacion falla, se conserva el dato anterior y se evita romper la UI con un error mientras existe contenido usable.

`POST /api/cart` no se cachea.

## Carrito

El contador del carrito se guarda en `localStorage` y se rehidrata al iniciar la aplicacion. Al anadir un producto se envia `id`, `colorCode` y `storageCode` a `POST /api/cart`; el `count` devuelto por la API actualiza el contador del Header.

La compra puede hacerse desde:

- La PDP, seleccionando opciones y pulsando anadir.
- Las cards de la PLP mediante el icono de carrito, que abre un modal con las opciones reales del producto.
