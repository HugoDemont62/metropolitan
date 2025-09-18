"use client";

import TransitionLink from '@/Animation/TransitionLink';
import SearchBar from '@/components/SearchBar/SearchBar';

export default function Header() {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <TransitionLink href="/" className="font-serif leading-none ">
        <h1 className="text-2xl tracking-wider mb-[-10px]">OPHELIA</h1>
        <h2 className="text-xl tracking-wide"><i>Museum</i></h2>
      </TransitionLink>

      {/* Navigation */}
      <nav className="flex space-x-6 text-sm font-medium">
        <TransitionLink href="/paints"
                        className="hover:text-gray-600 transition-colors">
          Peintures
        </TransitionLink>
        <TransitionLink href="/billetteries"
                        className="hover:text-gray-600 transition-colors">
          Billetteries
        </TransitionLink>
      </nav>

      {/* Recherche */}
      <SearchBar onSelect={oeuvre => {/* action sur sélection */}}/>
    </header>
  );
}