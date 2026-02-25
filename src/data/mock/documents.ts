import type { DocumentFinancier } from "@/types/admin";

export const DOCUMENTS: DocumentFinancier[] = [
  // ---------------------------------------------------------------------------
  // Pro-formas
  // ---------------------------------------------------------------------------
  {
    id: "DOC-PF-001",
    type: "pro_forma",
    statut: "brouillon",
    numero: "PF-2025-001",
    dateCreation: "2025-11-05",
    dateEcheance: "2025-11-20",
    client: {
      nom: "Kouamé Yao Jean-Baptiste",
      telephone: "+225 07 89 45 12 33",
      email: "jb.kouame@gmail.com",
    },
    vehicule: {
      id: "VEH-001",
      nom: "Toyota RAV4 2023",
      immatriculation: "1234 AB 01",
    },
    lignes: [
      {
        description: "Location véhicule - 5 jours",
        quantite: 5,
        prixUnitaire: 45_000,
        montant: 225_000,
      },
      {
        description: "Assurance tous risques",
        quantite: 5,
        prixUnitaire: 5_000,
        montant: 25_000,
      },
      {
        description: "Frais de livraison",
        quantite: 1,
        prixUnitaire: 15_000,
        montant: 15_000,
      },
    ],
    sousTotal: 265_000,
    taxe: 47_700,
    total: 312_700,
    reservationId: "RES-2025-042",
  },
  {
    id: "DOC-PF-002",
    type: "pro_forma",
    statut: "envoyee",
    numero: "PF-2025-002",
    dateCreation: "2025-12-10",
    dateEcheance: "2025-12-25",
    client: {
      nom: "Bamba Seydou",
      telephone: "+225 05 56 78 90 12",
      email: "seydou.bamba@yahoo.fr",
    },
    vehicule: {
      id: "VEH-003",
      nom: "Mercedes Classe C 2023",
      immatriculation: "7890 CD 01",
    },
    lignes: [
      {
        description: "Location véhicule - 3 jours",
        quantite: 3,
        prixUnitaire: 85_000,
        montant: 255_000,
      },
      {
        description: "Assurance tous risques",
        quantite: 3,
        prixUnitaire: 10_000,
        montant: 30_000,
      },
    ],
    sousTotal: 285_000,
    taxe: 51_300,
    total: 336_300,
    reservationId: "RES-2025-067",
  },
  {
    id: "DOC-PF-003",
    type: "pro_forma",
    statut: "annulee",
    numero: "PF-2025-003",
    dateCreation: "2025-10-18",
    dateEcheance: "2025-11-02",
    client: {
      nom: "Diallo Aminata",
      telephone: "+225 01 23 45 67 89",
      email: "aminata.diallo@outlook.com",
    },
    vehicule: {
      id: "VEH-006",
      nom: "Toyota Corolla 2022",
      immatriculation: "4567 EF 01",
    },
    lignes: [
      {
        description: "Location véhicule - 7 jours",
        quantite: 7,
        prixUnitaire: 30_000,
        montant: 210_000,
      },
      {
        description: "Assurance de base",
        quantite: 7,
        prixUnitaire: 3_000,
        montant: 21_000,
      },
      {
        description: "GPS embarqué",
        quantite: 1,
        prixUnitaire: 10_000,
        montant: 10_000,
      },
    ],
    sousTotal: 241_000,
    taxe: 43_380,
    total: 284_380,
    reservationId: "RES-2025-031",
  },

  // ---------------------------------------------------------------------------
  // Factures
  // ---------------------------------------------------------------------------
  {
    id: "DOC-FAC-001",
    type: "facture",
    statut: "envoyee",
    numero: "FAC-2025-001",
    dateCreation: "2025-11-20",
    dateEcheance: "2025-12-05",
    client: {
      nom: "Touré Ibrahima",
      telephone: "+225 07 11 22 33 44",
      email: "ibrahima.toure@entreprise.ci",
    },
    vehicule: {
      id: "VEH-002",
      nom: "Hyundai Tucson 2022",
      immatriculation: "2345 GH 01",
    },
    lignes: [
      {
        description: "Location véhicule - 10 jours",
        quantite: 10,
        prixUnitaire: 40_000,
        montant: 400_000,
      },
      {
        description: "Assurance tous risques",
        quantite: 10,
        prixUnitaire: 5_000,
        montant: 50_000,
      },
      {
        description: "Frais de livraison aéroport",
        quantite: 1,
        prixUnitaire: 25_000,
        montant: 25_000,
      },
    ],
    sousTotal: 475_000,
    taxe: 85_500,
    total: 560_500,
  },
  {
    id: "DOC-FAC-002",
    type: "facture",
    statut: "payee",
    numero: "FAC-2025-002",
    dateCreation: "2025-12-01",
    dateEcheance: "2025-12-16",
    client: {
      nom: "Koné Mariam",
      telephone: "+225 05 99 88 77 66",
      email: "mariam.kone@gmail.com",
    },
    vehicule: {
      id: "VEH-004",
      nom: "Kia Sportage 2022",
      immatriculation: "5678 IJ 01",
    },
    lignes: [
      {
        description: "Location véhicule - 4 jours",
        quantite: 4,
        prixUnitaire: 35_000,
        montant: 140_000,
      },
      {
        description: "Assurance de base",
        quantite: 4,
        prixUnitaire: 3_000,
        montant: 12_000,
      },
    ],
    sousTotal: 152_000,
    taxe: 27_360,
    total: 179_360,
  },
  {
    id: "DOC-FAC-003",
    type: "facture",
    statut: "payee",
    numero: "FAC-2026-001",
    dateCreation: "2026-01-15",
    dateEcheance: "2026-01-30",
    client: {
      nom: "N'Guessan Ahou Patricia",
      telephone: "+225 07 55 44 33 22",
      email: "patricia.nguessan@hotmail.com",
    },
    vehicule: {
      id: "VEH-005",
      nom: "Peugeot 3008 2023",
      immatriculation: "9012 KL 01",
    },
    lignes: [
      {
        description: "Location véhicule - 14 jours",
        quantite: 14,
        prixUnitaire: 42_000,
        montant: 588_000,
      },
      {
        description: "Assurance tous risques",
        quantite: 14,
        prixUnitaire: 6_000,
        montant: 84_000,
      },
      {
        description: "Siège bébé",
        quantite: 1,
        prixUnitaire: 5_000,
        montant: 5_000,
      },
      {
        description: "Frais de livraison",
        quantite: 1,
        prixUnitaire: 15_000,
        montant: 15_000,
      },
    ],
    sousTotal: 692_000,
    taxe: 124_560,
    total: 816_560,
  },
  {
    id: "DOC-FAC-004",
    type: "facture",
    statut: "envoyee",
    numero: "FAC-2026-002",
    dateCreation: "2026-02-05",
    dateEcheance: "2026-02-20",
    client: {
      nom: "Ouattara Moussa",
      telephone: "+225 01 77 66 55 44",
      email: "moussa.ouattara@transport.ci",
    },
    vehicule: {
      id: "VEH-007",
      nom: "Ford Ranger 2023",
      immatriculation: "3456 MN 01",
    },
    lignes: [
      {
        description: "Location véhicule - 21 jours",
        quantite: 21,
        prixUnitaire: 55_000,
        montant: 1_155_000,
      },
      {
        description: "Assurance tous risques",
        quantite: 21,
        prixUnitaire: 8_000,
        montant: 168_000,
      },
      {
        description: "Chauffeur professionnel",
        quantite: 21,
        prixUnitaire: 25_000,
        montant: 525_000,
      },
    ],
    sousTotal: 1_848_000,
    taxe: 332_640,
    total: 2_180_640,
  },

  // ---------------------------------------------------------------------------
  // Factures réparation (IDs alignés sur les factureId des interventions)
  // ---------------------------------------------------------------------------

  // INT-001 : Toyota RAV4 — Révision 30 000 km — Garage Central Cocody
  {
    id: "FAC-REP-001",
    type: "facture_reparation",
    statut: "payee",
    numero: "REP-2025-001",
    dateCreation: "2025-10-07",
    dateEcheance: "2025-10-22",
    client: {
      nom: "Garage Central Cocody",
      telephone: "+225 27 22 44 56 78",
      email: "facturation@garagecentral.ci",
    },
    vehicule: {
      id: "VEH-001",
      nom: "Toyota RAV4 2023",
      immatriculation: "1234 AB 01",
    },
    lignes: [
      {
        description: "Vidange huile moteur + filtre à huile",
        quantite: 1,
        prixUnitaire: 45_000,
        montant: 45_000,
      },
      {
        description: "Remplacement filtre à air",
        quantite: 1,
        prixUnitaire: 18_000,
        montant: 18_000,
      },
      {
        description: "Remplacement filtre habitacle",
        quantite: 1,
        prixUnitaire: 12_000,
        montant: 12_000,
      },
      {
        description: "Contrôle général 30 000 km",
        quantite: 1,
        prixUnitaire: 35_000,
        montant: 35_000,
      },
      {
        description: "Main d'œuvre - 5 heures",
        quantite: 5,
        prixUnitaire: 15_000,
        montant: 75_000,
      },
    ],
    sousTotal: 185_000,
    taxe: 33_300,
    total: 218_300,
    interventionId: "INT-001",
  },

  // INT-002 : Mercedes Classe C — Carrosserie aile avant — Auto Service Plateau
  {
    id: "FAC-REP-002",
    type: "facture_reparation",
    statut: "payee",
    numero: "REP-2025-002",
    dateCreation: "2025-10-19",
    dateEcheance: "2025-11-03",
    client: {
      nom: "Auto Service Plateau",
      telephone: "+225 27 20 33 12 90",
      email: "facturation@autoserviceplateau.ci",
    },
    vehicule: {
      id: "VEH-003",
      nom: "Mercedes Classe C 2023",
      immatriculation: "3456 EF 01",
    },
    lignes: [
      {
        description: "Réparation aile avant droite",
        quantite: 1,
        prixUnitaire: 280_000,
        montant: 280_000,
      },
      {
        description: "Peinture aile + raccord",
        quantite: 1,
        prixUnitaire: 220_000,
        montant: 220_000,
      },
      {
        description: "Débosselage et préparation",
        quantite: 1,
        prixUnitaire: 150_000,
        montant: 150_000,
      },
      {
        description: "Main d'œuvre - 10 heures",
        quantite: 10,
        prixUnitaire: 20_000,
        montant: 200_000,
      },
    ],
    sousTotal: 850_000,
    taxe: 153_000,
    total: 1_003_000,
    interventionId: "INT-002",
  },

  // INT-003 : Peugeot 3008 — Plaquettes de frein — Garage Central Cocody
  {
    id: "FAC-REP-003",
    type: "facture_reparation",
    statut: "payee",
    numero: "REP-2025-003",
    dateCreation: "2025-11-04",
    dateEcheance: "2025-11-19",
    client: {
      nom: "Garage Central Cocody",
      telephone: "+225 27 22 44 56 78",
      email: "facturation@garagecentral.ci",
    },
    vehicule: {
      id: "VEH-005",
      nom: "Peugeot 3008 2023",
      immatriculation: "5678 IJ 01",
    },
    lignes: [
      {
        description: "Plaquettes de frein avant (jeu)",
        quantite: 1,
        prixUnitaire: 65_000,
        montant: 65_000,
      },
      {
        description: "Plaquettes de frein arrière (jeu)",
        quantite: 1,
        prixUnitaire: 55_000,
        montant: 55_000,
      },
      {
        description: "Liquide de frein DOT 4",
        quantite: 2,
        prixUnitaire: 12_000,
        montant: 24_000,
      },
      {
        description: "Main d'œuvre - 4 heures",
        quantite: 4,
        prixUnitaire: 19_000,
        montant: 76_000,
      },
    ],
    sousTotal: 220_000,
    taxe: 39_600,
    total: 259_600,
    interventionId: "INT-003",
  },

  // INT-004 : Ford Ranger — Embrayage — Garage Express Yamoussoukro
  {
    id: "FAC-REP-004",
    type: "facture_reparation",
    statut: "payee",
    numero: "REP-2025-004",
    dateCreation: "2025-11-16",
    dateEcheance: "2025-12-01",
    client: {
      nom: "Garage Express Yamoussoukro",
      telephone: "+225 27 30 64 22 15",
      email: "facturation@garageexpress.ci",
    },
    vehicule: {
      id: "VEH-007",
      nom: "Ford Ranger 2023",
      immatriculation: "7890 MN 01",
    },
    lignes: [
      {
        description: "Kit embrayage complet (disque, mécanisme, butée)",
        quantite: 1,
        prixUnitaire: 680_000,
        montant: 680_000,
      },
      {
        description: "Volant moteur bimasse",
        quantite: 1,
        prixUnitaire: 250_000,
        montant: 250_000,
      },
      {
        description: "Main d'œuvre - 12 heures",
        quantite: 12,
        prixUnitaire: 22_500,
        montant: 270_000,
      },
    ],
    sousTotal: 1_200_000,
    taxe: 216_000,
    total: 1_416_000,
    interventionId: "INT-004",
  },

  // INT-005 : BMW X3 — Turbo et joints de culasse — Garage Central Cocody
  {
    id: "FAC-REP-005",
    type: "facture_reparation",
    statut: "envoyee",
    numero: "REP-2025-005",
    dateCreation: "2025-12-03",
    dateEcheance: "2025-12-18",
    client: {
      nom: "Garage Central Cocody",
      telephone: "+225 27 22 44 56 78",
      email: "facturation@garagecentral.ci",
    },
    vehicule: {
      id: "VEH-009",
      nom: "BMW X3 2023",
      immatriculation: "9012 QR 01",
    },
    lignes: [
      {
        description: "Turbocompresseur neuf",
        quantite: 1,
        prixUnitaire: 1_200_000,
        montant: 1_200_000,
      },
      {
        description: "Joint de culasse + pochette de joints",
        quantite: 1,
        prixUnitaire: 350_000,
        montant: 350_000,
      },
      {
        description: "Liquide de refroidissement",
        quantite: 5,
        prixUnitaire: 8_000,
        montant: 40_000,
      },
      {
        description: "Main d'œuvre - 30 heures",
        quantite: 30,
        prixUnitaire: 30_000,
        montant: 900_000,
      },
      {
        description: "Diagnostic électronique",
        quantite: 1,
        prixUnitaire: 10_000,
        montant: 10_000,
      },
    ],
    sousTotal: 2_500_000,
    taxe: 450_000,
    total: 2_950_000,
    interventionId: "INT-005",
  },

  // INT-006 : Hyundai Tucson — Révision 40 000 km — Mécanique Pro Bouaké
  {
    id: "FAC-REP-006",
    type: "facture_reparation",
    statut: "payee",
    numero: "REP-2025-006",
    dateCreation: "2025-12-07",
    dateEcheance: "2025-12-22",
    client: {
      nom: "Mécanique Pro Bouaké",
      telephone: "+225 27 31 63 45 10",
      email: "facturation@mecaniquepro.ci",
    },
    vehicule: {
      id: "VEH-002",
      nom: "Hyundai Tucson 2022",
      immatriculation: "2345 CD 01",
    },
    lignes: [
      {
        description: "Révision complète 40 000 km",
        quantite: 1,
        prixUnitaire: 85_000,
        montant: 85_000,
      },
      {
        description: "Vidange huile moteur + filtre",
        quantite: 1,
        prixUnitaire: 38_000,
        montant: 38_000,
      },
      {
        description: "Remplacement bougies d'allumage (4)",
        quantite: 4,
        prixUnitaire: 8_000,
        montant: 32_000,
      },
      {
        description: "Main d'œuvre - 3 heures",
        quantite: 3,
        prixUnitaire: 13_300,
        montant: 39_900,
      },
    ],
    sousTotal: 194_900,
    taxe: 35_082,
    total: 229_982,
    interventionId: "INT-006",
  },
];
