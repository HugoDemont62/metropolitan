'use client';
import gsap from 'gsap';
import {useRef, useState} from 'react';
import {useStore} from '@/libs/store';
import {useGSAP} from '@gsap/react';

export default function Preloader({children}) {
  const preloaderRef = useRef();
  const logoRef = useRef();
  const [count, setCount] = useState(0);
  const {isFirstLoad, setIsFirstLoad} = useStore();

  useGSAP(() => {
    if (isFirstLoad) {
      gsap.set(preloaderRef.current, {clipPath: 'inset(0%)'});
      gsap.fromTo(
        logoRef.current,
        {scale: 0.5, opacity: 0},
        {scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out'},
      );
      let counter = {val: 0};
      gsap.to(counter, {
        val: 100,
        duration: 1.2,
        ease: 'power1.inOut',
        onUpdate: () => setCount(Math.floor(counter.val)),
        onComplete: () => {
          gsap.to(preloaderRef.current, {
            clipPath: 'inset(100% 0% 0% 100%)',
            duration: 0.8,
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
      <main>{children}</main>
      <div
        ref={preloaderRef}
        className="pointer-events-none fixed inset-0 z-50 bg-black flex items-center justify-center"
        style={{clipPath: 'inset(0%)', transition: 'clip-path 0.8s'}}
      >
        <span
          ref={logoRef}
          className="font-title text-[8rem]  text-white"
        >
          <i>O</i>
        </span>
        <span
          className="absolute right-8 bottom-8 text-3xl  text-white"
        >
          {count}%
        </span>
      </div>
    </>
  );
}