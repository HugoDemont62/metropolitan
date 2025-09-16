'use client';
import {getAllPaints} from '@/requests/paints';

export default function Paints() {
  // Exemple de données de peintures (à remplacer par vos vraies données)
  const paintings = getAllPaints();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl mb-8 font-title">Nos Peintures</h1>
    </main>
  );
}