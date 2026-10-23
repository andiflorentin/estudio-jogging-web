// Lista de servicios (Servicios y home). Las animaciones (data-reveal, data-hover-list) las maneja InnerFx.
// Texto: "SERVICIOS Y EQUIPO- WEB JOGGING.docx". Tags e imágenes de hover agregados para enriquecer.
// img: una imagen o una lista (con lista, cada vez que se pasa el mouse muestra la siguiente).
const SERVICIOS = [
    {
        titulo: 'Social media estratégico',
        color: 'rosa',
        img: '/media/proyectos/joyeria-lar/joyeria-lar-branding-13.webp',
        tags: ['Instagram', 'TikTok', 'LinkedIn', 'Reels', 'Fee mensual'],
        texto: 'Elevamos tu presencia digital con una mirada editorial. A través de un fee mensual estructurado, gestionamos tus comunidades (Instagram, TikTok, LinkedIn) integrando estrategia, redacción creativa, diseño gráfico y producción de reels.',
    },
    {
        titulo: 'Proyectos 3D, CGI y FOOH',
        color: 'naranja',
        img: '/media/proyectos/dermaglos/final.jpg',
        tags: ['Modelado 3D', 'CGI', 'FOOH', 'VFX'],
        texto: 'Desarrollamos piezas visuales de alto impacto que rompen el ruido digital. Utilizamos técnicas avanzadas de modelado 3D, efectos visuales e integración real (FOOH) para crear experiencias inmersivas. Garantizamos un estándar técnico superior.',
    },
    {
        titulo: 'Ecosistemas web',
        color: 'azul',
        img: '/media/proyectos/joyeria-lar/joyeria-lar-branding-18.webp',
        tags: ['Sprint de 4 semanas', 'Responsive', 'UX / UI'],
        texto: 'Diseñamos el espacio digital definitivo para tu marca. En un sprint de 4 semanas, creamos páginas web responsivas y personalizadas que combinan identidad visual, funcionalidad y una experiencia de usuario impecable.',
    },
    {
        titulo: 'Comunicación empresarial',
        color: 'crema',
        img: '/media/proyectos/panalab-detenage/carrusel-3.webp',
        tags: ['Branding', 'Diseño gráfico', 'Redes', 'Web'],
        texto: 'Funcionamos como el brazo creativo externo de tu marca. Nos integramos a tu empresa para resolver y unificar toda la comunicación: desde el branding y el diseño gráfico, hasta la gestión de redes y el desarrollo web, brindando soporte estratégico continuo.',
    },
];

export default function ServiceList() {
    return (
        <section className="wrap section">
            <div className="section-head" data-reveal>
                <span className="inner-eyebrow">Lo que hacemos</span>
                <h2 className="section-title section-title--wide">Cuatro servicios, un mismo ritmo.</h2>
            </div>
            <div className="hover-list" data-hover-list>
                <ol className="service-list">
                    {SERVICIOS.map((s, i) => (
                        <li key={s.titulo} className="service-row" data-img={[].concat(s.img).join('|')} data-reveal>
                            <span className={`service-row__num badge-${s.color}`}>{String(i + 1).padStart(2, '0')}</span>
                            <h3 className="service-row__title">{s.titulo}</h3>
                            <div>
                                <p className="service-row__text">{s.texto}</p>
                                <ul className="chips">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                            </div>
                        </li>
                    ))}
                </ol>
                <div className="hover-preview" aria-hidden="true"><img src={[].concat(SERVICIOS[0].img)[0]} alt="" /></div>
            </div>
        </section>
    );
}
