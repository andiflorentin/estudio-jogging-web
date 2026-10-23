// Hero de color pleno para páginas internas (ref. mindmarket.com).
export default function InnerHero({ color = 'azul', eyebrow, title, lead, children }) {
    const dark = color === 'azul' || color === 'rojo';
    return (
        <section className={`inner-hero inner-hero--${color}`} {...(dark ? { 'data-nav-dark': '' } : {})}>
            <div className="inner-hero__content wrap">
                <span className="inner-eyebrow" data-hero-in>{eyebrow}</span>
                <h1 className="inner-hero__title" data-hero-in>{title}</h1>
                {lead && <p className="inner-hero__lead" data-hero-in>{lead}</p>}
                {children}
            </div>
        </section>
    );
}
