'use client';

import { useRef, useState } from 'react';
import CaseCarousel from '@/components/CaseCarousel';
import CaseVideo from '@/components/CaseVideo';
import { REELS } from '@/lib/reels';

// Carrusel de reels (mix de proyectos). Se usa en /proyectos y en la home, antes del footer.
// Click en un reel: se abre grande en un <dialog> nativo (Esc y click afuera lo cierran) con título y descripción.
export default function ReelsSection({ title = 'Más piezas en movimiento.' }) {
    const dialogRef = useRef(null);
    const videoRef = useRef(null);
    const [idx, setIdx] = useState(null); // reel abierto (índice en REELS)
    const open = idx === null ? null : REELS[idx];

    const show = (i) => {
        setIdx(i);
        dialogRef.current.showModal();
        window.__lenis?.stop(); // la página de atrás no scrollea mientras está abierto
        // el reel abierto suena; los del carrusel se silencian (CaseVideo escucha este evento)
        requestAnimationFrame(() => window.dispatchEvent(new CustomEvent('case-video-sound', { detail: videoRef.current })));
    };
    const close = () => dialogRef.current.close();
    // flechas: siguen con el reel anterior/siguiente, dando la vuelta al llegar a la punta
    const step = (d) => setIdx((i) => (i + d + REELS.length) % REELS.length);

    return (
        <section className="wrap section reels">
            <div className="section-head" data-reveal>
                <span className="inner-eyebrow">Reels</span>
                <h2 className="section-title section-title--wide">{title}</h2>
            </div>
            <CaseCarousel>
                {REELS.map((r, i) => (
                    <CaseVideo key={r.src} src={`/media/reels/${r.src}.mp4`} poster={`/media/reels/${r.src}.jpg`} label={r.cliente} className="cb-carousel__item" onOpen={() => show(i)} />
                ))}
            </CaseCarousel>

            <dialog
                ref={dialogRef}
                className="reel-modal"
                aria-label={open ? `${open.cliente}: ${open.titulo}` : 'Reel'}
                onClick={(e) => { if (e.target === dialogRef.current) close(); }}
                onClose={() => { videoRef.current?.pause(); setIdx(null); window.__lenis?.start(); }}
                onKeyDown={(e) => { if (e.target.tagName === 'VIDEO') return; if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); }}
            >
                {open && (
                    <div className="reel-modal__inner">
                        <video ref={videoRef} key={open.src} src={`/media/reels/${open.src}.mp4`} poster={`/media/reels/${open.src}.jpg`} autoPlay loop playsInline controls />
                        <div className="reel-modal__info">
                            <span className="inner-eyebrow">{open.cliente}</span>
                            <h3>{open.titulo}</h3>
                            <p>{open.texto}</p>
                            <div className="reel-modal__nav">
                                <button type="button" className="cb-carousel__arrow" onClick={() => step(-1)} aria-label="Reel anterior">←</button>
                                <button type="button" className="cb-carousel__arrow" onClick={() => step(1)} aria-label="Reel siguiente">→</button>
                            </div>
                        </div>
                        <button type="button" className="reel-modal__close" onClick={close} aria-label="Cerrar">×</button>
                    </div>
                )}
            </dialog>
        </section>
    );
}
