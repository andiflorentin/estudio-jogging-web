// Contenido de "VERSIÓN FINAL_ PORFOLIO WEB.docx".
// Media: public/media/proyectos/<slug>/ — cover-<slug>.(webp|mp4) es la portada de la grilla.
// bloques (opcional): cómo se arma el interior según el formato del material (ver CaseBlocks).
//   relato     un video vertical con la descripción del proyecto al lado  { src, label }
//   ancho      un video/imagen horizontal a todo el ancho  { src, label }
//   fila       piezas en fila a la misma altura  { items: [{ src, label, r }], grande?: true (casi todo el alto de pantalla),
//              ajustar?: true (ocupan todo el ancho; r = proporción ancho/alto de cada pieza),
//              tarjeta?: true (van sobre una tarjeta blanca, como la del relato) }
//   carrusel   tira con flechas, todas las piezas a la misma altura (imágenes o videos)  { items: [src] }
//   dato       número destacado  { valor, texto }
//   src es relativo a la carpeta del proyecto. El primer bloque va arriba, en lugar de la portada.
// Sin bloques: portada + todo lo de la carpeta como galería. Sin carpeta: placeholders.

// categoria: usada por los filtros de /proyectos
export const CATEGORIAS = ['3D / FOOH', 'CGI', 'Branding'];

export const PROYECTOS = [
    {
        slug: 'dermaglos',
        categoria: '3D / FOOH',
        cliente: 'Dermaglós',
        lugar: 'Buenos Aires',
        fecha: 'Marzo 2025',
        titulo: '50 años en el corazón del país',
        tecnica: ['3D', 'FOOH', 'Rodaje con drone'],
        color: 'azul',
        texto: [
            'Dermaglós cumplía 50 años y quería algo más que una campaña. Llevamos su producto más icónico al punto más reconocible del país: el Obelisco, en escala monumental. Una intervención que incluyó volar un drone, modelar 3 productos, enmascarar, maquillar y poner a circular una conversación tras una de las marcas insignias de Laboratorio Andrómaco.',
        ],
        nota: '50 años merecía una ejecución precisa y un resultado que va más allá de la pantalla.',
        bloques: [
            { tipo: 'relato', src: 'final.mp4' },
            // making-of partido en dos (1ª y 2ª mitad del video), uno al lado del otro a todo el ancho
            { tipo: 'fila', ajustar: true, tarjeta: true, items: [{ src: 'making-of-1.mp4', r: 9 / 16 }, { src: 'making-of-2.mp4', r: 9 / 16 }] },
        ],
        keywords: '3D FOOH Argentina, publicidad 3D Buenos Aires, intervención urbana digital, CGI publicidad Argentina, estudio creativo 3D, Dermaglós 50 años, 3D FOOH agency, outdoor advertising CGI, digital out of home Argentina, creative studio Buenos Aires',
    },
    {
        slug: 'portsaid',
        categoria: '3D / FOOH',
        cliente: 'Portsaid',
        lugar: 'Buenos Aires',
        fecha: 'Enero 2025',
        titulo: 'Llegó, Ma.',
        tecnica: ['3D', 'FOOH', 'Rodaje'],
        color: 'rosa',
        texto: [
            'En una fecha saturada de campañas tiernas y predecibles, elegimos otro camino. En tomas variadas convertimos el acto de regalar en un acontecimiento urbano: una caja gigante cae en barrio Belgrano (Cabildo y Sucre). El regalo se abre en un remate visual donde hermosos tulipanes invaden la calle. Una pieza emocional que amplifica el gesto de la marca.',
        ],
        nota: 'El 3D es un vehículo narrativo y no solo un efecto. La tecnología al servicio de la emoción.',
        bloques: [
            { tipo: 'relato', src: 'version-jogging.mp4' },
            { tipo: 'fila', grande: true, items: [{ src: 'final.mp4', label: 'Pieza final' }, { src: 'still.webp', label: 'Cabildo y Sucre, Belgrano' }] },
            { tipo: 'dato', valor: '58,1 mil', texto: 'reproducciones en redes' },
        ],
        keywords: 'FOOH Día de la Madre, campaña 3D moda argentina, contenido visual para marcas, publicidad creativa premium, 3D fashion campaign, FOOH agency Argentina, premium brand content, creative CGI fashion, contenido digital marcas de moda',
    },
    {
        slug: 'joyeria-lar',
        categoria: 'Branding',
        cliente: 'LAR',
        lugar: 'Río Gallegos',
        fecha: 'Diciembre 2025',
        titulo: 'Una joya patagónica',
        tecnica: ['Branding', 'Diseño Gráfico', 'Dirección de Arte'],
        color: 'azul',
        texto: [
            'LAR quería dejar atrás la imagen de joyería tradicional y construir algo premium, confiable y actual. Desarrollamos un sistema de identidad basado en la pureza del sur argentino: hielo, cristal y luz fría patagónica como universo visual. Desde ese concepto construimos isologo, paleta, tipografías, reglas de composición y aplicaciones reales para redes, packaging y comunicación comercial.',
        ],
        nota: 'Es un ejemplo de branding con raíz conceptual clara. Un sistema que se puede escalar a cualquier soporte sin perder coherencia ni impacto.',
        keywords: 'branding joyería Argentina, identidad visual premium, diseño de marca contemporáneo, sistema de identidad visual, branding patagonia, jewelry branding studio, visual identity design, luxury brand design Argentina, brand system design, creative branding studio',
    },
    {
        slug: 'colgate-rimmel-farmacity',
        categoria: '3D / FOOH',
        cliente: 'Colgate × Rimmel × Farmacity',
        lugar: 'Buenos Aires',
        fecha: 'Septiembre 2025',
        titulo: 'Retail que se vuelve espectáculo',
        tecnica: ['3D', 'FOOH', 'Actuación real', 'Rodaje'],
        color: 'rojo',
        texto: [
            '¿Comunicar una promo rápida sin caer en una pieza plana de retail? Para este co-branding creamos una escena híbrida: una situación cotidiana como punto de partida y un momento imposible como remate, con los productos irrumpiendo en escala gigante sobre la fachada urbana. El mensaje comercial se entiende al segundo y el formato lo convierte en contenido que vale la pena ver.',
        ],
        nota: 'Un proyecto que combina actuación, 3D y FOOH en una sola pieza (¡para tres marcas inmensas!).',
        bloques: [
            { tipo: 'relato', src: 'final.mp4' },
            { tipo: 'fila', ajustar: true, items: [{ src: 'kv-horizontal.webp', r: 16 / 9 }, { src: 'lip-oil.webp', r: 1 }] },
        ],
        keywords: 'campaña promocional creativa, FOOH retail Argentina, publicidad 3D marcas de consumo, contenido audiovisual para marcas, hybrid CGI campaign, retail advertising creative, live action CGI integration, FOOH advertising agency, campaña digital productos masivos',
    },
    {
        slug: 'panalab-detenage',
        categoria: 'CGI',
        cliente: 'Panalab',
        lugar: 'Buenos Aires',
        fecha: 'Noviembre 2025',
        titulo: 'Laboratorio de autor',
        tecnica: ['CGI 3D', 'Packshot animado', 'Simulación de fluidos'],
        color: 'naranja',
        texto: [
            'Detenage necesitaba comunicar ciencia y precisión sin resignar experiencia visual. Todo sin perder el prestigio de Laboratorio Panalab. Construimos un universo CGI limpio y controlado: un entorno científico de estética cinematográfica, con planos macro, recorridos de cámara y un trabajo fino sobre materiales, líquidos y packshot final. Una pieza informativa que no pierde ni un segundo de belleza.',
        ],
        nota: 'Es el proyecto que mejor muestra nuestra capacidad técnica en CGI puro. Sin entorno real, sin trucos de contexto: solo modelado, iluminación y dirección visual.',
        bloques: [
            { tipo: 'ancho', src: 'spot-horizontal.mp4', label: 'Spot Detenage G-Serum' },
            { tipo: 'carrusel', items: ['spot-v1.mp4', 'carrusel-1.webp', 'carrusel-2.webp', 'carrusel-3.webp', 'carrusel-4.webp', 'carrusel-5.webp'] },
        ],
        keywords: 'CGI productos cosméticos, video 3D dermocosmética, packshot CGI Argentina, producción audiovisual cosmética, estudio 3D Buenos Aires, CGI product video, cosmetic CGI studio, 3D packshot animation, high end product visualization, beauty brand CGI',
    },
    {
        // TEXTO PROVISORIO: no estaba en el documento, revisar con el estudio
        slug: 'dermaglos-retinol',
        categoria: 'CGI',
        cliente: 'Dermaglós',
        lugar: 'Buenos Aires',
        fecha: '',
        titulo: 'Retinol en modo nostalgia',
        tecnica: ['CGI 3D', 'Diseño gráfico', 'Social media'],
        color: 'rosa',
        texto: [
            'Para el lanzamiento del Serum Retinol de Dermaglós llevamos la rutina nocturna a un universo dosmilero: ventanas de chat, la viborita del celular, flashes de cámara y estrellitas. Una serie de posts y una pieza animada que le hablan en su idioma a una generación que creció conectada.',
        ],
        nota: 'Producto en 3D integrado a una estética retro: cada pieza funciona sola y en conjunto arma el universo de la campaña.',
        keywords: 'CGI cosmética, Dermaglós Retinol, contenido para redes, diseño gráfico social media, campaña dermocosmética, 3D product social content, beauty brand social media, estudio creativo Buenos Aires',
        bloques: [
            { tipo: 'carrusel', items: ['post-animado.mp4', 'post-1.webp', 'post-2.webp', 'post-3.webp', 'post-4.webp', 'post-5.webp'] },
        ],
    },
    {
        slug: 'el-reino-del-chipa',
        categoria: 'Branding',
        cliente: 'El Reino del Chipá',
        lugar: 'Río Gallegos',
        fecha: 'Octubre 2025',
        titulo: 'Chipá con carácter',
        tecnica: ['Branding', 'Diseño de personaje', 'Packaging'],
        color: 'naranja',
        texto: [
            'El desafío era profesionalizar una categoría muy cotidiana y volverla memorable. Desarrollamos un sistema visual con personalidad fuerte: un personaje propio, tipografía robusta y una paleta cálida que se reconoce a distancia. El trabajo se extendió a packaging, cartelería, stickers y piezas para redes.',
        ],
        nota: 'Muestra que el branding no es solo para marcas premium. Una marca popular también puede tener un sistema bien pensado, con criterio y con identidad propia. El personaje es el recurso que lo hace único.',
        keywords: 'branding gastronomía Argentina, identidad visual para marcas populares, diseño de personaje de marca, packaging diseño gráfico, branding estudio creativo Buenos Aires, food branding Argentina, mascot design studio, brand character design, packaging design Buenos Aires, popular brand identity',
    },
];
