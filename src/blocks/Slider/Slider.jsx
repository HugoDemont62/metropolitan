'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getAllPaints } from '@/requests/paints';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import TransitionLink from '@/Animation/TransitionLink';

function getRandomPaints(paints, count = 8) {
  return paints
  .sort(() => Math.random() - 0.5)
  .slice(0, count);
}

export default function Slider() {
  const [paints, setPaints] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    async function fetchPaints() {
      try {
        const allPaints = await getAllPaints();
        setPaints(getRandomPaints(allPaints, 8));
      } catch (error) {
        console.error('Erreur lors du chargement des peintures:', error);
      }
    }
    fetchPaints();
  }, []);

  const rotateCarousel = (newIndex) => {
    if (isAnimating || paints.length === 0) return;

    setIsAnimating(true);
    setCurrentIndex(newIndex);

    const angle = (360 / paints.length) * newIndex;

    gsap.to(carouselRef.current, {
      rotationY: -angle,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => setIsAnimating(false)
    });
  };

  const next = () => {
    const newIndex = (currentIndex + 1) % paints.length;
    rotateCarousel(newIndex);
  };

  const prev = () => {
    const newIndex = (currentIndex - 1 + paints.length) % paints.length;
    rotateCarousel(newIndex);
  };

  const goToSlide = (index) => {
    rotateCarousel(index);
  };

  if (paints.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </section>
    );
  }

  const radius = 320; // Rayon du cercle 3D
  const paintHeight = 400;
  const paintWidth = 300;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Titre de section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-title font-bold text-gray-900 mb-4">
            Œuvres <i>sélectionnées</i>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez une sélection de chefs-d'œuvre de notre collection
          </p>
        </div>

        {/* Container 3D */}
        <div className="relative h-[500px] flex items-center justify-center" style={{ perspective: '1200px' }}>

          {/* Carousel 3D */}
          <div
            ref={carouselRef}
            className="relative"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${-(360 / paints.length) * currentIndex}deg)`,
            }}
          >
            {paints.map((paint, index) => {
              const angle = (360 / paints.length) * index;
              const isCurrent = index === currentIndex;

              return (
                <div
                  key={paint.slug || index}
                  className="absolute top-1/2 left-1/2 group cursor-pointer"
                  style={{
                    width: `${paintWidth}px`,
                    height: `${paintHeight}px`,
                    transform: `
                      translate(-50%, -50%)
                      rotateY(${angle}deg)
                      translateZ(${radius}px)
                      ${isCurrent ? 'scale(1.1)' : 'scale(0.85)'}
                    `,
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.3s ease-out',
                    zIndex: isCurrent ? 10 : 1,
                  }}
                  onClick={() => goToSlide(index)}
                >
                  {/* Cadre du tableau */}
                  <div
                    className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-50 to-amber-100"
                    style={{
                      padding: '20px',
                      border: '8px solid #8B4513',
                      boxShadow: isCurrent
                        ? '0 25px 50px rgba(0,0,0,0.4), inset 0 0 20px rgba(139, 69, 19, 0.3)'
                        : '0 15px 30px rgba(0,0,0,0.2), inset 0 0 10px rgba(139, 69, 19, 0.2)'
                    }}
                  >
                    {/* Image du tableau */}
                    <div className="relative w-full h-[85%] rounded-lg overflow-hidden">
                      <TransitionLink href={`/paints/${paints[currentIndex].slug}`}>
                        <img
                          src={paint.image}
                          alt={paint.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{
                            filter: isCurrent ? 'brightness(1)' : 'brightness(0.7)',
                          }}
                        />

                        {/* Overlay avec info au hover */}
                        <div className={`absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center ${isCurrent ? '' : 'pointer-events-none'}`}>
                          <div className="text-center text-white p-4">
                            <Info className="h-8 w-8 mx-auto mb-2" />
                            <p className="text-sm font-medium">Voir les détails</p>
                          </div>
                        </div>
                      </TransitionLink>
                    </div>

                    {/* Plaque du tableau */}
                    <div className="absolute bottom-2 left-2 right-2 bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg p-3 shadow-inner">
                      <h3 className="font-title text-sm font-bold text-gray-800 truncate">
                        {paint.title}
                      </h3>
                      <p className="text-xs text-gray-600 truncate">
                        {paint.artist}
                      </p>
                      {paint.year && (
                        <p className="text-xs text-gray-500">
                          {paint.year}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Boutons de navigation */}
          <button
            onClick={prev}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border-2 border-gray-200 hover:border-gray-300 rounded-full p-3 shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Tableau précédent"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700 group-hover:text-gray-900" />
          </button>

          <button
            onClick={next}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border-2 border-gray-200 hover:border-gray-300 rounded-full p-3 shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Tableau suivant"
          >
            <ChevronRight className="h-6 w-6 text-gray-700 group-hover:text-gray-900" />
          </button>
        </div>

        {/* Indicateurs de slides */}
        <div className="flex justify-center mt-12 space-x-3">
          {paints.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gray-900 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller au tableau ${index + 1}`}
            />
          ))}
        </div>

        {/* Informations du tableau actuel */}
        <div className="text-center mt-8 max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-2xl font-title font-bold text-gray-900 mb-2">
              {paints[currentIndex]?.title}
            </h3>
            <p className="text-lg text-gray-600 mb-3">
              par {paints[currentIndex]?.artist}
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-500 mb-4">
              {paints[currentIndex]?.year && (
                <span>{paints[currentIndex].year}</span>
              )}
              {paints[currentIndex]?.type && (
                <>
                  <span>•</span>
                  <span>{paints[currentIndex].type}</span>
                </>
              )}
              {paints[currentIndex]?.movement && (
                <>
                  <span>•</span>
                  <span>{paints[currentIndex].movement}</span>
                </>
              )}
            </div>

            {paints[currentIndex] && (
              <TransitionLink href={`/paints/${paints[currentIndex].slug}`}>
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 inline-flex items-center space-x-2">
                  <Info className="h-4 w-4" />
                  <span>Découvrir cette œuvre</span>
                </button>
              </TransitionLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}