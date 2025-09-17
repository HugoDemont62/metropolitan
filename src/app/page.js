import Hero from '@/blocks/Hero';
import Header from '@/blocks/Header';

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <Header className="absolute top-0 left-0 w-full z-20" />
      <Hero />
    </div>
  );
}
