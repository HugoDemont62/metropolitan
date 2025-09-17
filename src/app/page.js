import Hero from '@/blocks/Hero';
import Header from '@/blocks/Header';
import Footer from '@/blocks/Footer';

export default function Home() {
  return (
    <div>
      <Header className="fixed"/>
      <Hero/>
      <Footer/>
    </div>
  );
}
