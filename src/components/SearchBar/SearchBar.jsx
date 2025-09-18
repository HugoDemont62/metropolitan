'use client';

import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Search} from 'lucide-react';
import {getAllPaints} from '@/requests/paints';
import TransitionLink from '@/Animation/TransitionLink';

export default function SearchBar({onSelect}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      setLoading(true);

      const maximumResults = 6;
      getAllPaints().then(objects => {
        const filtered = objects.filter(
          obj =>
            obj.title &&
            obj.title.toLowerCase().includes(query.toLowerCase()),
        ).slice(0, maximumResults);

        if (filtered.length < 6) {
          const filteredSlugs = filtered.map(obj => obj.slug);
          const additional = objects.filter(
            obj =>
              obj.description &&
              obj.description.toLowerCase().includes(query.toLowerCase()) &&
              !filteredSlugs.includes(obj.slug),
          ).slice(0, maximumResults - filtered.length);
          filtered.push(...additional);
        }
        setResults(filtered);
      }).finally(() => setLoading(false));
    }, 500); // attente 500ms après la dernière frappe
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-64">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500"/>
      <Input
        type="search"
        placeholder="Rechercher..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="pl-8 bg-transparent border-gray-300 focus:border-gray-500 rounded-full"
        autoComplete="off"
      />
      {query && (
        <ul
          className="absolute left-0 top-10 w-full bg-white border rounded shadow z-10">
          {loading && <li className="p-2 text-gray-400">Chargement...</li>}
          {!loading && results.map(paint => (
            <TransitionLink href={`/paints/${paint.slug}`}
                            className="block w-full">
              <li
                key={paint.slug}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => onSelect?.(paint)}
              >

                {paint.title}

              </li>
            </TransitionLink>
          ))}
          {!loading && results.length === 0 && (
            <li className="p-2 text-gray-400">Aucune œuvre trouvée</li>
          )}
        </ul>
      )}
    </div>
  );
}