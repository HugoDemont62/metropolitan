'use client';

import {useEffect, useMemo, useState} from 'react';
import {getAllPaints} from '@/requests/paints';
import {getPaintById} from '@/requests/paint';
import {Input} from '@/components/ui/input';
import {Filter, Loader2, Search} from 'lucide-react';
import Image from '@/elements/Image';

export default function Paints() {
  // États pour les données et filtres
  const [paintingIds, setPaintingIds] = useState([]);
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedCulture, setSelectedCulture] = useState('all');
  const [isOnView, setIsOnView] = useState(false);

  // Charger les IDs des peintures
  useEffect(() => {
    async function fetchPaintingIds() {
      try {
        setLoading(true);
        return await getAllPaints();
      } catch (error) {
        console.error('Erreur lors du chargement des IDs:', error);
        setPaintingIds([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPaintingIds();
  }, []);

  // Charger les détails des peintures par lots
  useEffect(() => {
    if (paintingIds.length === 0) return;

    async function fetchPaintingDetails() {
      try {
        setLoadingDetails(true);
        const detailsPromises = paintingIds.map(async (id) => {
          try {
            return await getPaintById(id);
          } catch (error) {
            console.error(`Erreur pour l'œuvre ${id}:`, error);
            return null;
          }
        });

        const results = await Promise.all(detailsPromises);
        // Filtrer les résultats null et ne garder que les peintures avec images
        const validPaintings = results.filter(painting =>
          painting &&
          painting.primaryImageSmall &&
          painting.title &&
          painting.objectName &&
          painting.objectName.toLowerCase().includes('painting'),
        );

        setPaintings(validPaintings);
      } catch (error) {
        console.error('Erreur lors du chargement des détails:', error);
      } finally {
        setLoadingDetails(false);
      }
    }

    fetchPaintingDetails();
  }, [paintingIds]);

  // Extraire les départements et cultures uniques pour les filtres
  const {departments, cultures} = useMemo(() => {
    if (!paintings.length) return {departments: [], cultures: []};

    const depts = [
      ...new Set(paintings.map(p => p.department).filter(Boolean))];
    const cults = [...new Set(paintings.map(p => p.culture).filter(Boolean))];

    return {
      departments: depts.sort(),
      cultures: cults.sort(),
    };
  }, [paintings]);

  // Filtrer les peintures selon les critères
  const filteredPaintings = useMemo(() => {
    return paintings.filter(painting => {
      // Filtre par terme de recherche
      if (searchTerm) {
        const matchesTitle = painting.title &&
          painting.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesArtist = painting.artistDisplayName &&
          painting.artistDisplayName.toLowerCase().
            includes(searchTerm.toLowerCase());
        const matchesMedium = painting.medium &&
          painting.medium.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesTitle && !matchesArtist && !matchesMedium) {
          return false;
        }
      }

      // Filtre par département
      if (selectedDepartment !== 'all' && painting.department !==
        selectedDepartment) {
        return false;
      }

      // Filtre par culture
      if (selectedCulture !== 'all' && painting.culture !== selectedCulture) {
        return false;
      }

      // Filtre par exposition actuelle (domaine public)
      if (isOnView && !painting.isPublicDomain) {
        return false;
      }

      return true;
    });
  }, [paintings, searchTerm, selectedDepartment, selectedCulture, isOnView]);

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('all');
    setSelectedCulture('all');
    setIsOnView(false);
  };

  // Composant pour une carte de peinture
  const PaintingCard = ({painting}) => (
    <div className="group cursor-pointer">
      <div
        className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3">
        <div className="relative w-full h-full">
          <Image
            src={painting.primaryImageSmall}
            alt={painting.title || 'Peinture'}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Badge domaine public */}
        {painting.isPublicDomain && (
          <div className="absolute top-2 right-2">
            <span
              className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
              Domaine public
            </span>
          </div>
        )}

        {/* Overlay au survol */}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"/>

        {/* Informations au survol */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-xs opacity-90">
            {painting.medium}
          </p>
          {painting.dimensions && (
            <p className="text-white text-xs opacity-75">
              {painting.dimensions}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <h3
          className="font-medium text-sm line-clamp-2 group-hover:text-gray-600 transition-colors">
          {painting.title}
        </h3>
        {painting.artistDisplayName && (
          <p className="text-xs text-gray-500">
            {painting.artistDisplayName}
          </p>
        )}
        <div className="flex items-center justify-between">
          {painting.objectDate && (
            <p className="text-xs text-gray-400">
              {painting.objectDate}
            </p>
          )}
          {painting.department && (
            <p className="text-xs text-gray-400">
              {painting.department}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // État de chargement initial
  if (loading) {
    return (
      <main className="container mx-auto px-6 py-8">
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
    <main className="container mx-auto px-6 py-8">
      {/* En-tête */}
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

      {/* Barre de recherche et filtres */}
      <div className="mb-8 space-y-4">
        {/* Recherche */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500"/>
          <Input
            type="search"
            placeholder="Rechercher par titre, artiste ou technique..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-transparent border-gray-300 focus:border-gray-500 rounded-full"
          />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500"/>
            <span className="text-sm font-medium text-gray-700">Filtres:</span>
          </div>

          {/* Filtre département */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="text-sm border border-gray-300 rounded-full px-3 py-1 bg-transparent focus:border-gray-500 focus:outline-none"
          >
            <option value="all">Tous les départements</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Filtre culture */}
          <select
            value={selectedCulture}
            onChange={(e) => setSelectedCulture(e.target.value)}
            className="text-sm border border-gray-300 rounded-full px-3 py-1 bg-transparent focus:border-gray-500 focus:outline-none"
          >
            <option value="all">Toutes les cultures</option>
            {cultures.map(culture => (
              <option key={culture} value={culture}>{culture}</option>
            ))}
          </select>

          {/* Filtre exposition */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isOnView}
              onChange={(e) => setIsOnView(e.target.checked)}
              className="rounded border-gray-300"
            />
            Domaine public
          </label>

          {/* Bouton reset */}
          {(searchTerm || selectedDepartment !== 'all' || selectedCulture !==
            'all' || isOnView) && (
            <button
              onClick={resetFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Réinitialiser
            </button>
          )}

          {/* Compteur résultats */}
          <div className="text-sm text-gray-500 ml-auto">
            {filteredPaintings.length} résultat{filteredPaintings.length > 1
            ? 's'
            : ''}
          </div>
        </div>
      </div>

      {/* Grille des peintures */}
      {filteredPaintings.length > 0 ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPaintings.map((painting, index) => (
            <PaintingCard key={painting.objectID || index} painting={painting}/>
          ))}
        </div>
      ) : loadingDetails ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3 animate-pulse">
              <div className="aspect-[3/4] bg-gray-200 rounded-lg"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
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