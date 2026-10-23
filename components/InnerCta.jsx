// Bloque de cierre con llamada a la acción, compartido por las páginas internas.
// wide: título largo en menos líneas (letra un poco más chica)
export default function InnerCta({ title = '¿Empezamos algo juntos?', text = 'Contanos qué tenés en mente. Te respondemos rápido.', wide = false }) {
    return (
        <section className={`inner-cta${wide ? ' inner-cta--wide' : ''}`} data-nav-dark="">
            <img src="/assets/Footer-Sticker SVG/footer-sticker-boom.svg" alt="" aria-hidden="true" className="inner-cta__sticker inner-cta__sticker--a" />
            <img src="/assets/VimeoHero SVG/smiley-face.svg" alt="" aria-hidden="true" className="inner-cta__sticker inner-cta__sticker--b" />
            <h2 className="inner-cta__title" data-reveal>{title}</h2>
            <p className="inner-cta__text" data-reveal>{text}</p>
            <div className="inner-cta__actions" data-reveal>
                <a href="mailto:estudiojogging@gmail.com" className="pill-btn pill-btn--light">Escribinos <span aria-hidden="true">→</span></a>
                <a href="/proyectos" className="pill-btn pill-btn--ghost">Ver proyectos</a>
            </div>
        </section>
    );
}
