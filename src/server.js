import app from "./app.js";

const PORT = process.env.PORT || 3000; // Puerto predeterminado o configurado en las variables de entorno

/**
 * Inicia el servidor Express en el puerto especificado.
 * 
 * - El puerto puede definirse mediante la variable de entorno `PORT` o, por defecto, será `3000`.
 * - El servidor sirve la API y su documentación en `http://localhost:<PORT>/api/docs`.
 */
app.listen(PORT, () => {
  console.log(`API servida: http://localhost:${PORT}/api/docs`);
});
