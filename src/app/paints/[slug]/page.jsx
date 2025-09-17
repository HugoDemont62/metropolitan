'use client';

import {use, useEffect, useState} from 'react';
import {getPaintBySlug} from '@/requests/paint';
import {Loader2} from 'lucide-react';

export default function PaintPage({params}) {
  const resolvedParams = use(params);
  const {slug} = resolvedParams;

  const [paint, setPaint] = useState(null);
  const [error, setError] = useState('');

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

  if (error) return (
    <div
      className="flex flex-col items-center justify-center h-[60vh] text-red-500">
      {error}
    </div>
  );
  if (!paint) return (
    <div
      className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
      <Loader2 className="animate-spin h-8 w-8 mb-4"/>
      Chargement...
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
    </main>
  );
}