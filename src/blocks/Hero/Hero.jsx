import RevealText from '@/Animation/RevealText';
import Image from 'next/image';
import TransitionLink from '@/Animation/TransitionLinkGSAP';

export default function Hero() {
  return (
    <>
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/2560px-John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg"
          alt="Hero Image Ophelia painting"
          fill
          priority
          className="object-cover w-full h-full absolute top-0 left-0 z-0"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <RevealText className="text-white text-7xl mb-8 text-center drop-shadow-lg">
            <h1>OPHELIA <i>Museum</i></h1>
          </RevealText>
          <div className="flex gap-4 px-6 py-3 z-250 bg-opacity-70 text-white hover:text-[#7CA267] hover:scale-110 transition">
            <TransitionLink href="/paints">
              Voir les peintures
            </TransitionLink>
          </div>
        </div>
      </div>
    </>
  );
}