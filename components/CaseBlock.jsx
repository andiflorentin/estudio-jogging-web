import Media from '@/components/Media';
import CaseVideo from '@/components/CaseVideo';
import CaseCarousel from '@/components/CaseCarousel';

// Un bloque del interior de un proyecto (tipos documentados en lib/proyectos.js).
// base: carpeta pública del proyecto, ej. /media/proyectos/dermaglos

function Piece({ base, src, label, className = '' }) {
    const url = `${base}/${src}`;
    if (/\.mp4$/i.test(src)) {
        return <CaseVideo src={url} poster={url.replace(/\.mp4$/i, '.jpg')} label={label} className={className} />;
    }
    return (
        <figure className={`case-piece ${className}`}>
            <Media src={url} alt={label || ''} />
            {label && <figcaption>{label}</figcaption>}
        </figure>
    );
}

// children: contenido extra (el relato recibe la descripción del proyecto)
export default function CaseBlock({ b, base, children }) {
    switch (b.tipo) {
        case 'relato':
            return (
                <div className="cb-relato" data-reveal>
                    <Piece base={base} src={b.src} label={b.label} />
                    <div className="cb-relato__text">{children}</div>
                </div>
            );
        case 'ancho':
            return <div className="cb-wide" data-reveal><Piece base={base} src={b.src} label={b.label} /></div>;
        case 'fila':
            return (
                <div className={`cb-row${b.grande ? ' cb-row--grande' : ''}${b.ajustar ? ' cb-row--ajustar' : ''}${b.tarjeta ? ' cb-row--tarjeta' : ''}`}>
                    {/* ajustar: cada pieza crece según su proporción → misma altura y todo el ancho */}
                    {b.items.map(({ r, ...it }) => (
                        <div key={it.src} data-reveal style={b.ajustar ? { flex: `${r} 1 0` } : undefined}><Piece base={base} {...it} /></div>
                    ))}
                </div>
            );
        case 'carrusel':
            return (
                <CaseCarousel>
                    {b.items.map((src) => <Piece key={src} base={base} src={src} className="cb-carousel__item" />)}
                </CaseCarousel>
            );
        case 'dato':
            return (
                <div className="cb-stat" data-reveal>
                    <strong>{b.valor}</strong>
                    <span>{b.texto}</span>
                </div>
            );
        default:
            return null;
    }
}
