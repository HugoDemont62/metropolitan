import Hero from '@/blocks/Hero';
import Header from '@/blocks/Header';
import Footer from '@/blocks/Footer';
import Slider from '@/blocks/Slider/Slider';

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Header/>
      <Hero/>
      <Slider />
      <Footer/>
    </div>
  );
}
