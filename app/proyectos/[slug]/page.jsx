import InnerPage from '@/components/InnerPage';
import InnerCta from '@/components/InnerCta';
import Media from '@/components/Media';
import CaseBlock from '@/components/CaseBlock';
import { PROYECTOS } from '@/lib/proyectos';
import { getMedia } from '@/lib/media';

export const dynamicParams = false;

export function generateStaticParams() {
    return PROYECTOS.map((p) => ({ slug: p.slug }));
}

const find = (slug) => PROYECTOS.find((p) => p.slug === slug);

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const p = find(slug);
    return {
        title: `${p.cliente} — ${p.titulo} — Estudio Jogging`,
        description: p.texto[0],
        keywords: p.keywords,
    };
}

export default async function Proyecto({ params }) {
    const { slug } = await params;
    const p = find(slug);
    const i = PROYECTOS.indexOf(p);
    const next = PROYECTOS[(i + 1) % PROYECTOS.length];
    const { cover, galeria } = getMedia(slug);
    const nextCover = getMedia(next.slug).cover;
    // ponytail: 4 placeholders cuando todavía no hay imágenes cargadas
    const items = galeria.length ? galeria : [null, null, null, null];
    const bloques = p.bloques?.length ? p.bloques : null;
    const base = `/media/proyectos/${slug}`;
    const dark = p.color === 'azul' || p.color === 'rojo';
    const relato = bloques?.[0].tipo === 'relato';
    const descripcion = (
        <>
            <dl className="case__meta" data-reveal>
                <dt>Cliente</dt><dd>{p.cliente}</dd>
                <dt>Lugar</dt><dd>{p.lugar}</dd>
                {p.fecha && <><dt>Fecha</dt><dd>{p.fecha}</dd></>}
                <dt>Técnica</dt><dd><ul className="chips">{p.tecnica.map((t) => <li key={t}>{t}</li>)}</ul></dd>
            </dl>
            <div className="case__text">
                {p.texto.map((t) => <p key={t} className="case__lead" data-reveal>{t}</p>)}
            </div>
        </>
    );

    // con relato, el título va dentro de la tarjeta, arriba del texto (como el visor de reels)
    const heading = (
        <div className="cb-relato__head">
            <span className="inner-eyebrow">{p.cliente}</span>
            <h1 className="cb-relato__title">{p.titulo}</h1>
        </div>
    );

    return (
        <InnerPage>
            <article className="case">
                <header className={`case__band${relato ? ' case__band--short' : ''} inner-hero--${p.color}`} {...(dark ? { 'data-nav-dark': '' } : {})}>
                    <div className="wrap">
                        <a href="/proyectos" className="case__back" data-hero-in>← Proyectos</a>
                        {!relato && <>
                            <span className="inner-eyebrow" data-hero-in>{p.cliente}</span>
                            <h1 className="inner-hero__title" data-hero-in>{p.titulo}</h1>
                        </>}
                    </div>
                </header>

                <div className="wrap">
                    {/* Con bloques, el primero ocupa el lugar de la portada. Si es un "relato",
                        la descripción va dentro de ese bloque, al lado del video. */}
                    {bloques ? (
                        <div className="case__hero-block" data-hero-in>
                            <CaseBlock b={bloques[0]} base={base}>{relato && <>{descripcion}{heading}</>}</CaseBlock>
                        </div>
                    ) : (
                        <div className="case__hero" data-hero-in>
                            <Media src={cover} alt={`${p.cliente} — ${p.titulo}`} label="portada próximamente" />
                        </div>
                    )}

                    {!relato && <div className="case__body">{descripcion}</div>}

                    {p.nota && (
                        <blockquote className={`case__nota case__nota--${p.color}`} data-reveal>
                            <img src="/assets/VimeoHero SVG/pink-star.svg" alt="" aria-hidden="true" />
                            <p>{p.nota}</p>
                        </blockquote>
                    )}

                    {bloques ? (
                        <div className="case__blocks">
                            {bloques.slice(1).map((b, n) => <CaseBlock key={n} b={b} base={base} />)}
                        </div>
                    ) : (
                        <div className="case__gallery">
                            {items.map((src, n) => (
                                <div key={src || n} className="case__img-wrap" data-reveal>
                                    <Media src={src} alt={`${p.cliente} ${n + 1}`} className="case__img" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <a href={`/proyectos/${next.slug}`} className={`case__next inner-hero--${next.color}`} {...(next.color === 'azul' || next.color === 'rojo' ? { 'data-nav-dark': '' } : {})}>
                    <div className="wrap case__next-inner">
                        <div>
                            <span className="inner-eyebrow">Siguiente proyecto</span>
                            <strong>{next.cliente}</strong>
                            <em>{next.titulo} →</em>
                        </div>
                        <div className="case__next-thumb"><Media src={nextCover} alt={next.cliente} label="próximamente" /></div>
                    </div>
                </a>
            </article>
            <InnerCta title="¿Hacemos algo así para tu marca?" />
        </InnerPage>
    );
}
