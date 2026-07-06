import './globals.css';

export const metadata = {
    title: 'Estudio Jogging',
    description: 'Truus is a creative advertising agency specialising in brand strategy, social media, video production, and activations.',
    icons: {
        icon: '/logo/Isologo.svg',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
