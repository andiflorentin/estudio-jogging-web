'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/horizontal-words.css';

gsap.registerPlugin(ScrollTrigger);

const PHRASE = "A tiempos rápidos, movimientos suaves.";

const HorizontalWords = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = sectionRef.current;
            const textRef = container.querySelector('.horizontal-words__relative');
            const letters = container.querySelectorAll('.letter');

            // Select the individual stickers instead of just the wrapper
            // or we select the images directly if they are the elements we want to animate.
            // The original logic animated .horizontal-words__sticker-svg, but since you have multiple images:
            const stickers = container.querySelectorAll('.horizontal-words__sticker-watch, .horizontal-words__sticker-cursor, .horizontal-words__sticker-phone');

            // Note: To animate SVG paths with strokeDashoffset, the SVG must be inlined in the HTML,
            // not loaded via <img> tags. The current setup uses <img> tags, so direct path animation
            // as written below will not work unless the SVGs are converted to inline <svg> elements.
            // For the purpose of this exercise, we'll assume the intent is for inline SVGs or
            // that the querySelectorAll will find nothing and the animation will gracefully skip.
            const arrows = container.querySelectorAll('.horizontal-words__arrow-svg path, .horizontal-words__arrow-end-svg path');

            // ScrollTween — phrase slides in from the right and RESTS in view (no full exit).
            // Measured from real geometry so it works regardless of phrase length.
            const h2El = container.querySelector('.horizontal-words__h2');
            gsap.set(textRef, { x: 0, xPercent: 0 });
            const vw = window.innerWidth;
            const h2Rect = h2El.getBoundingClientRect();
            const startX = vw - h2Rect.left;          // phrase begins just off the right edge
            const endX = vw * 0.42 - h2Rect.right;    // ends with the phrase tail resting ~42% from left
            // ponytail: 0.42 is the resting frame; nudge if the tail should sit further left/right.

            const scrollTween = gsap.fromTo(textRef, {
                x: startX
            }, {
                x: endX,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: "top top", // Begin the pinning when the container reaches the top
                    end: "+=3000", // The scroll duration distance
                    scrub: 1,
                    pin: true
                }
            });

            // Bounce each letter randomly
            letters.forEach((letter) => {
                gsap.from(letter, {
                    yPercent: (Math.random() - 0.5) * 500,
                    rotation: (Math.random() - 0.5) * 60,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: letter,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        end: 'left 10%',
                        scrub: 0.5
                    }
                });
            });

            // Bounce stickers
            stickers.forEach((sticker) => {
                gsap.from(sticker, {
                    scale: 0,
                    yPercent: (Math.random() - 0.5) * 400,
                    rotation: (Math.random() - 0.5) * 60,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: sticker,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        end: 'left 10%',
                        scrub: 0.5
                    }
                });
            });

            // Animate Drawing SVG Arrows (Custom stroke-dashoffset alternative to DrawSVGPlugin)
            arrows.forEach((arrowPath) => {
                if (arrowPath.getTotalLength) {
                    const pathLen = arrowPath.getTotalLength();
                    gsap.set(arrowPath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                    gsap.to(arrowPath, {
                        strokeDashoffset: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: arrowPath.parentElement, // trigger on the SVG itself
                            containerAnimation: scrollTween,
                            start: 'left 90%',
                            end: 'left 30%',
                            scrub: 0.5
                        }
                    });
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="horizontal-words-section content-section">
            <div className="horizontal-words__relative">
                <div className="horizontal-words__sticker-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 386 127" fill="none" className="horizontal-words__arrow-svg"><path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path><path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path></svg>
                    <img src="/assets/HorizontalWords%20SVG/JOGGING_Pantaloncitos.svg" alt="" className="horizontal-words__sticker-watch" />
                    <img src="/assets/HorizontalWords%20SVG/JOGGING_1_Pantaloncitos.svg" alt="" className="horizontal-words__sticker-cursor" />
                    <img src="/assets/HorizontalWords%20SVG/JOGGING_2_Pantaloncitos.svg" alt="" className="horizontal-words__sticker-phone" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 140 127" fill="none" className="horizontal-words__arrow-end-svg"><path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.437 125.078L99.6875 107.891" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path><path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.438 125.078L137.969 110.234" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path></svg>

                    <h2 className="display horizontal-words__h2" aria-label={PHRASE}>
                        {PHRASE.split("").map((char, i) =>
                            char === " " ? " " : (
                                <div key={i} className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>{char}</div>
                            )
                        )}
                    </h2>
                </div>
            </div>

            <div className="horizontal-words__bottom-text">
                <div className="horizontal-words__bottom-text-l">
                    Somos un equipo creativo en movimiento que articula diseño, comunicación y tecnología 3D. Aportamos talento profesional a marcas que buscan coherencia, estética y ese "no sé qué" editorial.
                </div>
            </div>
        </section>
    );
};

export default HorizontalWords;
