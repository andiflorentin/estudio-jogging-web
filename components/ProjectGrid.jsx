'use client';

import { useState } from 'react';
import Media from '@/components/Media';

// Grilla de proyectos con filtro por categoría. `items` viene del server con la portada ya resuelta.
export default function ProjectGrid({ items, categorias }) {
    const [filtro, setFiltro] = useState('Todos');
    const visibles = filtro === 'Todos' ? items : items.filter((p) => p.categoria === filtro);

    return (
        <>
            <div className="filters" role="group" aria-label="Filtrar proyectos">
                {['Todos', ...categorias].map((c) => (
                    <button key={c} type="button" className={`filter-pill${filtro === c ? ' is-active' : ''}`} aria-pressed={filtro === c} onClick={() => setFiltro(c)}>
                        {c}
                        <sup>{c === 'Todos' ? items.length : items.filter((p) => p.categoria === c).length}</sup>
                    </button>
                ))}
            </div>
            <div className="project-grid">
                {visibles.map((p, i) => (
                    <a key={p.slug} href={`/proyectos/${p.slug}`} className={`project-card project-card--${p.color}`} style={{ '--i': i }}>
                        <div className="project-card__media">
                            <Media src={p.cover} alt={`${p.cliente} — ${p.titulo}`} label="portada próximamente" />
                            <span className="project-card__cta">Ver proyecto →</span>
                        </div>
                        <div className="project-card__meta">
                            <span className="project-card__client">{p.cliente}</span>
                        </div>
                        <h2 className="project-card__title">{p.titulo}</h2>
                        <ul className="chips">{p.tecnica.map((t) => <li key={t}>{t}</li>)}</ul>
                    </a>
                ))}
            </div>
        </>
    );
}
