import './globals.css';

const description = 'Estudio creativo en movimiento: diseño, comunicación y tecnología 3D para marcas que buscan coherencia, estética y ese "no sé qué" editorial.';

export const metadata = {
    metadataBase: new URL('https://andiflorentin.github.io'),
    title: 'Estudio Jogging',
    description,
    icons: {
        icon: '/logo/Isologo.svg',
    },
    openGraph: {
        title: 'Estudio Jogging',
        description,
        url: 'https://andiflorentin.github.io',
        siteName: 'Estudio Jogging',
        images: ['/assets/Eimg_hero.png'],
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Estudio Jogging',
        description,
        images: ['/assets/Eimg_hero.png'],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}
