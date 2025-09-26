'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getAllPaints } from '@/requests/paints';
import { gsap } from 'gsap';

function getRandomPaints(paints, count = 6) {
  return paints
  .sort(() => Math.random() - 0.5)
  .slice(0, count);
}

export default function Slider() {
  const [paints, setPaints] = useState([]);
  const [current, setCurrent] = useState(0);
  const centerRef = useRef();

  useEffect(() => {
    async function fetchPaints() {
      const allPaints = await getAllPaints();
      setPaints(getRandomPaints(allPaints));
    }
    fetchPaints();
  }, []);

  useEffect(() => {
    if (centerRef.current) {
      gsap.fromTo(
        centerRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [current]);

  if (paints.length === 0) return <div className="text-center py-10">Chargement...</div>;

  const next = () => setCurrent((c) => (c + 1) % paints.length);
  const prev = () => setCurrent((c) => (c - 1 + paints.length) % paints.length);

  const leftIdx = (current - 1 + paints.length) % paints.length;
  const rightIdx = (current + 1) % paints.length;

  return (
    <div className="max-w-[600px] aspect-[3/4] mx-auto my-10 relative flex items-center justify-center" style={{ perspective: 1200 }}>
      {/* Œuvre de gauche */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[220px] h-[320px] rounded-xl overflow-hidden shadow-lg"
        style={{
          transform: 'translateX(-40%) rotateY(35deg) scale(0.85)',
          zIndex: 1,
          transition: 'transform 0.5s',
        }}
      >
        <img
          src={paints[leftIdx].image}
          alt={paints[leftIdx].title}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Œuvre centrale */}
      <div
        ref={centerRef}
        className="w-[260px] h-[380px] rounded-2xl overflow-hidden shadow-2xl relative"
        style={{
          transform: 'rotateY(0deg) scale(1)',
          zIndex: 2,
          transition: 'transform 0.5s',
        }}
      >
        <img
          src={paints[current].image}
          alt={paints[current].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-5 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-white font-semibold text-xl m-0 drop-shadow">{paints[current].title}</h3>
        </div>
      </div>
      {/* Œuvre de droite */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[220px] h-[320px] rounded-xl overflow-hidden shadow-lg"
        style={{
          transform: 'translateX(40%) rotateY(-35deg) scale(0.85)',
          zIndex: 1,
          transition: 'transform 0.5s',
        }}
      >
        <img
          src={paints[rightIdx].image}
          alt={paints[rightIdx].title}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Boutons */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-none rounded-full w-10 h-10 text-2xl text-white flex items-center justify-center z-20 transition"
        aria-label="Précédent"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-none rounded-full w-10 h-10 text-2xl text-white flex items-center justify-center z-20 transition"
        aria-label="Suivant"
      >
        ›
      </button>
      <div className="absolute top-3 right-1/2 translate-x-1/2 text-white text-sm bg-black/30 rounded px-3 py-1 z-30">
        {current + 1} / {paints.length}
      </div>
    </div>
  );
}