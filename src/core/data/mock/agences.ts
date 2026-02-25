import type { Agence } from "../../types/agence";

export const AGENCES_MOCK: Agence[] = [
  {
    id: "AGC-001",
    nom: "AutoLoc Cocody",
    ville: "Abidjan",
    adresse: "Rue des Jardins, Cocody, Abidjan",
    telephone: "+225 07 11 22 33 44",
    responsable: "Kouadio Jean-Baptiste",
    nombreVehicules: 15,
    vehiculesDisponibles: 8,
    statut: "active",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    description:
      "Notre agence phare située au cœur de Cocody, le quartier résidentiel le plus prisé d'Abidjan. Idéalement placée près des ambassades et centres d'affaires, elle offre un accès rapide au boulevard lagunaire et à l'autoroute du Nord.",
  },
  {
    id: "AGC-002",
    nom: "AutoLoc Plateau",
    ville: "Abidjan",
    adresse: "Avenue Houphouët-Boigny, Plateau, Abidjan",
    telephone: "+225 07 55 66 77 88",
    responsable: "Traoré Aminata",
    nombreVehicules: 12,
    vehiculesDisponibles: 5,
    statut: "active",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    description:
      "Au centre du Plateau, le quartier des affaires d'Abidjan. Proximité immédiate des banques, ministères et hôtels de luxe. Service premium avec livraison express dans tout le district d'Abidjan.",
  },
  {
    id: "AGC-003",
    nom: "AutoLoc Yamoussoukro",
    ville: "Yamoussoukro",
    adresse: "Boulevard de la Paix, Yamoussoukro",
    telephone: "+225 07 22 33 44 55",
    responsable: "Koné Mamadou",
    nombreVehicules: 8,
    vehiculesDisponibles: 4,
    statut: "active",
    image:
      "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?auto=format&fit=crop&w=800&q=80",
    description:
      "Agence de la capitale politique, idéale pour les déplacements officiels et les visites de la Basilique Notre-Dame de la Paix. Flotte adaptée aux longs trajets entre Yamoussoukro et Abidjan.",
  },
  {
    id: "AGC-004",
    nom: "AutoLoc Bouaké",
    ville: "Bouaké",
    adresse: "Quartier Commerce, Avenue du Général de Gaulle, Bouaké",
    telephone: "+225 07 44 55 66 77",
    responsable: "Diallo Fatoumata",
    nombreVehicules: 6,
    vehiculesDisponibles: 3,
    statut: "active",
    image:
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
    description:
      "Deuxième ville du pays, Bouaké est un carrefour commercial stratégique. Notre agence dessert les professionnels du commerce et du transport dans toute la région du Gbêkê.",
  },
  {
    id: "AGC-005",
    nom: "AutoLoc San Pedro",
    ville: "San Pedro",
    adresse: "Zone Industrielle, San Pedro",
    telephone: "+225 07 88 99 00 11",
    responsable: "Yao François",
    nombreVehicules: 4,
    vehiculesDisponibles: 3,
    statut: "active",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    description:
      "Port autonome de San Pedro, deuxième port du pays. Agence spécialisée pour les professionnels de l'industrie cacaoyère et portuaire. Véhicules utilitaires et SUV robustes pour les pistes de la région.",
  },
];
