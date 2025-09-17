'use client';

import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import {useRef} from 'react';
import {usePathname} from 'next/navigation';

export function useRevealer() {}

export default function Revealer() {
  const pathname = usePathname();
  const revealerRef = useRef(null);

  useGSAP(() => {
    gsap.set(revealerRef.current, {
      scaleY: 1,
    });

    gsap.to(revealerRef.current, {
      scaleY: 0,
      duration: 1.25,
      delay: 1,
      ease: 'hop',
    });
  }, [pathname]);

  return <div ref={revealerRef} className="revealer"/>;
}


