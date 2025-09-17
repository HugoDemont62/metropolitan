import Header from '@/blocks/Header';

export const metadata = {
  title: 'Billetterie - Ophelia Museum',
  description: 'Découvrez notre collection de peintures et œuvres d\'art',
};

export default function BilletLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}