"use client";

import TransitionLink from '@/Animation/TransitionLink';
import SearchBar from '@/components/SearchBar/SearchBar';
import Logo from '@/components/Logo/Logo';

export default function Header() {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between gap-6">
      {/* Logo */}
      <Logo />

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