'use client';

import { useEffect, useRef, useState } from 'react';

// Carrusel horizontal con flechas (sin barra de scroll). Se sigue pudiendo deslizar con el
// dedo o el trackpad; las flechas avanzan casi una pantalla y se apagan en los extremos.
export default function CaseCarousel({ children }) {
    const track = useRef(null);
    const [edges, setEdges] = useState({ start: true, end: false });

    useEffect(() => {
        const el = track.current;
        const update = () => setEdges({
            start: el.scrollLeft <= 4,
            end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
        });
        update();
        el.addEventListener('scroll', update, { passive: true });
        // al cargar fotos/videos cambia el ancho total: recalcular (load no burbujea, se escucha en captura)
        el.addEventListener('load', update, true);
        el.addEventListener('loadedmetadata', update, true);
        window.addEventListener('resize', update);
        return () => {
            el.removeEventListener('scroll', update);
            el.removeEventListener('load', update, true);
            el.removeEventListener('loadedmetadata', update, true);
            window.removeEventListener('resize', update);
        };
    }, []);

    const go = (dir) => track.current.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: 'smooth' });

    return (
        <div className="cb-carousel-wrap">
            <div ref={track} className="cb-carousel" tabIndex={0} aria-label="Piezas del proyecto">
                {children}
            </div>
            <div className="cb-carousel__nav">
                <button type="button" className="cb-carousel__arrow" onClick={() => go(-1)} disabled={edges.start} aria-label="Anterior">←</button>
                <button type="button" className="cb-carousel__arrow" onClick={() => go(1)} disabled={edges.end} aria-label="Siguiente">→</button>
            </div>
        </div>
    );
}
