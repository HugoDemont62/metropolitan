import {IM_Fell_French_Canon, Raleway} from 'next/font/google';
import './globals.css';
import Lenis from '@/libs/Lenis';
import GSAP from '@/libs/GSAP';
import Cursor from '@/libs/Cursor';
import Preloader from '@/libs/preloader';
import {ViewTransitions} from 'next-view-transitions';

const imFellFrenchCanon = IM_Fell_French_Canon({
  variable: '--font-title',
  subsets: ['latin'],
  weight: ['400'], // poids standard
});

const raleway = Raleway({
  variable: '--font-text',
  subsets: ['latin'],
  weight: ['400'], // poids standard
});

export const metadata = {
  title: 'Ophelia Museum',
  description: 'Museum of arts',
};

export default function RootLayout({children}) {
  return (
    <ViewTransitions>
      <html lang="en">
      <body className={`${imFellFrenchCanon.variable} ${raleway.variable} antialiased`}>
      <Preloader>
        {/*<Transition>*/}
        <Lenis>
          <GSAP/>
          {children}
          <Cursor/>
        </Lenis>
        {/*</Transition>*/}
      </Preloader>
      </body>
      </html>
    </ViewTransitions>

  );
}