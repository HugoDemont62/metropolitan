import {Input} from '@/components/ui/input';
import {Search} from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <a href="/" className="font-serif leading-none">
        <h1 className="text-2xl tracking-wider mb-[-10px]">OPHELIA</h1>
        <h2 className="text-xl tracking-wide"><i>Museum</i></h2>
      </a>

      {/* Navigation */}
      <nav className="flex space-x-6 text-sm font-medium">
        <a href="/paints" className="hover:text-gray-600 transition-colors">
          Peintures
        </a>
        <a href="/billetteries" className="hover:text-gray-600 transition-colors">
          Billetteries
        </a>
      </nav>

      {/* Recherche */}
      <div className="relative w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500"/>
        <Input
          type="search"
          placeholder="Rechercher..."
          className="pl-8 bg-transparent border-gray-300 focus:border-gray-500 rounded-full"
        />
      </div>
    </header>
  );
}