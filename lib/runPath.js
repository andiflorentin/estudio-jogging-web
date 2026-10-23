// Recorrido de la línea "Jogging" en páginas internas.
// Arranca en el hero (a la derecha, donde no hay texto) con una entrada distinta por página, sale por el costado,
// baja por fuera de la pantalla y en cada borde entre secciones vuelve a entrar y cruza
// al otro lado. Al final se va hacia abajo, fuera de la página.
//
// W: ancho del contenedor · heroH: alto del hero · cuts: y de cada borde entre secciones
// endY: fondo de la página (la línea termina más abajo, oculta) · out: cuánto se sale de la pantalla (> medio grosor de la línea)
// shape: entrada del hero, una de HERO_SHAPES ('rulo' por defecto)
// safeX: x donde termina el texto del hero; la entrada y la vuelta quedan siempre a su derecha
// compact: celular (cruces más bajos, dentro del margen superior de cada sección)

// Entradas del hero. Todas se arman con arcos de círculo (Bézier, k = 0.552) que empalman en
// tangente, por eso la curva queda lisa. Viven a la derecha del título y salen por la derecha.
const K = 0.552;

// La vuelta: arranca en el costado del círculo y gira; dir = 1 antihorario (entra por la
// izquierda), dir = -1 horario (entra por la derecha). Termina cruzando por adentro hacia abajo.
function loop(C, cx, cy, r, dir) {
    const x = (dx) => cx + dx * dir; // espeja en horizontal
    return C([x(-r), cy + K * r], [x(-K * r), cy + r], [cx, cy + r])
        + C([x(K * r), cy + r], [x(r), cy + K * r], [x(r), cy])
        + C([x(r), cy - K * r], [x(K * r), cy - r], [cx, cy - r])
        + C([x(-r * 0.9), cy - r], [x(-r * 0.9), cy + r * 0.5], [x(-r * 0.3), cy + r * 1.3]);
}

// Corre (y si no entra, achica) la vuelta para que quede entre safeX y el borde derecho.
function fit(W, safeX, cx, r) {
    const right = W - 24;
    if (cx + r > right) cx = right - r; // primero correr (nunca agrandar)
    if (cx - r < safeX) {
        cx = safeX + r;
        if (cx + r > right) { // no entra ni corrida: achicar
            r = Math.max(40, (right - safeX) / 2);
            cx = safeX + r;
        }
    }
    return [cx, r];
}

export const HERO_SHAPES = {
    // entra desde arriba, da una vuelta y sale por la derecha
    rulo: ({ W, heroH, out, C, safeX }) => {
        const [cx, r] = fit(W, safeX, W * 0.77, Math.min(heroH * 0.2, Math.max(W * 0.1, 56)));
        const cy = heroH * 0.5;
        return `M ${Math.round(cx - r * 0.2)} -40 `
            + C([cx - r * 0.4, cy - r * 1.6], [cx - r, cy - r * 0.9], [cx - r, cy])
            + loop(C, cx, cy, r, 1)
            + C([cx + r * 0.3, cy + r * 2], [W - 40, heroH * 0.92], [W + out, heroH - 20]);
    },
    // entra por el costado derecho en una curva amplia y da la vuelta más abajo
    lateral: ({ W, heroH, out, C, safeX }) => {
        const [cx, r] = fit(W, safeX, W * 0.79, Math.min(heroH * 0.19, Math.max(W * 0.095, 56)));
        const cy = heroH * 0.58;
        return `M ${W + out} ${Math.round(heroH * 0.1)} `
            + C([Math.max(W * 0.8, safeX), heroH * 0.1], [cx - r, cy - r * 2.2], [cx - r, cy])
            + loop(C, cx, cy, r, 1)
            + C([cx + r * 0.25, cy + r * 2], [W - 60, heroH * 0.95], [W + out, heroH - 20]);
    },
    // entra desde arriba un poco más a la izquierda, baja en diagonal y da una vuelta más grande
    arriba: ({ W, heroH, out, C, safeX }) => {
        const [cx, r] = fit(W, safeX, W * 0.8, Math.min(heroH * 0.21, Math.max(W * 0.1, 56)));
        const cy = heroH * 0.56;
        const x0 = Math.min(Math.max(W * 0.6, safeX), cx - r); // entra por arriba, nunca sobre el texto
        return `M ${Math.round(x0)} -40 `
            + C([x0, heroH * 0.2], [cx - r, cy - r * 1.4], [cx - r, cy])
            + loop(C, cx, cy, r, 1)
            + C([cx + r * 0.3, cy + r * 2], [W - 40, heroH * 0.94], [W + out, heroH - 20]);
    },
    // entra desde arriba más a la derecha y gira al revés, con una salida más amplia
    espejo: ({ W, heroH, out, C, safeX }) => {
        const [cx, r] = fit(W, safeX, W * 0.8, Math.min(heroH * 0.21, Math.max(W * 0.1, 56)));
        const cy = heroH * 0.46;
        return `M ${Math.round(cx + r * 0.3)} -40 `
            + C([cx + r * 0.5, cy - r * 1.6], [cx + r, cy - r * 0.9], [cx + r, cy])
            + loop(C, cx, cy, r, -1)
            + C([cx - r * 0.2, cy + r * 2.1], [Math.max(W * 0.82, safeX), heroH * 0.97], [W + out, heroH - 20]);
    },
};

export function buildRunPath({ W, heroH, cuts, endY, out = 80, shape = 'rulo', safeX = 0, compact = false }) {
    const f = (n) => Math.round(n);
    const C = (a, b, c) => `C ${f(a[0])} ${f(a[1])}, ${f(b[0])} ${f(b[1])}, ${f(c[0])} ${f(c[1])} `;

    // Hero: todas las entradas terminan afuera a la derecha, cerca del borde inferior
    let d = (HERO_SHAPES[shape] || HERO_SHAPES.rulo)({ W, heroH, out, C, safeX });
    let y = heroH - 20;

    // Cruces: alternan derecha→izquierda / izquierda→derecha, por fuera entre cruce y cruce
    let side = 1; // 1 = está afuera a la derecha
    for (const [i, cut] of cuts.entries()) {
        if (cut - 120 <= y) continue; // secciones muy pegadas: saltear
        // celular: el último borde es el del bloque de cierre (CTA), que tiene stickers arriba; no se cruza ahí,
        // la línea entra recién con el tramo final, por abajo de los botones
        if (compact && i === cuts.length - 1) continue;
        const xFrom = side > 0 ? W + out : -out;
        const xTo = side > 0 ? -out : W + out;
        // compact (celular): las secciones tienen menos margen, el cruce va más abajo del borde para no pisar texto
        const [a, b, c, e] = compact ? [cut + 10, cut - 10, cut + 100, cut + 60] : [cut - 70, cut - 150, cut + 110, cut + 40];
        d += `L ${f(xFrom)} ${f(a)} `;
        d += C([xFrom - side * W * 0.35, b], [xTo + side * W * 0.35, c], [xTo, e]);
        y = e;
        side = -side;
    }

    // Final: entra por el costado y se va hacia abajo, más allá del borde (endY = fondo de la página),
    // así nunca se ve la punta de la línea
    const xFrom = side > 0 ? W + out : -out;
    // compact: la curva entra recién en los últimos px (margen inferior del bloque), sin pasar por botones
    const [top, c1y, c2y] = compact ? [endY - 70, endY - 70, endY - 20] : [endY - 220, endY - 240, endY - 120];
    if (top > y) d += `L ${f(xFrom)} ${f(top)} `;
    d += C([xFrom - side * W * 0.35, c1y], [W * 0.55, c2y], [W * 0.55, endY + 90]);
    return d.trim();
}

// Tabla y → largo de línea, para saber hasta dónde dibujar según el scroll.
// samples: [{ len, y }] tomados a lo largo del path. Usa el y máximo acumulado,
// así los tramos que suben un poco (rulos, cruces) no hacen retroceder la línea.
export function makeLengthLookup(samples) {
    const lens = [];
    const ys = [];
    let maxY = -Infinity;
    for (const s of samples) {
        maxY = Math.max(maxY, s.y);
        lens.push(s.len);
        ys.push(maxY);
    }
    return (targetY) => {
        if (targetY <= ys[0]) return lens[0];
        if (targetY >= ys[ys.length - 1]) return lens[lens.length - 1];
        let lo = 0;
        let hi = ys.length - 1;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (ys[mid] < targetY) lo = mid + 1; else hi = mid;
        }
        return lens[lo];
    };
}

// Dónde poner nubes/stickers: puntos de la línea que se ven en pantalla (lejos de los bordes),
// separados al menos `gap` px de recorrido. Devuelve la normal (nx, ny) hacia el lado donde va
// el adorno: alterna lado, pero si ese lado cae fuera de pantalla usa el otro.
export function pickDecoSpots(samples, { W, gap = 900, margin = 90, startLen = 300 }) {
    const spots = [];
    let lastLen = -Infinity;
    let side = 1;
    for (let i = 1; i < samples.length - 1; i++) {
        const s = samples[i];
        if (s.len < startLen || s.len - lastLen < gap) continue;
        if (s.x < margin || s.x > W - margin) continue;
        const a = samples[i - 1];
        const b = samples[i + 1];
        const tx = b.x - a.x;
        const ty = b.y - a.y;
        const m = Math.hypot(tx, ty) || 1;
        let nx = (-ty / m) * side;
        let ny = (tx / m) * side;
        if (s.x + nx * 160 < 0 || s.x + nx * 160 > W) { nx = -nx; ny = -ny; }
        spots.push({ len: s.len, x: s.x, y: s.y, nx, ny });
        lastLen = s.len;
        side = -side;
    }
    return spots;
}
