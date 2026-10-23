import InnerPage from '@/components/InnerPage';
import InnerHero from '@/components/InnerHero';
import InnerCta from '@/components/InnerCta';
import RunLine from '@/components/RunLine';

export const metadata = {
    title: 'Nosotros — Estudio Jogging',
    description: 'Somos un equipo creativo en movimiento que articula diseño, comunicación y tecnología 3D.',
};

const FOTOS = [
    { src: '/assets/Equipo/equipo-1.jpg', tag: '404: aburrimiento not found', color: 'rosa' },
    { src: '/assets/Equipo/nosotros-3.jpg', tag: 'creatividad > algoritmo', color: 'naranja' },
    { src: '/assets/Equipo/nosotros-5.jpg', tag: 'renderizando ideas locas...', color: 'rojo' },
    { src: '/assets/Equipo/nosotros-6.jpg', tag: 'sin filtros', color: 'azul' },
];

// "En Estudio Jogging vas a encontrar..." partido en tarjetas.
const ENCONTRAR = [
    { t: 'Una jam creativa', d: 'sostenida por la confianza.', color: 'rosa', ilu: '/assets/ilus/jam-creativa-v3.webp', centro: true },
    { t: 'Un ensamble', d: 'de profesionales integrados.', color: 'naranja', ilu: '/assets/ilus/un-ensamble-v5.webp', centro: true },
    { t: 'Una revista', d: 'que apela a la curiosidad.', color: 'azul', ilu: '/assets/ilus/una-revista-v2.webp' },
    { t: 'Una vidriera', d: 'para la inspiración y una mesa de trabajo que potencia el talento a un ritmo constante.', color: 'crema', ilu: '/assets/ilus/una-vidriera-v2.webp' },
];

export default function Nosotros() {
    return (
        <InnerPage>
            <RunLine
                color="naranja"
                shape="arriba"
                heroDecos={[
                    { src: '/assets/Footer-Sticker SVG/footer-sticker-hands.svg', w: 120, fx: 0.93, fy: 0.72 },
                ]}
                start={2}
            />
            <InnerHero
                color="rosa"
                eyebrow="Nosotros"
                title={<>Un equipo creativo <br />en movimiento.</>}
                lead={'Articulamos diseño, comunicación y tecnología 3D. Aportamos talento profesional a marcas que buscan coherencia, estética y ese “no sé qué” editorial.'}
            />

            <section className="photo-strip" aria-label="El equipo">
                <div className="photo-strip__track" data-drift="-18">
                    {FOTOS.map((f, i) => (
                        <figure key={f.src} className={`photo-card photo-card--${i % 2 ? 'b' : 'a'}`}>
                            <img src={f.src} alt="Equipo de Estudio Jogging" loading="lazy" />
                            <figcaption className={`photo-card__tag badge-${f.color}`}>{f.tag}</figcaption>
                        </figure>
                    ))}
                </div>
            </section>

            <section className="wrap section">
                <div className="split">
                    <div className="split__sticky" data-reveal>
                        <span className="inner-eyebrow">Nuestra historia</span>
                        <h2 className="section-title">¿Cómo nació Jogging?</h2>
                    </div>
                    <div className="prose">
                        <p data-reveal>Antes de ser un estudio, fuimos una red de profesionales independientes con diez años de trayectoria. Descubrimos que la creatividad y el imaginario son el motor que nos pone en movimiento y nos permite transformar nuestro entorno.</p>
                        <p data-reveal>Construimos para divertirnos y acompañamos desde la escucha para diseñar la mejor experiencia posible.</p>
                        <img src="/assets/Equipo/nosotros-4.jpg" alt="El equipo trabajando" className="prose__img" data-reveal loading="lazy" />
                    </div>
                </div>
            </section>

            <section className="panel panel--cream">
                <div className="wrap">
                    <span className="inner-eyebrow" data-reveal>Nuestra misión</span>
                    <p className="manifesto" data-words>
                        Nuestra misión es simple: luchar contra el aburrimiento.
                    </p>
                </div>
            </section>

            <section className="wrap section">
                <div className="section-head" data-reveal>
                    <span className="inner-eyebrow">Qué vas a encontrar</span>
                    <h2 className="section-title">En Estudio Jogging vas a encontrar…</h2>
                </div>
                <div className="find-grid">
                    {ENCONTRAR.map((c) => (
                        <article key={c.t} className={`find-card find-card--${c.color}`} data-reveal>
                            <img src={c.ilu} alt="" aria-hidden="true" className={`find-card__ilu${c.centro ? ' find-card__ilu--centro' : ''}`} loading="lazy" />
                            <h3>{c.t}</h3>
                            <p>{c.d}</p>
                        </article>
                    ))}
                </div>
            </section>

            <InnerCta wide title={<>Bienvenido a Estudio Jogging,<br />ponete cómodo.</>} text="¿Tenés un proyecto en mente? Nos encantaría escucharlo." />
        </InnerPage>
    );
}
