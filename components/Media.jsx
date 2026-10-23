// Imagen o video según extensión; sin src => placeholder.
export default function Media({ src, alt = '', className = '', label }) {
    if (!src) {
        return (
            <div className={`media-placeholder ${className}`} aria-label={alt}>
                <span>{label || 'imagen próximamente'}</span>
            </div>
        );
    }
    if (/\.(mp4|webm)$/i.test(src)) {
        return <video className={className} src={src} autoPlay muted loop playsInline aria-label={alt} />;
    }
    return <img className={className} src={src} alt={alt} loading="lazy" />;
}
