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
    const amplitude = 5;
    const frequency = 2;
    const points = [];
    const steps = 100;

    for (let i = 0; i <= steps; i++) {
      const x = (i * 100) / steps;
      let y;

      if (direction === 'up') {
        // Vague qui monte du bas vers le haut
        y = 100 - (progress * 100) + amplitude *
          Math.sin((Math.PI * i * frequency) / steps + progress * Math.PI * 4);
      } else {
        // Vague qui descend du haut vers le bas
        y = (progress * 100) + amplitude *
          Math.sin((Math.PI * i * frequency) / steps + progress * Math.PI * 4);
      }

      y = Math.max(0, Math.min(100, y));
      points.push(`${x}% ${y}%`);
    }

    if (direction === 'up') {
      points.push('100% 100%', '0% 100%');
    } else {
      points.push('100% 0%', '0% 0%');
    }

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
      duration: 0.8,
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
      delay: 0.2,
      onComplete: () => {
        setIsFirstLoad(false);
        setIsTransitionActive(false);
        setVisible(false);
        setPageToGoTo(null); // Reset la destination
      },
    });

    tl.to(transitionRef.current, {
      duration: 0.9,
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
        className={`fixed inset-0 bg-gradient-to-br backdrop-blur-md  z-[9999] pointer-events-none ${!visible ? 'hidden' : ''}`}
        style={{
          background: 'rgba(0, 0, 0, 0.3)',
          clipPath: getWaveClipPath(0, 'up'),
          visibility: visible ? 'visible' : 'hidden'
        }}
      />
    </>
  );
}