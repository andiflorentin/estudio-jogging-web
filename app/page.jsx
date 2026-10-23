'use client';

import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import VimeoHero from '@/components/VimeoHero';
import ServiceList from '@/components/ServiceList';
import InnerFx from '@/components/InnerFx';
import MotionCards from '@/components/MotionCards';
import Showreel from '@/components/Showreel';
import DoubleMarquee from '@/components/DoubleMarquee';
import Footer from '@/components/Footer';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';

import HorizontalWords from '@/components/HorizontalWords';
import ReelsSection from '@/components/ReelsSection';

export default function Home() {
    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <InnerFx />
            <header className="main-header">
                <Navbar />
                <VimeoHero />
            </header>
            <HorizontalWords />
            <main>
                <Showreel />
                <div className="content-section motion-cards-wrapper">
                    <MotionCards />
                </div>
                <div className="service-cards-wrapper home-alt">{/* el navbar usa service-cards-wrapper para cambiar de color */}
                    <ServiceList />
                </div>
            </main>
            <section className="Double-marquee">
                <DoubleMarquee />
            </section>
            <div className="home-alt">
                <ReelsSection title="Lo último que pusimos a correr." />
            </div>
            <footer className="main-footer">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}
