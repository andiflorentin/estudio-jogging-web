'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Animaciones de las páginas internas, por atributo:
//   [data-hero-in]  entra al cargar (stagger)
//   [data-reveal]   fade + subida al entrar en pantalla
//   [data-words]    las palabras se encienden con el scroll (manifiesto)
//   [data-speed]    parallax suave (valor = fracción del scroll)
//   [data-hover-list] filas que muestran una imagen que sigue al cursor
export default function InnerFx() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const cleanups = [];

        const ctx = gsap.context(() => {
            // Manifiesto: partir en palabras (siempre, así el texto final queda igual con o sin motion)
            document.querySelectorAll('[data-words]').forEach((el) => {
                if (el.dataset.split) return;
                el.dataset.split = '1';
                el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="word">${w}</span>`).join(' ');
            });

            if (reduce) return;

            gsap.from('[data-hero-in]', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.1 });

            // Stickers: entran con un pop al llegar a pantalla. Los que flotan con CSS usan la clase
            // .pop → .is-in (propiedades scale/rotate, no pisan su keyframe de transform); los que tienen
            // parallax (data-speed) ya son de GSAP, así que el pop va por GSAP.
            const pops = gsap.utils.toArray('.panel__deco, .inner-cta__sticker, .step-card__sticker, .case__nota img');
            pops.forEach((el) => (el.dataset.speed ? gsap.set(el, { scale: 0 }) : el.classList.add('pop')));
            ScrollTrigger.batch(pops, {
                start: 'top 92%',
                once: true,
                onEnter: (els) => els.forEach((el, i) => {
                    if (el.dataset.speed) {
                        gsap.to(el, { scale: 1, duration: 0.7, ease: 'back.out(2.2)', delay: i * 0.08 });
                    } else {
                        el.style.transitionDelay = `${i * 0.08}s`;
                        el.classList.add('is-in');
                    }
                }),
            });

            ScrollTrigger.batch('[data-reveal]', {
                start: 'top 88%',
                once: true,
                onEnter: (els) => gsap.fromTo(els, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1 }),
            });
            gsap.set('[data-reveal]', { opacity: 0 });

            document.querySelectorAll('[data-words]').forEach((el) => {
                gsap.fromTo(el.querySelectorAll('.word'), { opacity: 0.15 }, {
                    opacity: 1, stagger: 0.1, ease: 'none',
                    scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
                });
            });

            document.querySelectorAll('[data-speed]').forEach((el) => {
                const speed = parseFloat(el.dataset.speed);
                gsap.to(el, {
                    yPercent: speed * -100, ease: 'none',
                    scrollTrigger: { trigger: el.closest('section') || el, start: 'top top', end: 'bottom top', scrub: true },
                });
            });

            document.querySelectorAll('[data-hover-list]').forEach((list) => {
                const preview = list.querySelector('.hover-preview');
                if (!preview) return;
                const img = preview.querySelector('img');
                const xTo = gsap.quickTo(preview, 'x', { duration: 0.5, ease: 'power3.out' });
                const yTo = gsap.quickTo(preview, 'y', { duration: 0.5, ease: 'power3.out' });
                const onMove = (e) => {
                    const r = list.getBoundingClientRect();
                    xTo(e.clientX - r.left);
                    yTo(e.clientY - r.top);
                };
                const rows = list.querySelectorAll('[data-img]');
                const onEnter = (e) => {
                    // data-img puede traer varias imágenes separadas por |: cada pasada muestra la siguiente
                    const row = e.currentTarget;
                    const list = row.dataset.img.split('|');
                    const n = Number(row.dataset.imgIndex || 0);
                    img.src = list[n % list.length];
                    row.dataset.imgIndex = n + 1;
                    gsap.to(preview, { scale: 1, opacity: 1, rotation: gsap.utils.random(-6, 6), duration: 0.4, ease: 'back.out(1.6)' });
                };
                const onLeave = () => gsap.to(preview, { scale: 0.6, opacity: 0, duration: 0.3 });
                list.addEventListener('mousemove', onMove);
                list.addEventListener('mouseleave', onLeave);
                rows.forEach((r) => r.addEventListener('mouseenter', onEnter));
                cleanups.push(() => {
                    list.removeEventListener('mousemove', onMove);
                    list.removeEventListener('mouseleave', onLeave);
                    rows.forEach((r) => r.removeEventListener('mouseenter', onEnter));
                });
            });

            // Tira de fotos: se desliza en horizontal con el scroll
            // en celular la tira se desliza con el dedo (CSS), no con el scroll
            if (!window.matchMedia('(max-width: 768px)').matches) document.querySelectorAll('[data-drift]').forEach((el) => {
                gsap.fromTo(el, { xPercent: 0 }, {
                    xPercent: parseFloat(el.dataset.drift), ease: 'none',
                    scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
                });
            });
        });

        return () => { ctx.revert(); cleanups.forEach((fn) => fn()); };
    }, []);

    return null;
}
