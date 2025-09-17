'use client';

import {useEffect, useMemo, useState} from 'react';
import {getAllPaints} from '@/requests/paints';
import {Input} from '@/components/ui/input';
import {Filter, Loader2, Search} from 'lucide-react';
import Image from '@/elements/Image';

export default function Paints() {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedMovement, setSelectedMovement] = useState('all');
  const [isOnView, setIsOnView] = useState(false);

  // Charger toutes les peintures
  useEffect(() => {
    async function fetchPaintings() {
      try {
        setLoading(true);
        const data = await getAllPaints();
        console.log(data);
        // Vérifier si c’est un tableau ou un seul objet
        const normalized = Array.isArray(data) ? data : [data];

        setPaintings(normalized);
      } catch (error) {
        console.error('Erreur lors du chargement des peintures:', error);
        setPaintings([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPaintings();
  }, []);

  // Extraire locations & movements uniques
  const {locations, movements} = useMemo(() => {
    if (!Array.isArray(paintings)) return {locations: [], movements: []};

    const locs = [...new Set(paintings.map(p => p.location).filter(Boolean))];
    const mvts = [...new Set(paintings.map(p => p.movement).filter(Boolean))];

    return {
      locations: locs.sort(),
      movements: mvts.sort(),
    };
  }, [paintings]);

  // Filtrer les peintures
  const filteredPaintings = useMemo(() => {
    if (!Array.isArray(paintings)) return [];

    return paintings.filter(painting => {
      // Recherche
      if (searchTerm) {
        const matchesTitle = painting.title?.toLowerCase().
          includes(searchTerm.toLowerCase());
        const matchesArtist = painting.artist?.toLowerCase().
          includes(searchTerm.toLowerCase());
        const matchesType = painting.type?.toLowerCase().
          includes(searchTerm.toLowerCase());

        if (!matchesTitle && !matchesArtist && !matchesType) return false;
      }
      if (selectedLocation !== 'all' && painting.location !==
        selectedLocation) {
        return false;
      }
      if (selectedMovement !== 'all' && painting.movement !==
        selectedMovement) {
        return false;
      }

      return !(isOnView && !painting.isPublicDomain);

    });
  }, [paintings, searchTerm, selectedLocation, selectedMovement, isOnView]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('all');
    setSelectedMovement('all');
    setIsOnView(false);
  };

  const PaintingCard = ({painting}) => (
    <a href={'/paints/' + painting.slug} className="group cursor-pointer">
      <div
        className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3">
        <div className="relative w-full h-full">
          <Image
            src={painting.image}
            alt={painting.title || 'Peinture'}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"/>

        <div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-xs opacity-90">{painting.type}</p>
          {painting.year && (
            <p className="text-white text-xs opacity-75">{painting.year}</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <h3
          className="font-medium text-sm line-clamp-2 group-hover:text-gray-600 transition-colors">
          {painting.title}
        </h3>
        {painting.artist && (
          <p className="text-xs text-gray-500">{painting.artist}</p>
        )}
        <div className="flex items-center justify-between">
          {painting.year && (
            <p className="text-xs text-gray-400">{painting.year}</p>
          )}
          {painting.location && (
            <p className="text-xs text-gray-400">{painting.location}</p>
          )}
        </div>
      </div>
    </a>
  );

  if (loading) {
    return (
      <main className="px-6 py-8">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-18">
      <div className="mb-8">
        <h1 className="text-4xl mb-4 font-title tracking-wider">Nos
          Peintures</h1>
        <p className="text-gray-600 text-sm">
          Découvrez notre collection de {paintings.length} œuvres d'art
          {loadingDetails && (
            <span className="inline-flex items-center ml-2">
              <Loader2 className="h-3 w-3 animate-spin mr-1"/>
              Chargement en cours...
            </span>
          )}
        </p>
      </div>

      {/* Recherche + Filtres */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500"/>
          <Input
            type="search"
            placeholder="Rechercher par titre, artiste ou type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-transparent border-gray-300 focus:border-gray-500 rounded-full"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500"/>
            <span className="text-sm font-medium text-gray-700">Filtres:</span>
          </div>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="text-sm border border-gray-300 rounded-full px-3 py-1 bg-transparent focus:border-gray-500 focus:outline-none"
          >
            <option value="all">Toutes les locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            value={selectedMovement}
            onChange={(e) => setSelectedMovement(e.target.value)}
            className="text-sm border border-gray-300 rounded-full px-3 py-1 bg-transparent focus:border-gray-500 focus:outline-none"
          >
            <option value="all">Tous les mouvements</option>
            {movements.map(mvt => (
              <option key={mvt} value={mvt}>{mvt}</option>
            ))}
          </select>

          {(selectedLocation !== 'all' || selectedMovement !== 'all' ||
            isOnView) && (
            <button
              onClick={resetFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Réinitialiser
            </button>
          )}

          <div className="text-sm text-gray-500 ml-auto">
            {filteredPaintings.length} résultat{filteredPaintings.length > 1
            ? 's'
            : ''}
          </div>
        </div>
      </div>

      {/* Grille */}
      {filteredPaintings.length > 0 ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPaintings.map((painting, index) => (
            <PaintingCard key={painting.id || index} painting={painting}/>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50"/>
            <p className="text-lg mb-2">Aucune peinture trouvée</p>
            <p className="text-sm">
              Essayez de modifier vos critères de recherche ou vos filtres
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
