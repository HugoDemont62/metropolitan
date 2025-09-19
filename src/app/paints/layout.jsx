import Header from '@/blocks/Header';
import Footer from '@/blocks/Footer';

export const metadata = {
  title: 'Peintures - Ophelia Museum',
  description: 'Découvrez notre collection de peintures et œuvres d\'art',
};

export default function PaintsLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer backgroundColor="#f5e9d7" textColor="#2a1a0a" />
    </div>
  );
}