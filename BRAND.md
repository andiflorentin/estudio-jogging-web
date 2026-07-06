# Jogging — Guía de marca

Logo: `public/logo/Logo Estudio Jogging.svg` (reemplaza al logo Truus en `public/assets/Navbar SVG/logo-truus.svg`)

## Colores

| Nombre | Hex | RGB | CMYK |
|--------|-----|-----|------|
| Azul | `#0070DC` | 0 112 220 | 84 55 0 0 |
| Blanco hueso | `#F7F8F3` | 247 248 243 | 4 2 6 0 |
| Rosa | `#FD6E9A` | 253 110 154 | 0 70 13 0 |
| Crema | `#FFE5CC` | 255 229 204 | 0 13 22 0 |
| Rojo | `#FB362D` | 251 54 45 | 0 87 78 0 |
| Naranja | `#FFA403` | 255 164 3 | 0 43 93 0 |
| Negro | `#000000` | 0 0 0 | — |

```css
:root {
  --azul: #0070DC;
  --blanco-hueso: #F7F8F3;
  --rosa: #FD6E9A;
  --crema: #FFE5CC;
  --rojo: #FB362D;
  --naranja: #FFA403;
  --negro: #000000;
}
```

## Tipografías

### Nikkei Journal — títulos, subtítulos y texto (en minúsculas)
Pesos disponibles en `public/fonts/Nikkei/`:
- `PPNikkeiJournal-Ultrabold.otf` — UltraBold
- `PPNikkeiJournal-Regular.otf` — Regular
- `PPNikkeiJournal-Light.otf` — Light

### Reenie Beanie — acentos y diálogo de personajes
- `public/fonts/ReenieBeanie-Regular.ttf` — Regular

```css
@font-face {
  font-family: "Nikkei Journal";
  src: url("/fonts/Nikkei/PPNikkeiJournal-Ultrabold.otf") format("opentype");
  font-weight: 800;
}
@font-face {
  font-family: "Nikkei Journal";
  src: url("/fonts/Nikkei/PPNikkeiJournal-Regular.otf") format("opentype");
  font-weight: 400;
}
@font-face {
  font-family: "Nikkei Journal";
  src: url("/fonts/Nikkei/PPNikkeiJournal-Light.otf") format("opentype");
  font-weight: 300;
}
@font-face {
  font-family: "Reenie Beanie";
  src: url("/fonts/ReenieBeanie-Regular.ttf") format("truetype");
  font-weight: 400;
}
```
