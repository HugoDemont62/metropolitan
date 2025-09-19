'use client';

import gsap from 'gsap';
import {useRef, useState} from 'react';
import {useStore} from '@/libs/store';
import {useGSAP} from '@gsap/react';

const fonts = [
  'IM Fell French Canon',
  'Raleway',
];

export default function Preloader({children}) {
  const preloaderRef = useRef();
  const logoRef = useRef();
  const [count, setCount] = useState(0);
  const {isFirstLoad, setIsFirstLoad} = useStore();

  // Calcul de l'index de la police
  const fontIndex = Math.floor(count / 10) % fonts.length;
  const fontFamily = fonts[fontIndex];

  // Style dynamique
  const isBold = count % 40 === 0;
  const isItalic = count % 40 < 10;
  const fontWeight = isBold ? '900' : '400';
  const fontStyle = isItalic ? 'italic' : 'normal';

  useGSAP(() => {
    if (isFirstLoad) { // Si c'est le premier chargement
      gsap.set(preloaderRef.current, {clipPath: 'inset(0%)'}); // Assure que le preloader est visible

      let counter = {val: 0};
      gsap.to(counter, {
        val: 100,
        duration: 4,
        ease: 'power1.inOut',
        onUpdate: () => setCount(Math.floor(counter.val)), // Met à jour le pourcentage
        onComplete: () => {
          gsap.to(preloaderRef.current, {
            clipPath: 'inset(100%)',
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
              if (isFirstLoad) setIsFirstLoad(false);
            },
          });
        },
      });
    }
  }, [isFirstLoad, setIsFirstLoad]);

  return (
    <>
      { !isFirstLoad && <main>{children}</main> }
      <div
        ref={preloaderRef}
        className="pointer-events-none fixed inset-0 z-50 bg-white flex items-center justify-center"
        style={{ display: isFirstLoad ? 'flex' : 'none' }}
      >
      <span
        ref={logoRef}
        className="font-title text-[8rem] text-black"
        style={{
          fontFamily,
          fontWeight,
          fontStyle,
        }}
      >
        Ophelia
      </span>
        <span
          className="absolute right-8 bottom-8 text-3xl text-back"
        >
        {count}%
      </span>
      </div>
    </>
  );
}