import InnerPage from '@/components/InnerPage';
import InnerHero from '@/components/InnerHero';
import InnerCta from '@/components/InnerCta';
import RunLine from '@/components/RunLine';
import ProjectGrid from '@/components/ProjectGrid';
import ReelsSection from '@/components/ReelsSection';
import { PROYECTOS, CATEGORIAS } from '@/lib/proyectos';
import { getMedia } from '@/lib/media';

export const metadata = {
    title: 'Proyectos — Estudio Jogging',
    description: 'Lo que creamos para otras marcas: 3D, CGI, FOOH, branding y dirección de arte.',
};

export default function Proyectos() {
    const items = PROYECTOS.map((p) => ({ ...p, cover: getMedia(p.slug).cover }));
    return (
        <InnerPage>
            <RunLine
                color="rosa"
                start={6}
                heroDecos={[
                    { src: '/assets/Footer-Sticker SVG/footer-sticker-heart.svg', w: 110, fx: 0.66, fy: 0.24 },
                ]}
            />
            <InnerHero
                color="naranja"
                eyebrow="Proyectos"
                title={<>Lo que creamos <br />para otras marcas.</>}
                lead="3D, FOOH, CGI y branding. Ideas que salen de la pantalla y se meten en la ciudad, en el packaging y en la conversación."
            />
            <section className="wrap section">
                <ProjectGrid items={items} categorias={CATEGORIAS} />
            </section>
            <ReelsSection />
            <InnerCta title="¿Tu marca es la próxima?" />
        </InnerPage>
    );
}
