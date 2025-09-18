'use client';

import {use, useEffect, useState} from 'react';
import {getPaintBySlug} from '@/requests/paint';
import {getSimilarPaints} from '@/requests/similarPaints';
import TransitionLink from '@/Animation/TransitionLink';

export default function PaintPage({ params }) {
  const { slug } = use(params);

  const [paint, setPaint] = useState(null);
  const [error, setError] = useState('');
  const [similarPaints, setSimilarPaints] = useState([]);

  useEffect(() => {
    if (!slug) return;

    async function fetchPaint() {
      try {
        const data = await getPaintBySlug(slug);
        if (!data) throw new Error('Peinture non trouvée');
        setPaint(data);
      } catch (err) {
        setError('Impossible de charger la peinture');
      }
    }

    fetchPaint();
  }, [slug]);

  useEffect(() => {
    if (!paint) return;

    async function fetchSimilarPaints() {
      try {
        const filteredData = await getSimilarPaints(paint.movement, slug);
        setSimilarPaints(filteredData);
      } catch (err) {
        console.error(
          'Erreur lors de la récupération des peintures similaires:', err);
      }
    }

    fetchSimilarPaints();
  }, [paint, slug]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] bg-gradient-to-br from-red-100 via-white to-gray-50">
        <div className="mb-4">
          {/* Icône d’erreur */}
          <svg width="56" height="56" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#fee2e2"/>
            <path d="M12 8v4m0 4h.01" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="text-2xl font-bold text-red-700 mb-2 text-center drop-shadow">
          {error}
        </p>
        <TransitionLink href="/">
          <button className="mt-4 px-6 py-3  text-black hover:text-gray-500 delay-75 transition font-semibold">
            Retour à l’accueil
          </button>
        </TransitionLink>
      </div>
    );
  }

  if (!paint) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Banner */}
      <div className="relative h-72 md:h-96 w-full flex items-end">
        <img
          src={paint.image}
          alt={paint.title}
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="relative z-10 p-8 w-full flex flex-col items-center">
          <h1
            className="text-4xl md:text-5xl font-title font-bold text-white drop-shadow-lg mb-2 text-center">
            {paint.title}
          </h1>
          <p
            className="text-lg md:text-2xl text-white/80 font-medium drop-shadow text-center">
            {paint.artist}
          </p>
        </div>
      </div>

      {/* Infos */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <span className="block text-xs text-gray-400">Année</span>
            <span
              className="text-base text-gray-700 font-semibold">{paint.year}</span>
          </div>
          <div>
            <span className="block text-xs text-gray-400">Type</span>
            <span
              className="text-base text-gray-700 font-semibold">{paint.type}</span>
          </div>
          <div>
            <span className="block text-xs text-gray-400">Mouvement</span>
            <span
              className="text-base text-gray-700 font-semibold">{paint.movement}</span>
          </div>
          {paint.location && (
            <div>
              <span className="block text-xs text-gray-400">Lieu</span>
              <span
                className="text-base text-gray-700 font-semibold">{paint.location}</span>
            </div>
          )}
        </div>

        {/* Description HTML */}
        {paint.description && (
          <div
            className="prose prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{__html: paint.description}}
          />
        )}
      </section>

      {/* Section œuvres similaires */}
      {similarPaints.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-4">Œuvres similaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarPaints.map(similar => (
              <TransitionLink key={similar.slug} href={`/paints/${similar.slug}`}>
              <div key={similar.slug} className="flex flex-col items-center">
                <img src={similar.image} alt={similar.title}
                     className="w-full h-32 object-cover mb-2"/>
                <span className="font-semibold">{similar.title}</span>
                <span className="text-sm text-gray-500">{similar.artist}</span>
              </div>
              </TransitionLink>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}