# NutriLens

App web de registro nutricional: identifica alimentos por foto o texto, calcula tus metas de calorías/macros/vitaminas según tu perfil, y da seguimiento histórico con gráficas.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser público o privado con Pages habilitado en un plan que lo permita).
2. Sube estos 4 archivos a la raíz del repo (o a una carpeta `/docs`):
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon.svg`
3. En el repo: **Settings → Pages → Source**, selecciona la rama (`main`) y la carpeta (`/root` o `/docs` según dónde los subiste).
4. Espera 1-2 minutos y tu app quedará en `https://tu-usuario.github.io/tu-repo/`.
5. Ábrela desde tu celular y usa "Agregar a pantalla de inicio" (Android/Chrome) o "Compartir → Agregar a inicio" (iPhone/Safari) para que se comporte como app instalada.

## Notas técnicas

- El análisis de fotos y texto usa la API de Anthropic directamente desde el navegador — no necesitas backend ni API key propia mientras la app corra dentro de un artifact/entorno de Claude. **Si la despliegas en GitHub Pages de forma standalone, esa llamada `fetch` a `api.anthropic.com` no funcionará sin que tú conectes tu propia API key**, porque fuera del entorno de Claude no hay autenticación automática. Para producción real necesitarías:
  - Un pequeño backend/proxy (ej. Cloudflare Worker o función serverless) que reciba la imagen del navegador, llame a la API de Anthropic con tu API key guardada de forma segura, y regrese el resultado.
  - Nunca pongas tu API key directamente en el HTML/JS público — cualquiera podría verla y usarla.
- Los datos (perfil, registros diarios, peso) se guardan localmente en el almacenamiento del entorno donde corra la app. Si migras a GitHub Pages puro, deberás reemplazar `window.storage` por `localStorage`, IndexedDB, o una base de datos remota (ej. Supabase/Firebase) si quieres respaldo en la nube.
- El ícono (`icon.svg`) es funcional pero básico; para una instalación PWA 100% conforme en todos los navegadores, lo ideal es agregar también íconos PNG de 192x192 y 512x512.
