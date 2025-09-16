'use client';

import { use, useEffect, useState } from 'react';
import { getPaintBySlug } from '@/requests/paint';

export default function PaintPage({ params }) {
  // Déballer la promesse params (Next.js 14+)
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [paint, setPaint] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return; // sécurité
    async function fetchPaint() {
      try {
        const data = await getPaintBySlug(slug);
        if (!data) throw new Error('Peinture non trouvée');
        console.log('Données API:', data);
        setPaint(data);
      } catch (err) {
        console.error(err);
        setError('Impossible de charger la peinture');
      }
    }
    fetchPaint();
  }, [slug]);

  if (error) return <div>{error}</div>;
  if (!paint) return <div>Chargement...</div>;

  return (
    <div>
      <h1>{paint.title}</h1>
      <p>{paint.artist}</p>
      <img src={paint.image} alt={paint.title} className="max-w-full" />
      <p>{paint.year}</p>
      <p>{paint.type}</p>
      <p>{paint.movement}</p>
    </div>
  );
}
