// import { useRef } from 'react';
//       import { gsap } from 'gsap';
//       import { usePathname } from 'next/navigation';
//       import Link from 'next/link';
//
//       function getWaveClipPath(progress) {
//         const amplitude = 10;
//         const points = [];
//         const steps = 8;
//         for (let i = 0; i <= steps; i++) {
//           const x = (i * 100) / steps;
//           const y =
//             100 -
//             amplitude *
//             Math.sin((Math.PI * i) / steps + progress * Math.PI * 2);
//           points.push(`${x}% ${y}%`);
//         }
//         points.push('100% 100%', '0% 100%');
//         return `polygon(${points.join(',')})`;
//       }
//
//       export default function TransitionLinkGSAP({ children, href, className }) {
//         const router = useTransitionRouter();
//         const pathname = usePathname();
//         const overlayRef = useRef();
//
//         function triggerWaveTransition(callback) {
//           gsap.fromTo(
//             overlayRef.current,
//             { clipPath: getWaveClipPath(0) },
//             {
//               clipPath: getWaveClipPath(1),
//               duration: 1.2,
//               ease: 'power2.inOut',
//               onComplete: callback,
//             }
//           );
//         }
//
//         const handleNavigation = (path) => (e) => {
//           if (path === pathname) {
//             e.preventDefault();
//             return;
//           }
//           e.preventDefault();
//           triggerWaveTransition(() => router.push(path));
//         };
//
//         return (
//           <>
//             <div
//               ref={overlayRef}
//               style={{
//                 position: 'fixed',
//                 inset: 0,
//                 background: '#fff',
//                 pointerEvents: 'none',
//                 zIndex: 9999,
//                 clipPath: getWaveClipPath(0),
//               }}
//             />
//             <Link onClick={handleNavigation(href)} href={href} className={className}>
//               {children}
//             </Link>
//           </>
//         );
//       }