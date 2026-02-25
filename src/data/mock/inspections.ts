import type {
  CheckpointCategory,
  Inspection,
  PointControle,
} from "@/types/admin";

// ---------------------------------------------------------------------------
// Configuration des points de controle
// ---------------------------------------------------------------------------

export const CHECKPOINTS_CONFIG: CheckpointCategory[] = [
  {
    id: "exterieur",
    label: "Exterieur",
    points: [
      { id: "ext-carrosserie-avant", label: "Carrosserie avant" },
      { id: "ext-carrosserie-arriere", label: "Carrosserie arriere" },
      { id: "ext-carrosserie-gauche", label: "Carrosserie cote gauche" },
      { id: "ext-carrosserie-droit", label: "Carrosserie cote droit" },
      { id: "ext-pare-brise", label: "Pare-brise" },
      { id: "ext-vitres-laterales", label: "Vitres laterales" },
      { id: "ext-lunette-arriere", label: "Lunette arriere" },
      { id: "ext-retroviseurs", label: "Retroviseurs" },
      { id: "ext-phares-avant", label: "Phares avant" },
      { id: "ext-feux-arriere", label: "Feux arriere" },
      { id: "ext-jantes", label: "Jantes et enjoliveurs" },
      { id: "ext-pneus", label: "Pneus" },
    ],
  },
  {
    id: "interieur",
    label: "Interieur",
    points: [
      { id: "int-sieges-avant", label: "Sieges avant" },
      { id: "int-sieges-arriere", label: "Sieges arriere" },
      { id: "int-tableau-bord", label: "Tableau de bord" },
      { id: "int-volant", label: "Volant" },
      { id: "int-levier-vitesse", label: "Levier de vitesse" },
      { id: "int-plafond", label: "Plafond" },
      { id: "int-moquettes", label: "Moquettes/tapis" },
      { id: "int-coffre", label: "Coffre" },
    ],
  },
  {
    id: "mecanique",
    label: "Mecanique",
    points: [
      { id: "mec-moteur", label: "Moteur (visuel)" },
      { id: "mec-huile", label: "Niveau huile" },
      { id: "mec-freins", label: "Freins" },
      { id: "mec-batterie", label: "Batterie" },
      { id: "mec-clim", label: "Climatisation" },
      { id: "mec-essuie-glaces", label: "Essuie-glaces" },
    ],
  },
  {
    id: "equipements",
    label: "Equipements",
    points: [
      { id: "eqp-roue-secours", label: "Roue de secours" },
      { id: "eqp-cric-cle", label: "Cric et cle" },
      { id: "eqp-triangle", label: "Triangle de signalisation" },
      { id: "eqp-gilet", label: "Gilet de securite" },
      { id: "eqp-extincteur", label: "Extincteur" },
      { id: "eqp-trousse", label: "Trousse de premiers soins" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Reservations mock (pour page detail)
// ---------------------------------------------------------------------------

export interface ReservationDetail {
  id: string;
  client: { nom: string; telephone: string; email: string };
  vehicule: { id: string; nom: string; immatriculation: string };
  agence: string;
  dateDebut: string;
  dateFin: string;
  statut: "confirmee" | "en_cours" | "terminee" | "annulee";
  montant: number;
  inspectionDepartId?: string;
  inspectionRetourId?: string;
}

export const RESERVATIONS_MOCK: ReservationDetail[] = [
  {
    id: "RES-001",
    client: {
      nom: "Kouame Yves",
      telephone: "+225 07 12 34 56 78",
      email: "kouame.yves@email.ci",
    },
    vehicule: {
      id: "VEH-001",
      nom: "Toyota RAV4 2023",
      immatriculation: "AB 1234 CI",
    },
    agence: "Abidjan-Cocody",
    dateDebut: "2026-02-20",
    dateFin: "2026-02-25",
    statut: "terminee",
    montant: 375000,
    inspectionDepartId: "INS-001",
    inspectionRetourId: "INS-002",
  },
  {
    id: "RES-002",
    client: {
      nom: "Adjoua Mariam",
      telephone: "+225 07 98 76 54 32",
      email: "adjoua.mariam@email.ci",
    },
    vehicule: {
      id: "VEH-003",
      nom: "Hyundai Tucson 2022",
      immatriculation: "CD 5678 CI",
    },
    agence: "Abidjan-Plateau",
    dateDebut: "2026-02-21",
    dateFin: "2026-02-23",
    statut: "en_cours",
    montant: 150000,
    inspectionDepartId: "INS-004",
  },
  {
    id: "RES-003",
    client: {
      nom: "Bamba Cheick",
      telephone: "+225 07 11 22 33 44",
      email: "bamba.cheick@email.ci",
    },
    vehicule: {
      id: "VEH-005",
      nom: "Mercedes Classe C 2023",
      immatriculation: "EF 9012 CI",
    },
    agence: "Yamoussoukro",
    dateDebut: "2026-02-18",
    dateFin: "2026-02-22",
    statut: "terminee",
    montant: 560000,
    inspectionDepartId: "INS-003",
    inspectionRetourId: "INS-005",
  },
  {
    id: "RES-004",
    client: {
      nom: "Toure Fatoumata",
      telephone: "+225 07 55 66 77 88",
      email: "toure.fatoumata@email.ci",
    },
    vehicule: {
      id: "VEH-007",
      nom: "Kia Sportage 2022",
      immatriculation: "GH 3456 CI",
    },
    agence: "Bouake",
    dateDebut: "2026-02-22",
    dateFin: "2026-02-24",
    statut: "confirmee",
    montant: 160000,
  },
  {
    id: "RES-005",
    client: {
      nom: "N'Goran Pierre",
      telephone: "+225 07 44 33 22 11",
      email: "ngoran.pierre@email.ci",
    },
    vehicule: {
      id: "VEH-009",
      nom: "Peugeot 3008 2023",
      immatriculation: "IJ 7890 CI",
    },
    agence: "San Pedro",
    dateDebut: "2026-02-23",
    dateFin: "2026-02-27",
    statut: "confirmee",
    montant: 320000,
  },
  {
    id: "RES-006",
    client: {
      nom: "Konan Evelyne",
      telephone: "+225 07 22 44 66 88",
      email: "konan.evelyne@email.ci",
    },
    vehicule: {
      id: "VEH-011",
      nom: "Toyota Corolla 2022",
      immatriculation: "KL 1234 CI",
    },
    agence: "Abidjan-Cocody",
    dateDebut: "2026-02-19",
    dateFin: "2026-02-21",
    statut: "annulee",
    montant: 120000,
  },
];

// ---------------------------------------------------------------------------
// Inspections mock
// ---------------------------------------------------------------------------

const INS001_POINTS: PointControle[] = [
  { pointId: "ext-carrosserie-avant", label: "Carrosserie avant", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-carrosserie-arriere", label: "Carrosserie arriere", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-carrosserie-gauche", label: "Carrosserie cote gauche", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-carrosserie-droit", label: "Carrosserie cote droit", categorie: "Exterieur", etat: "acceptable" },
  { pointId: "ext-pare-brise", label: "Pare-brise", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-vitres-laterales", label: "Vitres laterales", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-retroviseurs", label: "Retroviseurs", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-phares-avant", label: "Phares avant", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-feux-arriere", label: "Feux arriere", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-pneus", label: "Pneus", categorie: "Exterieur", etat: "acceptable", commentaire: "Usure legere pneu avant gauche" },
  { pointId: "int-sieges-avant", label: "Sieges avant", categorie: "Interieur", etat: "bon" },
  { pointId: "int-sieges-arriere", label: "Sieges arriere", categorie: "Interieur", etat: "bon" },
  { pointId: "int-tableau-bord", label: "Tableau de bord", categorie: "Interieur", etat: "bon" },
  { pointId: "int-volant", label: "Volant", categorie: "Interieur", etat: "bon" },
  { pointId: "int-moquettes", label: "Moquettes/tapis", categorie: "Interieur", etat: "acceptable" },
  { pointId: "int-coffre", label: "Coffre", categorie: "Interieur", etat: "bon" },
  { pointId: "mec-moteur", label: "Moteur (visuel)", categorie: "Mecanique", etat: "bon" },
  { pointId: "mec-huile", label: "Niveau huile", categorie: "Mecanique", etat: "bon" },
  { pointId: "mec-freins", label: "Freins", categorie: "Mecanique", etat: "bon" },
  { pointId: "mec-batterie", label: "Batterie", categorie: "Mecanique", etat: "bon" },
  { pointId: "mec-clim", label: "Climatisation", categorie: "Mecanique", etat: "bon" },
  { pointId: "eqp-roue-secours", label: "Roue de secours", categorie: "Equipements", etat: "bon" },
  { pointId: "eqp-triangle", label: "Triangle de signalisation", categorie: "Equipements", etat: "bon" },
  { pointId: "eqp-extincteur", label: "Extincteur", categorie: "Equipements", etat: "bon" },
];

const INS002_POINTS: PointControle[] = [
  { pointId: "ext-carrosserie-avant", label: "Carrosserie avant", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-carrosserie-arriere", label: "Carrosserie arriere", categorie: "Exterieur", etat: "degrade", commentaire: "Rayure de 15 cm sur le pare-chocs arriere" },
  { pointId: "ext-carrosserie-gauche", label: "Carrosserie cote gauche", categorie: "Exterieur", etat: "endommage", commentaire: "Bosse sur la portiere arriere gauche" },
  { pointId: "ext-carrosserie-droit", label: "Carrosserie cote droit", categorie: "Exterieur", etat: "acceptable" },
  { pointId: "ext-pare-brise", label: "Pare-brise", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-vitres-laterales", label: "Vitres laterales", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-retroviseurs", label: "Retroviseurs", categorie: "Exterieur", etat: "degrade", commentaire: "Retroviseur gauche decolle partiellement" },
  { pointId: "ext-phares-avant", label: "Phares avant", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-feux-arriere", label: "Feux arriere", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-pneus", label: "Pneus", categorie: "Exterieur", etat: "degrade", commentaire: "Pneu avant gauche a changer rapidement" },
  { pointId: "int-sieges-avant", label: "Sieges avant", categorie: "Interieur", etat: "acceptable", commentaire: "Tache sur le siege conducteur" },
  { pointId: "int-sieges-arriere", label: "Sieges arriere", categorie: "Interieur", etat: "bon" },
  { pointId: "int-tableau-bord", label: "Tableau de bord", categorie: "Interieur", etat: "bon" },
  { pointId: "int-volant", label: "Volant", categorie: "Interieur", etat: "bon" },
  { pointId: "int-moquettes", label: "Moquettes/tapis", categorie: "Interieur", etat: "degrade", commentaire: "Moquettes sales avec traces de boue" },
  { pointId: "int-coffre", label: "Coffre", categorie: "Interieur", etat: "acceptable" },
  { pointId: "mec-moteur", label: "Moteur (visuel)", categorie: "Mecanique", etat: "bon" },
  { pointId: "mec-huile", label: "Niveau huile", categorie: "Mecanique", etat: "acceptable", commentaire: "Niveau un peu bas" },
  { pointId: "mec-freins", label: "Freins", categorie: "Mecanique", etat: "bon" },
  { pointId: "mec-clim", label: "Climatisation", categorie: "Mecanique", etat: "bon" },
  { pointId: "eqp-roue-secours", label: "Roue de secours", categorie: "Equipements", etat: "bon" },
  { pointId: "eqp-triangle", label: "Triangle de signalisation", categorie: "Equipements", etat: "endommage", commentaire: "Triangle casse, inutilisable" },
  { pointId: "eqp-extincteur", label: "Extincteur", categorie: "Equipements", etat: "bon" },
];

const INS003_POINTS: PointControle[] = [
  { pointId: "ext-carrosserie-avant", label: "Carrosserie avant", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-carrosserie-arriere", label: "Carrosserie arriere", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-carrosserie-gauche", label: "Carrosserie cote gauche", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-carrosserie-droit", label: "Carrosserie cote droit", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-pare-brise", label: "Pare-brise", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-retroviseurs", label: "Retroviseurs", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-phares-avant", label: "Phares avant", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-feux-arriere", label: "Feux arriere", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-jantes", label: "Jantes et enjoliveurs", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-pneus", label: "Pneus", categorie: "Exterieur", etat: "bon" },
  { pointId: "int-sieges-avant", label: "Sieges avant", categorie: "Interieur", etat: "bon" },
  { pointId: "int-sieges-arriere", label: "Sieges arriere", categorie: "Interieur", etat: "bon" },
  { pointId: "int-tableau-bord", label: "Tableau de bord", categorie: "Interieur", etat: "bon" },
  { pointId: "int-volant", label: "Volant", categorie: "Interieur", etat: "bon" },
  { pointId: "int-levier-vitesse", label: "Levier de vitesse", categorie: "Interieur", etat: "bon" },
  { pointId: "int-plafond", label: "Plafond", categorie: "Interieur", etat: "bon" },
  { pointId: "int-coffre", label: "Coffre", categorie: "Interieur", etat: "bon" },
  { pointId: "mec-moteur", label: "Moteur (visuel)", categorie: "Mecanique", etat: "bon" },
  { pointId: "mec-huile", label: "Niveau huile", categorie: "Mecanique", etat: "bon" },
  { pointId: "mec-freins", label: "Freins", categorie: "Mecanique", etat: "bon" },
  { pointId: "mec-batterie", label: "Batterie", categorie: "Mecanique", etat: "bon" },
  { pointId: "mec-clim", label: "Climatisation", categorie: "Mecanique", etat: "bon" },
  { pointId: "eqp-roue-secours", label: "Roue de secours", categorie: "Equipements", etat: "bon" },
  { pointId: "eqp-cric-cle", label: "Cric et cle", categorie: "Equipements", etat: "bon" },
  { pointId: "eqp-triangle", label: "Triangle de signalisation", categorie: "Equipements", etat: "bon" },
  { pointId: "eqp-gilet", label: "Gilet de securite", categorie: "Equipements", etat: "bon" },
  { pointId: "eqp-extincteur", label: "Extincteur", categorie: "Equipements", etat: "bon" },
];

const INS004_POINTS: PointControle[] = [
  { pointId: "ext-carrosserie-avant", label: "Carrosserie avant", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-carrosserie-arriere", label: "Carrosserie arriere", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-carrosserie-gauche", label: "Carrosserie cote gauche", categorie: "Exterieur", etat: "acceptable" },
  { pointId: "ext-pare-brise", label: "Pare-brise", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-vitres-laterales", label: "Vitres laterales", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-retroviseurs", label: "Retroviseurs", categorie: "Exterieur", etat: "bon" },
  { pointId: "ext-phares-avant", label: "Phares avant", categorie: "Exterieur", etat: "acceptable", commentaire: "Phare droit legerement opaque" },
  { pointId: "ext-pneus", label: "Pneus", categorie: "Exterieur", etat: "bon" },
  { pointId: "int-sieges-avant", label: "Sieges avant", categorie: "Interieur", etat: "bon" },
  { pointId: "int-sieges-arriere", label: "Sieges arriere", categorie: "Interieur", etat: "bon" },
  { pointId: "int-tableau-bord", label: "Tableau de bord", categorie: "Interieur", etat: "bon" },
  { pointId: "int-volant", label: "Volant", categorie: "Interieur", etat: "bon" },
  { pointId: "int-moquettes", label: "Moquettes/tapis", categorie: "Interieur", etat: "bon" },
  { pointId: "int-coffre", label: "Coffre", categorie: "Interieur", etat: "bon" },
  { pointId: "mec-moteur", label: "Moteur (visuel)", categorie: "Mecanique", etat: "bon" },
  { pointId: "mec-huile", label: "Niveau huile", categorie: "Mecanique", etat: "bon" },
  { pointId: "mec-freins", label: "Freins", categorie: "Mecanique", etat: "acceptable" },
  { pointId: "mec-batterie", label: "Batterie", categorie: "Mecanique", etat: "bon" },
  { pointId: "mec-clim", label: "Climatisation", categorie: "Mecanique", etat: "bon" },
  { pointId: "eqp-roue-secours", label: "Roue de secours", categorie: "Equipements", etat: "bon" },
  { pointId: "eqp-triangle", label: "Triangle de signalisation", categorie: "Equipements", etat: "bon" },
  { pointId: "eqp-extincteur", label: "Extincteur", categorie: "Equipements", etat: "bon" },
];

export const INSPECTIONS: Inspection[] = [
  {
    id: "INS-001",
    reservationId: "RES-001",
    type: "depart",
    date: "2026-02-20",
    inspecteur: "Diallo Mamadou",
    kilometrage: 15420,
    niveauCarburant: 75,
    photos: [
      "/placeholder-inspection-1.jpg",
      "/placeholder-inspection-2.jpg",
      "/placeholder-inspection-3.jpg",
      "/placeholder-inspection-4.jpg",
    ],
    pointsControle: INS001_POINTS,
    commentaireGeneral: "Vehicule en bon etat general. Legere usure pneu avant gauche signalee.",
    statut: "finalise",
  },
  {
    id: "INS-002",
    reservationId: "RES-001",
    type: "retour",
    date: "2026-02-25",
    inspecteur: "Diallo Mamadou",
    kilometrage: 15890,
    niveauCarburant: 40,
    photos: [
      "/placeholder-inspection-5.jpg",
      "/placeholder-inspection-6.jpg",
      "/placeholder-inspection-7.jpg",
      "/placeholder-inspection-8.jpg",
      "/placeholder-inspection-9.jpg",
      "/placeholder-inspection-10.jpg",
    ],
    pointsControle: INS002_POINTS,
    commentaireGeneral: "Dommages constates au retour : bosse portiere arriere gauche, rayure pare-chocs, retroviseur decolle. Triangle de signalisation casse. Nettoyage interieur necessaire.",
    statut: "finalise",
  },
  {
    id: "INS-003",
    reservationId: "RES-003",
    type: "depart",
    date: "2026-02-18",
    inspecteur: "Kone Aminata",
    kilometrage: 42100,
    niveauCarburant: 90,
    photos: [
      "/placeholder-inspection-11.jpg",
      "/placeholder-inspection-12.jpg",
      "/placeholder-inspection-13.jpg",
    ],
    pointsControle: INS003_POINTS,
    commentaireGeneral: "Vehicule en excellent etat. Tous les equipements presents et fonctionnels.",
    statut: "finalise",
  },
  {
    id: "INS-004",
    reservationId: "RES-002",
    type: "depart",
    date: "2026-02-21",
    inspecteur: "Yao Kouadio",
    kilometrage: 8750,
    niveauCarburant: 60,
    photos: [
      "/placeholder-inspection-14.jpg",
      "/placeholder-inspection-15.jpg",
    ],
    pointsControle: INS004_POINTS,
    commentaireGeneral: "Inspection en cours. Quelques points a verifier.",
    statut: "en_cours",
  },
];
