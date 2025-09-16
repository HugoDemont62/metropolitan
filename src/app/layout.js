import { IM_Fell_French_Canon, Raleway } from "next/font/google";
import "./globals.css";
import Lenis from '@/libs/Lenis';
import GSAP from '@/libs/GSAP';
import Cursor from '@/libs/Cursor';

const imFellFrenchCanon = IM_Fell_French_Canon({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400"], // poids standard
});

const raleway = Raleway({
  variable: "--font-text",
  subsets: ["latin"],
  weight: ["400"], // poids standard
});

export const metadata = {
  title: "Ophelia Museum",
  description: "Museum of arts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${imFellFrenchCanon.variable} ${raleway.variable} antialiased`}>
        <Lenis>
          <GSAP />
          {children}
          <Cursor />
        </Lenis>
      </body>
    </html>
  );
}