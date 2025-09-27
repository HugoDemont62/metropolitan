'use client';

import { useState, useMemo } from 'react';
import { Plus, Minus, Users, MapPin, BookOpen, Volume2 } from 'lucide-react';
import RevealText from '@/Animation/RevealText';

export default function BilletPage() {
  // État pour tous les types de billets
  const [tickets, setTickets] = useState({
    adulte: 0,
    moins12: 0,
    jeune1225: 0,
    demandeurEmploi: 0,
    pmr: 0,
    senior: 0,
    groupe: 0
  });

  // État pour les options supplémentaires
  const [options, setOptions] = useState({
    audioguide: 0,
    guidePapier: 0
  });

  // Données des tarifs
  const tarifsData = [
    {
      id: 'adulte',
      label: 'Entrée adulte',
      price: 24,
      description: 'Tarif plein',
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 'moins12',
      label: 'Entrée -12 ans',
      price: 12,
      description: 'De 5 à 11 ans',
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 'jeune1225',
      label: 'Entrée jeune 12-25',
      price: 18,
      description: 'Sur présentation d\'une pièce d\'identité',
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 'demandeurEmploi',
      label: 'Demandeur d\'emploi',
      price: 18,
      description: 'Sur présentation d\'un justificatif',
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 'pmr',
      label: 'Entrée PMR',
      price: 18,
      description: 'Personne à mobilité réduite',
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 'senior',
      label: 'Entrée senior',
      price: 18,
      description: '65 ans et plus',
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 'groupe',
      label: 'Tarif groupe',
      price: 15,
      description: '10 personnes minimum',
      icon: <Users className="h-5 w-5" />
    }
  ];

  const optionsData = [
    {
      id: 'audioguide',
      label: 'Audioguide',
      price: 2,
      description: 'Visite guidée audio',
      icon: <Volume2 className="h-5 w-5" />
    },
    {
      id: 'guidePapier',
      label: 'Guide papier',
      price: 4,
      description: 'Livret détaillé des œuvres',
      icon: <BookOpen className="h-5 w-5" />
    }
  ];

  // Fonction pour modifier la quantité des billets
  const updateTicketQuantity = (ticketId, change) => {
    setTickets(prev => ({
      ...prev,
      [ticketId]: Math.max(0, prev[ticketId] + change)
    }));
  };

  // Fonction pour modifier la quantité des options
  const updateOptionQuantity = (optionId, change) => {
    setOptions(prev => ({
      ...prev,
      [optionId]: Math.max(0, prev[optionId] + change)
    }));
  };

  // Calcul du total
  const totalCalculation = useMemo(() => {
    const ticketsTotal = tarifsData.reduce((sum, tarif) =>
      sum + (tickets[tarif.id] * tarif.price), 0
    );

    const optionsTotal = optionsData.reduce((sum, option) =>
      sum + (options[option.id] * option.price), 0
    );

    const totalTickets = Object.values(tickets).reduce((sum, qty) => sum + qty, 0);

    return {
      subtotal: ticketsTotal,
      options: optionsTotal,
      total: ticketsTotal + optionsTotal,
      totalTickets
    };
  }, [tickets, options]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="relative py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <RevealText className="text-white text-center">
            <h1 className="text-5xl md:text-6xl font-title font-bold mb-4">
              Billetterie
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto">
              Réservez votre visite au musée Ophelia
            </p>
          </RevealText>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section Billets */}
          <div className="lg:col-span-2 space-y-8">

            {/* Tarifs d'entrée */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-title font-semibold mb-6 text-gray-800">
                Tarifs d'entrée
              </h2>

              {/* Notice gratuit -5 ans */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">
                  🎈 Gratuit pour les moins de 5 ans
                </p>
              </div>

              <div className="space-y-4">
                {tarifsData.map((tarif) => (
                  <div
                    key={tarif.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="text-gray-400">
                        {tarif.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {tarif.label}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {tarif.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-gray-900 min-w-[60px]">
                        {tarif.price}€
                      </span>

                      <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() => updateTicketQuantity(tarif.id, -1)}
                          disabled={tickets[tarif.id] === 0}
                          className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="min-w-[30px] text-center font-semibold">
                          {tickets[tarif.id]}
                        </span>

                        <button
                          onClick={() => updateTicketQuantity(tarif.id, 1)}
                          className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Options supplémentaires */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-title font-semibold mb-6 text-gray-800">
                Options supplémentaires
              </h2>

              {/* Notice plan gratuit */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <p className="text-blue-800 font-medium">
                    Plan du musée gratuit et fourni à l'accueil
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {optionsData.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="text-gray-400">
                        {option.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {option.label}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {option.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-gray-900 min-w-[60px]">
                        {option.price}€
                      </span>

                      <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() => updateOptionQuantity(option.id, -1)}
                          disabled={options[option.id] === 0}
                          className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="min-w-[30px] text-center font-semibold">
                          {options[option.id]}
                        </span>

                        <button
                          onClick={() => updateOptionQuantity(option.id, 1)}
                          className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Total */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-xl font-title font-semibold mb-4 text-gray-800">
                  Récapitulatif
                </h2>

                {totalCalculation.totalTickets === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Sélectionnez vos billets pour voir le total
                  </p>
                ) : (
                  <div className="space-y-4">
                    {/* Détail des billets */}
                    {tarifsData.map((tarif) =>
                        tickets[tarif.id] > 0 && (
                          <div key={tarif.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {tarif.label} × {tickets[tarif.id]}
                          </span>
                            <span className="font-medium">
                            {tickets[tarif.id] * tarif.price}€
                          </span>
                          </div>
                        )
                    )}

                    {/* Détail des options */}
                    {optionsData.map((option) =>
                        options[option.id] > 0 && (
                          <div key={option.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {option.label} × {options[option.id]}
                          </span>
                            <span className="font-medium">
                            {options[option.id] * option.price}€
                          </span>
                          </div>
                        )
                    )}

                    {totalCalculation.options > 0 && (
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Sous-total billets</span>
                          <span>{totalCalculation.subtotal}€</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Options</span>
                          <span>{totalCalculation.options}€</span>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>{totalCalculation.total}€</span>
                      </div>
                    </div>

                    <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors mt-6">
                      Procéder au paiement
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-3">
                      {totalCalculation.totalTickets} billet{totalCalculation.totalTickets > 1 ? 's' : ''} sélectionné{totalCalculation.totalTickets > 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>

              {/* Informations pratiques */}
              <div className="bg-gray-50 rounded-2xl p-6 mt-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Informations pratiques
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Horaires : 10h-18h, fermé le lundi</li>
                  <li>• Billet valable le jour de la visite</li>
                  <li>• Dernière entrée à 17h30</li>
                  <li>• Gratuit pour les -5 ans</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}