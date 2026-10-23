// node lib/runPath.test.mjs
import assert from 'node:assert/strict';
import { buildRunPath, makeLengthLookup } from './runPath.js';

const d = buildRunPath({ W: 1280, heroH: 800, cuts: [1600, 2600, 3400], endY: 4200 });
assert.ok(d.startsWith('M '), 'path empieza con M');
assert.ok(!d.includes('NaN'), 'sin NaN');
// 3 cruces + entrada a la meta: los tramos por fuera alternan lado
const offscreen = [...d.matchAll(/L (-?\d+) (\d+)/g)].map((m) => +m[1]);
assert.deepEqual(offscreen.map((x) => (x > 640 ? 'R' : 'L')), ['R', 'L', 'R', 'L']);
assert.ok(d.trim().endsWith('704 4290'), 'termina por debajo del fondo, sin que se vea la punta');

// cortes demasiado juntos se saltean
const d2 = buildRunPath({ W: 1280, heroH: 800, cuts: [820, 1600], endY: 2400 });
assert.equal([...d2.matchAll(/L /g)].length, 2);

// celular: no cruza el último borde (el del CTA), solo entra el tramo final
const d3 = buildRunPath({ W: 375, heroH: 300, cuts: [1600, 2600, 3400], endY: 4000, compact: true });
assert.equal([...d3.matchAll(/L /g)].length, 3, '2 cruces + tramo final');

// lookup: monótono aunque el path suba
const look = makeLengthLookup([{ len: 0, y: 0 }, { len: 10, y: 50 }, { len: 20, y: 30 }, { len: 30, y: 100 }]);
assert.equal(look(-5), 0);
assert.equal(look(40), 10);
assert.equal(look(60), 30); // el tramo que sube (y=30) no cuenta
assert.equal(look(500), 30);
console.log('runPath ok');

// adornos: solo en tramos visibles, separados por `gap`, lados alternados
import { pickDecoSpots } from './runPath.js';
const line = Array.from({ length: 400 }, (_, i) => ({ len: i * 10, x: i < 200 ? -50 : 100 + (i - 200) * 5, y: 500 }));
const spots = pickDecoSpots(line, { W: 1280, gap: 300, margin: 90 });
assert.ok(spots.length >= 2, 'encuentra lugares');
assert.ok(spots.every((s) => s.x >= 90 && s.x <= 1190), 'nunca fuera de pantalla');
assert.ok(spots.every((s, i) => i === 0 || s.len - spots[i - 1].len >= 300), 'respeta la separación');
assert.equal(Math.sign(spots[0].ny), -Math.sign(spots[1].ny), 'alterna lado');
console.log('pickDecoSpots ok');

// entradas del hero: cada forma arranca distinto y todas siguen alternando lados después
import { HERO_SHAPES } from './runPath.js';
for (const shape of Object.keys(HERO_SHAPES)) {
    const ds = buildRunPath({ W: 1280, heroH: 800, cuts: [1600, 2600], endY: 3400, shape });
    assert.ok(!ds.includes('NaN') && !ds.includes('undefined'), shape);
    const off = [...ds.matchAll(/L (-?\d+) (\d+)/g)].map((m) => (+m[1] > 640 ? 'R' : 'L'));
    assert.deepEqual(off, ['R', 'L', 'R'], shape);
}
assert.notEqual(buildRunPath({ W: 1280, heroH: 800, cuts: [], endY: 1400, shape: 'arriba' }).slice(0, 20),
    buildRunPath({ W: 1280, heroH: 800, cuts: [], endY: 1400, shape: 'espejo' }).slice(0, 20));
console.log('hero shapes ok');

// safeX: todo el tramo del hero (incluidos los puntos de control) queda a la derecha del texto
for (const shape of Object.keys(HERO_SHAPES)) for (const safeX of [700, 1000, 1150]) {
    const ds = buildRunPath({ W: 1280, heroH: 800, cuts: [1600], endY: 2400, shape, safeX });
    const hero = ds.split(' L ')[0];
    const xs = [...hero.matchAll(/(-?\d+) (-?\d+)/g)].map((m) => +m[1]);
    assert.ok(Math.min(...xs) >= safeX - 1, `${shape} safeX=${safeX}: x mínima ${Math.min(...xs)}`);
}
console.log('safeX ok');

// fit nunca agranda la vuelta: en pantalla chica el radio queda en su tamaño base (56)
const small = buildRunPath({ W: 375, heroH: 330, cuts: [900], endY: 1500, shape: 'espejo' });
const loopXs = [...small.split(' L ')[0].matchAll(/(-?\d+) (-?\d+)/g)].map((m) => +m[1]);
assert.ok(Math.max(...loopXs) - Math.min(...loopXs.filter((x) => x > 0)) < 260, 'la vuelta no ocupa toda la pantalla');
console.log('fit ok');
