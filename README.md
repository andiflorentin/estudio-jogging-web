# Estudio Jogging — Sitio Web

Sitio web de **Estudio Jogging**, construido como una aplicación **Next.js + React** con animaciones e interacciones hechas a medida (GSAP, Lenis).

---

## 🚀 Overview

Landing page de una sola página con un hero ilustrado interactivo, secciones de servicios, marquee de marcas, y footer con créditos animados.

### ⚠️ Nota sobre el video del hero
El componente del hero usa un elemento `<video>` HTML5 con el `src` sin definir, mostrando el poster de fondo (`public/assets/Eimg_hero.png`). Para agregar un video de fondo real, colocá el `.mp4` en `public/` y actualizá el `src` en `VimeoHero.jsx`.

---

## ✨ Funcionalidades destacadas

### 🎭 Animaciones y efectos

- **GSAP InertiaPlugin Fling** — Las cards y labels flotantes siguen la velocidad del mouse; al salir, se lanzan con física de inercia y vuelven a su lugar.
- **Page Transition Scribble** — Máscara de garabato a pantalla completa que se dibuja/desdibuja al hacer click en el logo.
- **Elastic Card Interactions** — Las service cards se despliegan horizontalmente al hover con física elástica.
- **Scroll-Triggered SVG Draws** — Subrayados y trazos dibujados a mano se animan vía `stroke-dasharray` al hacer scroll.
- **Footer Sticker Proximity Push** — Los stickers del footer reaccionan a swipes rápidos del cursor cercano.
- **Wiggle System** — Rotación configurable por elemento al hover, controlada desde `WIGGLE_CONFIG`.
- **Custom Cursor Bubble** — Blob que sigue al cursor y aparece con texto contextual sobre elementos clickeables.
- **Mute Bubble** — Blob independiente sobre el hero con estados de mute/unmute para el video y la música de fondo.
- **Overlays del hero** — Botones "Proyectos" y "Contáctanos" y burbuja de WhatsApp posicionados dinámicamente sobre la ilustración del escritorio, recalculados en cada resize para seguir el recorte `object-fit: cover`.
- **Double Marquee** — Logos de marcas en scroll infinito con randomización (sin duplicados adyacentes, incluso en el punto de loop).
- **Credits Pop-out** — El cuadro de créditos del footer crece/decrece físicamente con animaciones de texto en cascada.
- **Lenis Smooth Scroll** — Scroll suave sincronizado con el ticker de GSAP.

### 🏗️ Arquitectura

- **Componentes React** — Cada sección es un componente aislado.
- **CSS Modular** — Hojas de estilo parciales importadas desde `globals.css`.
- **Assets propios** — Fuentes, logos, stickers e ilustraciones alojados localmente, sin dependencias de CDN.
- **Datos centralizados** — Toda la data estática (marcas, cards, iconos, configs) exportada desde `lib/data.js`.

---

## 🛠️ Stack

| Tecnología | Uso |
|---|---|
| **Next.js 15** | Framework de React, App Router |
| **React 19** | Arquitectura de componentes |
| **CSS Vanilla** | Sistema de diseño vía CSS Variables — sin Tailwind |
| **GSAP + ScrollTrigger + InertiaPlugin** | Animaciones y efectos con física |
| **Lenis** | Scroll suave con inercia |

---

## 📦 Estructura del proyecto

```text
jogging-web/
├── app/
│   ├── styles/                  # Hojas de estilo modulares
│   ├── globals.css              # Entry point — importa todos los parciales
│   ├── layout.jsx               # Root layout — <html>, metadata, favicon
│   └── page.jsx                 # Página principal — arma todos los componentes
│
├── components/
│   ├── CursorBubble.jsx
│   ├── DoubleMarquee.jsx
│   ├── Footer.jsx
│   ├── HorizontalWords.jsx
│   ├── MotionCards.jsx
│   ├── Navbar.jsx
│   ├── ServiceCards.jsx
│   ├── Showreel.jsx
│   ├── SmoothScroll.jsx
│   ├── SvgSymbols.jsx
│   ├── TransitionScribble.jsx
│   └── VimeoHero.jsx            # Hero — video, mute bubble, overlays interactivos
│
├── lib/
│   └── data.js                  # Data estática como exports de ES modules
│
├── public/
│   ├── assets/                  # Ilustraciones, stickers, íconos
│   ├── fonts/                   # Nikkei Journal, Reenie Beanie
│   └── logo/                    # Logos e isologo de Estudio Jogging
│
├── BRAND.md                     # Guía de marca (colores, tipografías)
├── jsconfig.json
├── next.config.mjs
├── package.json
└── README.md
```

---

## ⚙️ Setup

Requiere Node.js instalado.

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Levantar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```
