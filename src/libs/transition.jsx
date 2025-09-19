'use client';

import gsap from 'gsap';
import {usePathname, useRouter} from 'next/navigation';
import {useRef, useState} from 'react';
import {useGSAP} from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

import {useStore} from '@/libs/store';

export default function Transition({children}) {
  const transitionRef = useRef();
  const pathname = usePathname();
  const router = useRouter();
  const { // recupération des états globaux
    isTransitionActive,
    setIsTransitionActive,
    isFirstLoad,
    setIsFirstLoad,
    pageToGoTo,
    setPageToGoTo,
  } = useStore();
  const [visible, setVisible] = useState(false);

  const getWaveClipPath = (progress, direction = 'up') => {
    const amplitude = 5;    // Hauteur de la vague
    const frequency = 2;    // Nombre d'oscillations
    const points = [];      // Points du polygone
    const steps = 100;      // Précision de la vague, 100 pour avoir quelque chose de fluide

    for (let i = 0; i <= steps; i++) {
      const x = (i * 100) / steps; // Position horizontale sur l'écran en %
      let y;

      if (direction === 'up') {
        // La base monte selon le progress, la sinusoïde ajoute l'effet de vague
        y = 100 - (progress * 100) + amplitude *
          Math.sin((Math.PI * i * frequency) / steps + progress * Math.PI * 4);
      } else if (direction === 'down') {
        y = (progress * 100) + amplitude *
          Math.sin((Math.PI * i * frequency) / steps + progress * Math.PI * 4);
      }

      y = Math.max(0, Math.min(100, y)); // Y max entre 0 et 100 (max de l'écran)
      points.push(`${x}% ${y}%`);
    }

    // Ferme le polygone selon la direction
    if (direction === 'up') {
      points.push('100% 100%', '0% 100%');
    } else {
      points.push('100% 0%', '0% 0%');
    }

    // Retourne la chaîne CSS du polygone
    return `polygon(${points.join(', ')})`;
  };

  const _show = () => {
    setVisible(true);
    gsap.set(transitionRef.current, {
      clipPath: getWaveClipPath(0, 'up'),
    });

    const tl = gsap.timeline({
      onComplete: () => {
        // Navigation vers la nouvelle page après l'animation
        if (pageToGoTo && !isFirstLoad) {
          router.push(pageToGoTo);
        }
      },
    });

    tl.to(transitionRef.current, {
      duration: 1.3,
      ease: 'power2.inOut',
      onUpdate: function() {
        const progress = this.progress();
        gsap.set(transitionRef.current, {
          clipPath: getWaveClipPath(progress, 'up'),
          visibility: 'visible',
        });
      },
    });
  };

  const _hide = () => {
    if (!transitionRef.current) return;

    gsap.set(transitionRef.current, {
      clipPath: getWaveClipPath(1, 'down'), // Commencer avec la vague en haut
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFirstLoad(false);
        setIsTransitionActive(false);
        setVisible(false);
        setPageToGoTo(null); // Reset la destination
      },
    });

    tl.to(transitionRef.current, {
      duration: 1.3,
      ease: 'power2.inOut',
      onUpdate: function() {
        const progress = 1 - this.progress(); // Inverser le progress pour descendre
        gsap.set(transitionRef.current, {
          clipPath: getWaveClipPath(progress, 'down'),
        });
      },
    });
  };

  useGSAP(() => {
    ScrollTrigger.refresh();
    if (!isFirstLoad) {
      setVisible(true);
      _hide();
    }
  }, [pathname]);

  useGSAP(() => {
    if (isTransitionActive && !isFirstLoad) {
      _show();
    }
  }, [isTransitionActive]);

  return (
    <>
      <main>{children}</main>
      <div
        ref={transitionRef}
        className={`fixed inset-0 bg-gradient-to-br bg-black  z-[9999] pointer-events-none`}
        style={{
          clipPath: getWaveClipPath(0, 'up'),
          visibility: visible ? 'visible' : 'hidden',
        }}
      />
    </>
  );
}