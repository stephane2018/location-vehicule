import type {
  CheckpointCategory,
  Inspection,
  PointControle,
} from "@/core/types/admin";

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

export type PaiementStatut = "en_attente" | "valide" | "echoue" | "rembourse";

export interface ReservationDetail {
  id: string;
  client: {
    nom: string;
    telephone: string;
    email: string;
    photo: string;
    pieceIdentite: string[];
  };
  vehicule: {
    id: string;
    nom: string;
    immatriculation: string;
    image: string;
  };
  agenceRetrait: string;
  agenceRetour: string;
  agenceImage: string;
  dateDebut: string;
  dateFin: string;
  jours: number;
  prixJour: number;
  statut: "confirmee" | "en_attente" | "en_cours" | "terminee" | "annulee";
  montant: number;
  paiement: "Orange Money" | "MTN MoMo" | "Wave" | "Moov Money" | "Carte bancaire";
  paiementStatut: PaiementStatut;
  paiementRef?: string;
  photosAvant: string[];
  photosApres: string[];
  inspectionDepartId?: string;
  inspectionRetourId?: string;
}

// Unsplash image helpers
const U = (id: string, w = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// Client portrait photos (African people)
const PORTRAITS = {
  kouame:    U("1507003211169-0a1dd7228f2d"),
  adjoua:    U("1531123897727-8f129e1688ce"),
  bamba:     U("1506794778202-cad84cf45f1d"),
  toure:     U("1523824921871-d6f1a15151f1"),
  ngoran:    U("1500648767791-00dcc994a43e"),
  konan:     U("1494790108377-be9c29b29330"),
  diabate:   U("1472099645785-5658abf4ff4e"),
  soro:      U("1438761681033-6461ffad8d80"),
  yao:       U("1504257432389-52343af06ae3"),
  koffi:     U("1534528741775-53994a69daeb"),
};

// Vehicle inspection photos (car details, exterior angles)
const INSP_PHOTOS = [
  U("1549317661-bd32c8ce0afe"),   // 0 - car front
  U("1552519507-da3b142c6e3b"),   // 1 - car side
  U("1503376780353-7e6692767b70"), // 2 - car rear
  U("1542362567-b07ad0100247"),   // 3 - car interior
  U("1618843479619-f3d0d81e4d10"), // 4 - car wheel
  U("1583121274602-3e2820c69888"), // 5 - car dashboard
  U("1489824904134-891ab64532f1"), // 6 - car angle
  U("1502877338535-766e1452684a"), // 7 - car parked
  U("1494976388531-d1058494cdd8"), // 8 - car front angle
  U("1553440569-bcc63803a83d"),   // 9 - car night
  U("1533473359331-2969db3e753e"), // 10 - car close
  U("1517524008697-84bbe573f9f8"), // 11 - car profile
  U("1504215680853-026ed2a45def"), // 12 - car road
  U("1519641471654-76ce0107ad1b"), // 13 - suv
  U("1541899481282-d53bffe3c35d"), // 14 - car detail
  U("1568605117036-5fe5e7765654"), // 15 - sedan
];

// ID document placeholder (generic document photo)
const ID_DOC = [
  U("1554224155-6726b3ff858f"),   // passport / document
  U("1586953208448-b95a79798f07"), // ID card style
];

export const RESERVATIONS_MOCK: ReservationDetail[] = [
  {
    id: "RES-001",
    client: {
      nom: "Kouamé Yves",
      telephone: "+225 07 12 34 56 78",
      email: "kouame.yves@email.ci",
      photo: PORTRAITS.kouame,
      pieceIdentite: [ID_DOC[0]],
    },
    vehicule: {
      id: "VEH-001",
      nom: "Toyota RAV4 2023",
      immatriculation: "AB 1234 CI",
      image: U("1519641471654-76ce0107ad1b"),
    },
    agenceRetrait: "Abidjan-Cocody",
    agenceRetour: "Abidjan-Cocody",
    agenceImage: U("1497366216548-37526070297c"),
    dateDebut: "2026-02-20",
    dateFin: "2026-02-25",
    jours: 5,
    prixJour: 75000,
    statut: "terminee",
    montant: 375000,
    paiement: "Orange Money",
    paiementStatut: "valide",
    paiementRef: "OM-2026-00412",
    photosAvant: [INSP_PHOTOS[0], INSP_PHOTOS[1], INSP_PHOTOS[2], INSP_PHOTOS[3]],
    photosApres: [INSP_PHOTOS[4], INSP_PHOTOS[5], INSP_PHOTOS[6], INSP_PHOTOS[7]],
    inspectionDepartId: "INS-001",
    inspectionRetourId: "INS-002",
  },
  {
    id: "RES-002",
    client: {
      nom: "Adjoua Mariam",
      telephone: "+225 07 98 76 54 32",
      email: "adjoua.mariam@email.ci",
      photo: PORTRAITS.adjoua,
      pieceIdentite: [ID_DOC[1]],
    },
    vehicule: {
      id: "VEH-003",
      nom: "Hyundai Tucson 2022",
      immatriculation: "CD 5678 CI",
      image: U("1709774378962-171db2614a30"),
    },
    agenceRetrait: "Abidjan-Plateau",
    agenceRetour: "Abidjan-Plateau",
    agenceImage: U("1486406146926-c627a92ad1ab"),
    dateDebut: "2026-02-21",
    dateFin: "2026-02-23",
    jours: 2,
    prixJour: 75000,
    statut: "en_cours",
    montant: 150000,
    paiement: "MTN MoMo",
    paiementStatut: "valide",
    paiementRef: "MOMO-2026-00893",
    photosAvant: [INSP_PHOTOS[13], INSP_PHOTOS[14]],
    photosApres: [],
    inspectionDepartId: "INS-004",
  },
  {
    id: "RES-003",
    client: {
      nom: "Bamba Cheick",
      telephone: "+225 07 11 22 33 44",
      email: "bamba.cheick@email.ci",
      photo: PORTRAITS.bamba,
      pieceIdentite: [ID_DOC[0], ID_DOC[1]],
    },
    vehicule: {
      id: "VEH-005",
      nom: "Mercedes Classe C 2023",
      immatriculation: "EF 9012 CI",
      image: U("1636127739824-37cb465c66e8"),
    },
    agenceRetrait: "Yamoussoukro",
    agenceRetour: "Abidjan-Cocody",
    agenceImage: U("1568992688065-536aad8a12f6"),
    dateDebut: "2026-02-18",
    dateFin: "2026-02-22",
    jours: 4,
    prixJour: 140000,
    statut: "terminee",
    montant: 560000,
    paiement: "Wave",
    paiementStatut: "valide",
    paiementRef: "WAVE-2026-01204",
    photosAvant: [INSP_PHOTOS[10], INSP_PHOTOS[11], INSP_PHOTOS[12]],
    photosApres: [INSP_PHOTOS[8], INSP_PHOTOS[9]],
    inspectionDepartId: "INS-003",
    inspectionRetourId: "INS-005",
  },
  {
    id: "RES-004",
    client: {
      nom: "Touré Fatoumata",
      telephone: "+225 07 55 66 77 88",
      email: "toure.fatoumata@email.ci",
      photo: PORTRAITS.toure,
      pieceIdentite: [ID_DOC[0]],
    },
    vehicule: {
      id: "VEH-007",
      nom: "Kia Sportage 2022",
      immatriculation: "GH 3456 CI",
      image: U("1649921777129-a28a26031a03"),
    },
    agenceRetrait: "Bouaké",
    agenceRetour: "Bouaké",
    agenceImage: U("1577495508048-b635879837f1"),
    dateDebut: "2026-02-22",
    dateFin: "2026-02-24",
    jours: 2,
    prixJour: 80000,
    statut: "annulee",
    montant: 160000,
    paiement: "Orange Money",
    paiementStatut: "rembourse",
    paiementRef: "OM-2026-00501",
    photosAvant: [],
    photosApres: [],
  },
  {
    id: "RES-005",
    client: {
      nom: "N'Goran Pierre",
      telephone: "+225 07 44 33 22 11",
      email: "ngoran.pierre@email.ci",
      photo: PORTRAITS.ngoran,
      pieceIdentite: [ID_DOC[1]],
    },
    vehicule: {
      id: "VEH-009",
      nom: "Peugeot 3008 2023",
      immatriculation: "IJ 7890 CI",
      image: U("1636034943420-6ada4ce38982"),
    },
    agenceRetrait: "San Pedro",
    agenceRetour: "San Pedro",
    agenceImage: U("1504307651254-35680f356dfd"),
    dateDebut: "2026-02-23",
    dateFin: "2026-02-27",
    jours: 4,
    prixJour: 80000,
    statut: "confirmee",
    montant: 320000,
    paiement: "Moov Money",
    paiementStatut: "valide",
    paiementRef: "MOOV-2026-00318",
    photosAvant: [],
    photosApres: [],
  },
  {
    id: "RES-006",
    client: {
      nom: "Konan Evelyne",
      telephone: "+225 07 22 44 66 88",
      email: "konan.evelyne@email.ci",
      photo: PORTRAITS.konan,
      pieceIdentite: [ID_DOC[0]],
    },
    vehicule: {
      id: "VEH-011",
      nom: "Toyota Corolla 2022",
      immatriculation: "KL 1234 CI",
      image: U("1635876664453-20c68e076348"),
    },
    agenceRetrait: "Abidjan-Cocody",
    agenceRetour: "Yamoussoukro",
    agenceImage: U("1497366216548-37526070297c"),
    dateDebut: "2026-02-19",
    dateFin: "2026-02-21",
    jours: 2,
    prixJour: 60000,
    statut: "terminee",
    montant: 120000,
    paiement: "Carte bancaire",
    paiementStatut: "valide",
    paiementRef: "CB-2026-07821",
    photosAvant: [INSP_PHOTOS[0], INSP_PHOTOS[1]],
    photosApres: [INSP_PHOTOS[2], INSP_PHOTOS[3]],
  },
  {
    id: "RES-007",
    client: {
      nom: "Diabaté Ismaël",
      telephone: "+225 07 77 88 99 00",
      email: "diabate.ismael@email.ci",
      photo: PORTRAITS.diabate,
      pieceIdentite: [ID_DOC[1]],
    },
    vehicule: {
      id: "VEH-013",
      nom: "Ford Ranger 2023",
      immatriculation: "MN 5678 CI",
      image: U("1559416523-140ddc3d238c"),
    },
    agenceRetrait: "Abidjan-Plateau",
    agenceRetour: "Abidjan-Plateau",
    agenceImage: U("1486406146926-c627a92ad1ab"),
    dateDebut: "2026-02-23",
    dateFin: "2026-02-28",
    jours: 5,
    prixJour: 95000,
    statut: "confirmee",
    montant: 475000,
    paiement: "MTN MoMo",
    paiementStatut: "valide",
    paiementRef: "MOMO-2026-00912",
    photosAvant: [],
    photosApres: [],
  },
  {
    id: "RES-008",
    client: {
      nom: "Soro Aïcha",
      telephone: "+225 07 33 44 55 66",
      email: "soro.aicha@email.ci",
      photo: PORTRAITS.soro,
      pieceIdentite: [ID_DOC[0]],
    },
    vehicule: {
      id: "VEH-015",
      nom: "Nissan Qashqai 2022",
      immatriculation: "OP 9012 CI",
      image: U("1730470171326-066a81f185bb"),
    },
    agenceRetrait: "Abidjan-Cocody",
    agenceRetour: "Abidjan-Cocody",
    agenceImage: U("1497366216548-37526070297c"),
    dateDebut: "2026-02-24",
    dateFin: "2026-02-26",
    jours: 2,
    prixJour: 70000,
    statut: "en_attente",
    montant: 140000,
    paiement: "Wave",
    paiementStatut: "en_attente",
    photosAvant: [],
    photosApres: [],
  },
  {
    id: "RES-009",
    client: {
      nom: "Yao Paul",
      telephone: "+225 07 99 88 77 66",
      email: "yao.paul@email.ci",
      photo: PORTRAITS.yao,
      pieceIdentite: [ID_DOC[0], ID_DOC[1]],
    },
    vehicule: {
      id: "VEH-004",
      nom: "BMW X3 2023",
      immatriculation: "QR 3456 CI",
      image: U("1694658073846-bcb14ab05945"),
    },
    agenceRetrait: "Yamoussoukro",
    agenceRetour: "Yamoussoukro",
    agenceImage: U("1568992688065-536aad8a12f6"),
    dateDebut: "2026-02-25",
    dateFin: "2026-03-01",
    jours: 4,
    prixJour: 170000,
    statut: "confirmee",
    montant: 680000,
    paiement: "Orange Money",
    paiementStatut: "valide",
    paiementRef: "OM-2026-00587",
    photosAvant: [],
    photosApres: [],
  },
  {
    id: "RES-010",
    client: {
      nom: "Koffi Marie",
      telephone: "+225 07 11 22 33 44",
      email: "koffi.marie@email.ci",
      photo: PORTRAITS.koffi,
      pieceIdentite: [ID_DOC[1]],
    },
    vehicule: {
      id: "VEH-010",
      nom: "Mitsubishi Outlander 2022",
      immatriculation: "ST 7890 CI",
      image: U("1740775377048-bd4653b7144b"),
    },
    agenceRetrait: "Bouaké",
    agenceRetour: "Abidjan-Plateau",
    agenceImage: U("1577495508048-b635879837f1"),
    dateDebut: "2026-02-26",
    dateFin: "2026-02-28",
    jours: 2,
    prixJour: 90000,
    statut: "en_attente",
    montant: 180000,
    paiement: "Moov Money",
    paiementStatut: "en_attente",
    photosAvant: [],
    photosApres: [],
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
