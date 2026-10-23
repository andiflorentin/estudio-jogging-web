'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { buildRunPath, makeLengthLookup, pickDecoSpots } from '@/lib/runPath';

// Línea que recorre la página interna y se dibuja con el scroll (ref. mindmarket.com).
// A medida que avanza, al costado van apareciendo nubes y stickers de la marca.
// Se monta dentro de <main class="inner-page">.
const DECOS = [
    { src: '/assets/Footer-Sticker SVG/footer-sticker-heart.svg', w: 86 },
    { src: '/assets/VimeoHero SVG/pink-star.svg', w: 64 },
    { src: '/assets/Card-Sticker SVG/sticker-smiley.svg', w: 84 },
    { src: '/assets/Footer-Sticker SVG/footer-sticker-100.svg', w: 96 },
    { src: '/assets/HorizontalWords SVG/horizontal-words-sticker-thumps-up.svg', w: 84 },
    { src: '/assets/Card-Sticker SVG/sticker-camera.svg', w: 84 },
];
const LOOK_AHEAD = 0.7; // la punta de la línea sigue a este % del alto de la pantalla
const INTRO_SPEED = 650; // px por segundo al dibujar la entrada del hero

// shape: entrada del hero (HERO_SHAPES en lib/runPath) · start: en qué adorno de la lista arranca
// heroDecos: adornos fijos del hero [{ src, w, fx, fy }] con posición en fracción de ancho/alto del hero
export default function RunLine({ color = 'azul', shape = 'rulo', start = 0, heroDecos = [] }) {
    const layerRef = useRef(null);

    useEffect(() => {
        const layer = layerRef.current;
        const main = layer.parentElement;
        const svg = layer.querySelector('svg');
        const path = svg.querySelector('path');
        const decoBox = layer.querySelector('.run-line__decos');
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const state = { len: 0 };
        let total = 0;
        let lookup = () => 0;
        let heroLen = 0; // el hero queda siempre dibujado completo
        let spots = []; // [{ el, len, rot, shown }]
        let ready = false;

        const render = () => {
            path.style.strokeDashoffset = total - state.len;
            for (const s of spots) {
                const show = state.len >= s.len;
                if (show === s.shown) continue;
                s.shown = show;
                gsap.to(s.el, show
                    ? { scale: 1, opacity: 1, rotation: s.rot, duration: 0.7, ease: 'back.out(2.2)', overwrite: true }
                    : { scale: 0, opacity: 0, rotation: s.rot - 25, duration: 0.3, ease: 'power2.in', overwrite: true });
            }
        };

        const targetLen = () => Math.max(heroLen, lookup(target()));
        const target = () => window.scrollY + window.innerHeight * LOOK_AHEAD - (main.getBoundingClientRect().top + window.scrollY);

        const build = () => {
            const W = main.clientWidth;
            const H = main.scrollHeight;
            const sections = [...main.children].filter((el) => el !== layer && el.offsetHeight > 40);
            if (!sections.length) return;
            const cuts = sections.slice(1).map((el) => el.offsetTop);
            const endY = H; // la línea sigue de largo por debajo del borde (lo recorta overflow: clip)
            svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
            svg.setAttribute('width', W);
            svg.setAttribute('height', H);
            // Dónde termina el texto del hero (líneas reales de título y bajada) + aire: la línea va a su derecha
            const mainLeft = main.getBoundingClientRect().left;
            const textRange = document.createRange();
            const heroTextRight = Math.max(0, ...[...sections[0].querySelectorAll('.inner-hero__title, .inner-hero__lead')].flatMap((el) => {
                textRange.selectNodeContents(el);
                return [...textRange.getClientRects()].map((r) => r.right - mainLeft);
            }));
            const mobile = W < 768;
            // Desktop: la entrada va a la derecha del texto. Celular: el texto ocupa todo el ancho, así que
            // la entrada usa solo la franja vacía de arriba (hasta la volanta) y sale por el costado antes del texto.
            const safeX = mobile ? 0 : heroTextRight + 90;
            const eyebrow = sections[0].querySelector('.inner-eyebrow');
            const heroBand = mobile && eyebrow ? eyebrow.getBoundingClientRect().top - main.getBoundingClientRect().top - 24 : sections[0].offsetHeight;
            path.setAttribute('d', buildRunPath({ W, heroH: heroBand, cuts, endY, shape, safeX, compact: mobile }));
            total = path.getTotalLength();
            const samples = [];
            for (let len = 0; len <= total; len += 6) {
                const p = path.getPointAtLength(len);
                samples.push({ len, x: p.x, y: p.y });
            }
            lookup = makeLengthLookup(samples);
            path.style.strokeDasharray = total;
            // Oculta lo que todavía no se dibujó (si no, la línea se ve entera hasta que arranca la entrada)
            path.style.strokeDashoffset = total - state.len;

            // Nubes y stickers al costado de los tramos visibles, nunca encima de contenido
            decoBox.innerHTML = '';
            const small = W < 768;
            const mainRect = main.getBoundingClientRect();
            // Textos: se miden las líneas reales (un h1 ocupa todo el ancho como bloque aunque el texto no)
            const range = document.createRange();
            const textRects = [...main.querySelectorAll('h1, h2, h3, p, .inner-eyebrow')].flatMap((el) => {
                range.selectNodeContents(el);
                return [...range.getClientRects()];
            });
            const boxRects = [...main.querySelectorAll('figure, .prose__img, .project-card, .service-row, .find-card, .step-card, .filters, .pill-btn, .cb-carousel-wrap')]
                .map((el) => el.getBoundingClientRect());
            const blockers = [...textRects, ...boxRects]
                .map((r) => ({ l: r.left - mainRect.left, t: r.top - mainRect.top, r: r.right - mainRect.left, b: r.bottom - mainRect.top }));
            // margen de 60px: los textos pueden estar todavía entrando (animación de 50px) cuando se mide
            const PAD = 60;
            const hits = (box) => blockers.some((o) => box.l < o.r + PAD && box.r > o.l - PAD && box.t < o.b + PAD && box.b > o.t - PAD);
            const h = (w) => w * 0.8; // ponytail: alto estimado, los svg son más o menos así de proporción
            const place = (src, w, cx, cy, len) => {
                const box = { l: cx - w / 2, r: cx + w / 2, t: cy - h(w) / 2, b: cy + h(w) / 2 };
                // fuera de la página quedaría cortado: se descarta
                if (box.l < 0 || box.r > W || box.t < 0 || box.b > H - 24) return [];
                if (hits(box)) return [];
                const el = document.createElement('img');
                el.src = src;
                el.alt = '';
                el.className = 'run-line__deco';
                el.style.width = `${w}px`;
                el.style.left = `${cx}px`;
                el.style.top = `${cy}px`;
                decoBox.appendChild(el);
                const rot = gsap.utils.random(-14, 14);
                gsap.set(el, reduce
                    ? { xPercent: -50, yPercent: -50, rotation: rot }
                    : { xPercent: -50, yPercent: -50, scale: 0, opacity: 0, rotation: rot - 25 });
                return [{ el, len, rot, shown: false }];
            };
            const scale = small ? 0.6 : 1;

            // Hero: adornos fijos de la página; aparecen cuando la línea pasa por el punto más cercano
            const heroH = sections[0].offsetHeight;
            const nearestLen = (x, y) => samples.reduce((best, s) => {
                const dist = (s.x - x) ** 2 + (s.y - y) ** 2;
                return dist < best.dist ? { dist, len: s.len } : best;
            }, { dist: Infinity, len: 0 }).len;
            // en celular la franja de arriba es chica: solo el rulo, sin adornos fijos
            const heroSpots = (small ? [] : heroDecos).flatMap(({ src, w, fx, fy }) => {
                const x = fx * W;
                const y = fy * heroH;
                return place(src, w * scale, x, y, nearestLen(x, y));
            });

            // Resto: al costado de los tramos visibles, después del hero
            const heroEnd = (samples.find((s) => s.y > heroH) || samples[samples.length - 1]).len;
            heroLen = heroEnd;
            let n = start;
            const pathSpots = pickDecoSpots(samples, { W, gap: small ? 500 : 700, margin: small ? 40 : 90, startLen: heroEnd }).flatMap((spot) => {
                const deco = DECOS[n % DECOS.length];
                const w = deco.w * scale;
                // corrido hacia afuera de la línea (lado alternado lo decide pickDecoSpots)
                const placed = place(deco.src, w, spot.x + spot.nx * (w * 0.55 + 30), spot.y + spot.ny * (h(w) / 2 + 30), spot.len);
                if (placed.length) n++;
                return placed;
            });
            spots = [...heroSpots, ...pathSpots];
            if (reduce) { path.style.strokeDashoffset = 0; return; }
            if (ready) { state.len = targetLen(); render(); }
        };

        const onScroll = () => {
            if (!ready) return;
            gsap.to(state, { len: targetLen(), duration: 0.45, ease: 'power2.out', overwrite: true, onUpdate: render });
        };

        build();
        if (!reduce) {
            // Entrada: dibuja desde el inicio hasta donde corresponde, a ritmo constante (no en un tiempo
            // fijo: una línea larga iría apurada). Arranca cuando ya entró el título del hero.
            const introLen = targetLen();
            gsap.to(state, {
                len: introLen,
                duration: gsap.utils.clamp(2.4, 4.5, introLen / INTRO_SPEED),
                delay: 0.9,
                ease: 'sine.inOut',
                onUpdate: render,
                onComplete: () => { ready = true; },
            });
            window.addEventListener('scroll', onScroll, { passive: true });
        }
        const ro = new ResizeObserver(() => build());
        ro.observe(main);

        return () => {
            ro.disconnect();
            window.removeEventListener('scroll', onScroll);
            gsap.killTweensOf(state);
        };
    }, []);

    return (
        <div ref={layerRef} className={`run-line run-line--${color}`} aria-hidden="true">
            <svg fill="none"><path /></svg>
            <div className="run-line__decos" />
        </div>
    );
}
