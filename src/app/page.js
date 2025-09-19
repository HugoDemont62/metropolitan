import Hero from '@/blocks/Hero';
import Header from '@/blocks/Header';
import Footer from '@/blocks/Footer';
import Slider from '@/blocks/Slider/Slider';
import About from '@/blocks/About';

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Header/>
      <Hero/>
      <Slider />
      <About />
      <Footer/>
    </div>
  );
}
