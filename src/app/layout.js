import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Lenis from '@/libs/Lenis';
import GSAP from '@/libs/GSAP';
import Cursor from '@/libs/Cursor';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Metropolitan",
  description: "Museum of Contemporary Art",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Lenis>
        <GSAP />
        {children}
        <Cursor />
      </Lenis>
      </body>
    </html>
  );
}
