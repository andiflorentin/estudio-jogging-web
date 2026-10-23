import InnerPage from '@/components/InnerPage';
import InnerHero from '@/components/InnerHero';
import InnerCta from '@/components/InnerCta';
import RunLine from '@/components/RunLine';
import ServiceList from '@/components/ServiceList';

export const metadata = {
    title: 'Servicios — Estudio Jogging',
    description: 'Social media estratégico, proyectos 3D, CGI y FOOH, ecosistemas web y comunicación empresarial.',
};

// Contenido agregado (derivado del texto de "Equipo"): cómo trabajamos.
const PASOS = [
    { n: '01', t: 'Escuchamos', d: 'Arrancamos por entender tu marca, tu público y lo que querés lograr. Sin fórmulas preestablecidas.', sticker: '/assets/Card-Sticker SVG/sticker-phone.svg' },
    { n: '02', t: 'Imaginamos', d: 'Bajamos ideas a conceptos claros: referencias, guiones, bocetos y dirección de arte.', sticker: '/assets/Card-Sticker SVG/sticker-heart.svg' },
    { n: '03', t: 'Producimos', d: 'Diseño, 3D, rodaje, desarrollo web. Un ensamble de profesionales integrados, a ritmo constante.', sticker: '/assets/Card-Sticker SVG/sticker-camera.svg' },
    { n: '04', t: 'Acompañamos', d: 'Medimos, ajustamos y seguimos. Soporte estratégico continuo para que la marca no pierda coherencia.', sticker: '/assets/Card-Sticker SVG/sticker-smiley.svg' },
];

export default function Servicios() {
    return (
        <InnerPage>
            <RunLine
                color="naranja"
                shape="espejo"
                heroDecos={[
                    { src: '/assets/Card-Sticker SVG/sticker-camera.svg', w: 110, fx: 0.94, fy: 0.68 },
                ]}
                start={4}
            />
            <InnerHero
                color="azul"
                eyebrow="Servicios"
                title={<>¿Qué podemos hacer <br />por tu marca?</>}
                lead="Cuatro formas de ponernos en movimiento con vos: estrategia en redes, 3D de alto impacto, webs a medida y comunicación integral."
            />

            <section className="panel panel--cream">
                <img src="/assets/HorizontalWords SVG/JOGGING_Pantaloncitos.svg" alt="" aria-hidden="true" className="panel__deco panel__deco--walk" data-speed="0.35" />
                <div className="wrap">
                    <p className="manifesto" data-words>
                        Articulamos diseño, comunicación y tecnología 3D para que tu marca se vea, se entienda y se recuerde.
                    </p>
                </div>
            </section>

            <ServiceList />

            <section className="panel panel--crema">
                <div className="wrap section">
                    <div className="split">
                        <div className="split__sticky" data-reveal>
                            <span className="inner-eyebrow">Cómo trabajamos</span>
                            <h2 className="section-title">De la escucha a la pantalla.</h2>
                            <p className="section-lead">Acompañamos desde la escucha para diseñar la mejor experiencia posible.</p>
                        </div>
                        <div className="steps">
                            {PASOS.map((p) => (
                                <article key={p.n} className="step-card" data-reveal>
                                    <img src={p.sticker} alt="" aria-hidden="true" className="step-card__sticker" />
                                    <span className="step-card__n">{p.n}</span>
                                    <h3 className="step-card__t">{p.t}</h3>
                                    <p>{p.d}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <InnerCta />
        </InnerPage>
    );
}
