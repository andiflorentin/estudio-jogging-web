import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import InnerFx from '@/components/InnerFx';

// Shell compartido por las páginas internas (servicios, nosotros, proyectos).
export default function InnerPage({ children }) {
    return (
        <>
            <SmoothScroll />
            <CursorBubble />
            <InnerFx />
            <header className="inner-header">
                <Navbar />
            </header>
            <main className="inner-page">{children}</main>
            <footer className="main-footer">
                <Footer />
            </footer>
        </>
    );
}
