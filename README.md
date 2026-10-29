# Veterinaria Castán: sitio web (demo)

Demo del sitio de Veterinaria Castán (Miramar, Buenos Aires), desarrollada por Web Wisse.
Stack: React 19, TypeScript, Vite y Tailwind CSS v4.

## Ejecutar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera la versión final en dist/
npm run preview    # sirve dist/ localmente
```

## Editar el contenido

Todo el contenido editable está en `src/content/site.ts`:

- `whatsappNumber`: número de WhatsApp en formato internacional, solo dígitos. Número de la veterinaria: +54 9 2291 41-1543.
- `address`, `hours`, `emergencies`, `email`: dirección, horarios y datos de contacto.
- `services`: servicios, descripciones y foto de cada uno.
- `team`: perfiles del equipo.
- `sampleReviews`: reseñas de muestra, para reemplazar por las reseñas reales de Google.
- `DEMO_MODE`: con `false` se ocultan las notas de contenido provisional.

Cualquier texto entre corchetes (por ejemplo `[Completar horario]`) se muestra resaltado como contenido pendiente.

## Fotos

Las fotos de `public/img` son ilustrativas (Unsplash) y están en WebP, en dos tamaños cada una (`nombre-ancho.webp`).
Para reemplazarlas, guardar las fotos reales con el mismo nombre y los mismos anchos, o ajustar `imageWidths` en `src/components/ui.tsx`.

## Publicar

`npm run build` genera la carpeta `dist/`, un sitio estático que se puede subir a cualquier hosting (Vercel, Netlify, Hostinger, etc.).
