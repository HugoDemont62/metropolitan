import { getPaintBySlug } from '@/requests/paint';

export async function generateMetadata({ params }) {
  const paint = await getPaintBySlug(params.slug);
  if (!paint) {
    return {
      title: 'Œuvre non trouvée - Ophelia Museum',
      description: 'Œuvre introuvable dans le musée.',
    };
  }
  return {
    title: `${paint.title} - Ophelia Museum`,
    description: paint.description || 'Découvrez cette œuvre au musée Ophelia.',
  };
}
export default function PaintLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}