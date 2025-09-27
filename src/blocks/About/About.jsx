import Image from 'next/image';
import RevealText from '@/Animation/RevealText';
import { MapPin, Clock, Users, Award } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* En-tête de section */}
        <div className="text-center mb-16">
          <RevealText className="text-4xl md:text-5xl font-title font-bold text-gray-900 mb-4">
            <h2>À propos de l'<i>Ophelia Museum</i></h2>
          </RevealText>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un voyage à travers l'art moderne et contemporain au cœur de Paris
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Contenu textuel */}
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                L'Ophelia Museum est un musée d'art contemporain situé au cœur de Paris, dédié à la promotion de l'art moderne et des artistes émergents. Fondé en 2021, il propose des expositions temporaires, une collection permanente et des événements culturels tout au long de l'année.
              </p>

              <p className="text-gray-700 leading-relaxed">
                La collection comprend des œuvres de grands artistes contemporains tels que Yayoi Kusama, Jean-Michel Basquiat et Ai Weiwei, ainsi que des talents locaux. Le musée propose également des ateliers pour enfants et adultes, et une librairie spécialisée.
              </p>
            </div>

            {/* Informations pratiques avec icônes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Adresse</h4>
                    <p className="text-sm text-gray-600">
                      12 rue Imaginaire<br />
                      75003 Paris, France
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Horaires</h4>
                    <p className="text-sm text-gray-600">
                      Mardi - Dimanche : 10h - 18h<br />
                      <span className="text-red-500">Fermé le lundi</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Activités</h4>
                    <p className="text-sm text-gray-600">
                      Ateliers enfants & adultes<br />
                      Librairie spécialisée
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Reconnaissance</h4>
                    <p className="text-sm text-gray-600">
                      Musée certifié<br />
                      Arts & Culture Paris
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image et statistiques */}
          <div className="relative">
            {/* Image principale avec cadre effet musée */}
            <div className="relative">
              <div
                className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl transform rotate-2"
                style={{
                  padding: '12px',
                  background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #8B4513 100%)',
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl transform -rotate-1"
                style={{
                  padding: '8px',
                  background: 'linear-gradient(135deg, #654321 0%, #8B4513 50%, #654321 100%)',
                  top: '4px',
                  left: '4px',
                  right: '4px',
                  bottom: '4px'
                }}
              />
              <div className="relative bg-white p-4 rounded-2xl shadow-2xl border-8 border-amber-100">
                <Image
                  src="/images/image 8.png"
                  alt="Façade de l'Ophelia Museum"
                  width={500}
                  height={350}
                  className="rounded-xl shadow-lg object-cover w-full h-[350px]"
                />

              </div>
            </div>

            {/* Statistiques flottantes */}
            <div className="absolute -top-6 -right-6 bg-gray-900 text-white rounded-2xl p-6 shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold font-title">2021</div>
                <div className="text-sm text-gray-300">Année de fondation</div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 font-title">500+</div>
                <div className="text-sm text-gray-600">Œuvres exposées</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section artistes vedettes */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-title font-bold text-gray-900 mb-8">
            Artistes <i>en vedette</i>
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="bg-white rounded-full px-6 py-3 shadow-sm border border-gray-100">
              Yayoi Kusama
            </div>
            <div className="bg-white rounded-full px-6 py-3 shadow-sm border border-gray-100">
              Jean-Michel Basquiat
            </div>
            <div className="bg-white rounded-full px-6 py-3 shadow-sm border border-gray-100">
              Ai Weiwei
            </div>
            <div className="bg-white rounded-full px-6 py-3 shadow-sm border border-gray-100">
              David Hockney
            </div>
            <div className="bg-white rounded-full px-6 py-3 shadow-sm border border-gray-100">
              Kaws
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}