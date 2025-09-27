'use client';

import {use, useEffect, useState} from 'react';
import {getPaintBySlug} from '@/requests/paint';
import {getSimilarPaints} from '@/requests/similarPaints';
import TransitionLink from '@/Animation/TransitionLink';
import { X, ZoomIn, ZoomOut, Maximize, Move } from 'lucide-react';

// Composant Modal de Zoom
function ImageZoomModal({ src, alt, isOpen, onClose }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      document.body.style.overflow = 'unset';
    }

    // Gestion du clavier
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch(e.key) {
        case 'Escape':
          onClose();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case '0':
          handleResetZoom();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Gestion de la molette de la souris
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isOpen) return;
      e.preventDefault();

      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    };

    if (isOpen) {
      document.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  const handleZoomIn = () => setScale(prev => Math.min(prev * 1.3, 5));
  const handleZoomOut = () => setScale(prev => Math.max(prev / 1.3, 0.3));
  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Barre d'outils */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-4">
        <button
          onClick={handleZoomOut}
          className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
          disabled={scale <= 0.3}
          title="Zoom arrière (-)"
        >
          <ZoomOut className="h-5 w-5" />
        </button>

        <span className="text-white text-sm font-medium min-w-[60px] text-center">
          {Math.round(scale * 100)}%
        </span>

        <button
          onClick={handleZoomIn}
          className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
          disabled={scale >= 5}
          title="Zoom avant (+)"
        >
          <ZoomIn className="h-5 w-5" />
        </button>

        <div className="w-px h-6 bg-white/30"></div>

        <button
          onClick={handleResetZoom}
          className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
          title="Taille originale (0)"
        >
          <Maximize className="h-5 w-5" />
        </button>

        {scale > 1 && (
          <>
            <div className="w-px h-6 bg-white/30"></div>
            <div className="flex items-center text-white/70 text-xs">
              <Move className="h-4 w-4 mr-1" />
              Glisser
            </div>
          </>
        )}
      </div>

      {/* Bouton fermer */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors p-3 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80"
        title="Fermer (Échap)"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Image */}
      <div
        className="relative flex items-center justify-center w-full h-full p-4"
        style={{
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
          overflow: 'hidden'
        }}
        onMouseDown={handleMouseDown}
        onClick={scale === 1 ? handleZoomIn : undefined}
      >
        <img
          src={src}
          alt={alt}
          className="transition-transform duration-200 select-none max-w-none"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            maxWidth: scale === 1 ? '90vw' : 'none',
            maxHeight: scale === 1 ? '90vh' : 'none',
            objectFit: 'contain'
          }}
          draggable={false}
        />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm text-center bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
        {scale === 1 ? (
          'Cliquez pour zoomer • Roulette pour zoomer'
        ) : (
          'Glissez pour déplacer • Roulette pour zoomer • Échap pour fermer'
        )}
      </div>
    </div>
  );
}

export default function PaintPage({ params }) {
  const { slug } = use(params);

  const [paint, setPaint] = useState(null);
  const [error, setError] = useState('');
  const [similarPaints, setSimilarPaints] = useState([]);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

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
          {/* Icône d'erreur */}
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
            Retour à l'accueil
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
            className="prose prose-lg max-w-none text-gray-800 mb-12"
            dangerouslySetInnerHTML={{__html: paint.description}}
          />
        )}

        {/* Section Image détaillée */}
        <div className="mb-12">
          <h3 className="text-2xl font-title font-semibold text-gray-900 mb-6">
            Voir l'œuvre en <i>détail</i>
          </h3>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="relative group">
              <div
                className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-300 hover:shadow-xl"
                onClick={() => setIsZoomOpen(true)}
              >
                <img
                  src={paint.image}
                  alt={paint.title}
                  className="w-full h-auto object-contain transition-all duration-500 group-hover:scale-[1.02]"
                  style={{ maxHeight: '600px' }}
                />

                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform scale-90 group-hover:scale-100">
                    <ZoomIn className="h-8 w-8 text-gray-800 mx-auto mb-2" />
                    <p className="text-gray-800 font-medium text-center">
                      Cliquer pour agrandir
                    </p>
                    <p className="text-gray-600 text-sm text-center mt-1">
                      Zoom jusqu'à 500%
                    </p>
                  </div>
                </div>

                {/* Badge coin */}
                <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="h-3 w-3 inline mr-1" />
                  HD
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Astuce :</strong> Cliquez sur l'image pour l'examiner en détail
                </p>
                <div className="flex justify-center items-center space-x-4 text-xs text-gray-500">
                  <span>• Zoom jusqu'à 500%</span>
                  <span>• Navigation par glisser-déposer</span>
                  <span>• Contrôles clavier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de zoom */}
      <ImageZoomModal
        src={paint.image}
        alt={`${paint.title} par ${paint.artist}`}
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
      />

      {/* Section œuvres similaires */}
      {similarPaints.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-title font-semibold text-gray-900 mb-6">
            Œuvres <i>similaires</i>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarPaints.map(similar => (
              <TransitionLink key={similar.slug} href={`/paints/${similar.slug}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-gray-100">
                    <img
                      src={similar.image}
                      alt={similar.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-gray-600 transition-colors">
                    {similar.title}
                  </h4>
                  <p className="text-sm text-gray-500">{similar.artist}</p>
                </div>
              </TransitionLink>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}