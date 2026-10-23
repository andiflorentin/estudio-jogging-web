import fs from 'fs';
import path from 'path';

// Server-only (build time): lista los archivos de public/media/proyectos/<slug>.
// ponytail: leer la carpeta evita mantener listas de imágenes a mano; agregar una imagen = soltarla en la carpeta.
export function getMedia(slug) {
    const dir = path.join(process.cwd(), 'public', 'media', 'proyectos', slug);
    if (!fs.existsSync(dir)) return { cover: null, galeria: [] };
    const files = fs.readdirSync(dir).filter((f) => /\.(webp|jpe?g|png|gif|mp4|webm)$/i.test(f)).sort();
    const url = (f) => `/media/proyectos/${slug}/${f}`;
    const coverFile = files.find((f) => f.startsWith('cover-'));
    return {
        cover: coverFile ? url(coverFile) : null,
        galeria: files.filter((f) => f !== coverFile).map(url),
    };
}
