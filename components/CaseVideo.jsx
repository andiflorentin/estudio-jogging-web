'use client';

import { useEffect, useRef, useState } from 'react';

// Video de un proyecto: arranca solo (sin sonido) cuando entra en pantalla y se pausa al salir.
// El botón activa el audio; si otro video tenía sonido, ese se silencia.
// onOpen (opcional): click en el video (no en el botón de sonido) lo abre en grande
export default function CaseVideo({ src, poster, label, className = '', onOpen }) {
    const ref = useRef(null);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        const v = ref.current;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !reduce) v.play().catch(() => {});
            else if (!e.isIntersecting) v.pause();
        }, { threshold: 0.1 }); // bajo a propósito: dentro de un carrusel el navegador cuenta el recorte del contenedor
        io.observe(v);
        const onOther = (e) => {
            if (e.detail !== v) { v.muted = true; setMuted(true); }
        };
        window.addEventListener('case-video-sound', onOther);
        return () => { io.disconnect(); window.removeEventListener('case-video-sound', onOther); };
    }, []);

    const toggleSound = () => {
        const v = ref.current;
        v.muted = !v.muted;
        setMuted(v.muted);
        if (!v.muted) {
            window.dispatchEvent(new CustomEvent('case-video-sound', { detail: v }));
            v.play().catch(() => {});
        }
    };

    return (
        <figure className={`case-video ${className}`}>
            <div
                className={`case-video__frame${onOpen ? ' case-video__frame--open' : ''}`}
                {...(onOpen && {
                    role: 'button',
                    tabIndex: 0,
                    'aria-label': `Ver ${label || 'video'}`,
                    onClick: (e) => { if (!e.target.closest('.case-video__sound')) onOpen(); },
                    onKeyDown: (e) => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onOpen(); } },
                })}
            >
                <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} />
                <button type="button" className="case-video__sound" onClick={toggleSound} aria-pressed={!muted} aria-label={muted ? 'Activar sonido' : 'Silenciar'}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
                        {muted
                            ? <path d="m16 9 5 6M21 9l-5 6" />
                            : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
                    </svg>
                </button>
            </div>
            {label && <figcaption>{label}</figcaption>}
        </figure>
    );
}
