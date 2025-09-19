import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="flex flex-col md:flex-row items-center justify-between bg-white rounded shadow p-8  ">
      <div className="md:w-1/2 md:pr-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">À propos de l'Ophelia Museum</h2>
        <p className="mb-3 text-gray-700">
          L'Ophelia Museum est un musée d'art contemporain situé au cœur de Paris, dédié à la promotion de l'art moderne et des artistes émergents. Fondé en 2021, il propose des expositions temporaires, une collection permanente et des événements culturels tout au long de l'année.
        </p>
        <p className="mb-2 text-gray-600">
          <strong>Adresse:</strong> 12 rue Imaginaire, 75003 Paris
        </p>
        <p className="mb-2 text-gray-600">
          <strong>Horaires:</strong> Ouvert du mardi au dimanche, de 10h à 18h. Fermé le lundi.
        </p>
        <p className="text-gray-700">
          La collection comprend des œuvres de grands artistes contemporains tels que Yayoi Kusama, Jean-Michel Basquiat et Ai Weiwei, ainsi que des talents locaux. Le musée propose également des ateliers pour enfants et adultes, et une librairie spécialisée.
        </p>
        <p className="text-gray-700">
          Vive l'IA
        </p>
      </div>
      <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
        <Image
          src="/images/image 8.png"
          alt="Ophelia Museum façade"
          width={400}
          height={300}
          className="rounded-lg shadow-lg object-cover"
        />
      </div>
    </section>
  );
}