// ==========================================================================
// Types partagés — Admin AutoLoc CI
// ==========================================================================

// --------------------------------------------------------------------------
// Finances
// --------------------------------------------------------------------------

export interface VehicleFinancials {
  vehiculeId: string;
  nom: string;
  chiffreAffaires: number;
  coutMaintenance: number;
  rentabilite: number; // %
  rotation: number; // nb locations
  joursImmobilisation: number;
}

export interface GlobalFinancials {
  revenuTotal: number;
  revenuMensuel: number;
  tauxRentabilite: number; // %
  revenuMoyenVehicule: number;
  coutMaintenanceTotal: number;
  coutMaintenanceMensuel: number;
}

export interface RevenueByPeriod {
  mois: string;
  revenus: number;
  coutsMaintenance: number;
}

export type DocumentType = "pro_forma" | "facture" | "facture_reparation";
export type DocumentStatut = "brouillon" | "envoyee" | "payee" | "annulee";

export interface LigneDocument {
  description: string;
  quantite: number;
  prixUnitaire: number;
  montant: number;
}

export interface DocumentFinancier {
  id: string;
  type: DocumentType;
  statut: DocumentStatut;
  numero: string;
  dateCreation: string;
  dateEcheance: string;
  client: {
    nom: string;
    telephone: string;
    email: string;
  };
  vehicule: {
    id: string;
    nom: string;
    immatriculation: string;
  };
  lignes: LigneDocument[];
  sousTotal: number;
  taxe: number;
  total: number;
  reservationId?: string;
  interventionId?: string;
}

// --------------------------------------------------------------------------
// Exploitation
// --------------------------------------------------------------------------

export interface ExploitationVehicule {
  vehiculeId: string;
  nom: string;
  categorie: string;
  totalLocations: number;
  locationsCourtes: number; // ≤ 3 jours
  locationsLongues: number; // > 3 jours
  dureeMoyenne: number; // jours
  scoreDemande: number; // 0-100
  tauxOccupation: number; // %
  revenuTotal: number;
}

export interface ExploitationPeriode {
  mois: string;
  locationsCourtes: number;
  locationsLongues: number;
  totalLocations: number;
}

// --------------------------------------------------------------------------
// Inspection (État des lieux)
// --------------------------------------------------------------------------

export type InspectionType = "depart" | "retour";

export type PointControleEtat = "bon" | "acceptable" | "degrade" | "endommage";

export interface CheckpointCategory {
  id: string;
  label: string;
  points: PointControleConfig[];
}

export interface PointControleConfig {
  id: string;
  label: string;
}

export interface PointControle {
  pointId: string;
  label: string;
  categorie: string;
  etat: PointControleEtat;
  commentaire?: string;
}

export interface Inspection {
  id: string;
  reservationId: string;
  type: InspectionType;
  date: string;
  inspecteur: string;
  kilometrage: number;
  niveauCarburant: number; // 0-100
  photos: string[];
  pointsControle: PointControle[];
  commentaireGeneral?: string;
  statut: "en_cours" | "finalise";
}

// --------------------------------------------------------------------------
// Garage / Maintenance
// --------------------------------------------------------------------------

export type InterventionType =
  | "maintenance_preventive"
  | "reparation"
  | "revision"
  | "carrosserie"
  | "pneus";

export type InterventionStatut =
  | "planifiee"
  | "en_cours"
  | "terminee"
  | "annulee";

export type UrgenceNiveau = "basse" | "moyenne" | "haute" | "critique";

export interface Garage {
  id: string;
  nom: string;
  adresse: string;
  telephone: string;
  specialites: string[];
  note: number; // 0-5
  interventionsTotal: number;
  tauxSatisfaction: number; // %
}

export interface Intervention {
  id: string;
  vehiculeId: string;
  vehiculeNom: string;
  garageId: string;
  garageNom: string;
  type: InterventionType;
  statut: InterventionStatut;
  urgence: UrgenceNiveau;
  description: string;
  dateDebut: string;
  dateFin?: string;
  cout: number;
  kilometrage: number;
  factureId?: string;
}

export interface MaintenanceVehicule {
  vehiculeId: string;
  nom: string;
  immatriculation: string;
  kilometrageActuel: number;
  prochainEntretien: number; // km
  historiqueKilometrage: { date: string; km: number }[];
  coutMaintenanceTotal: number;
  coutsMensuels: { mois: string; cout: number }[];
  interventions: string[]; // intervention IDs
}

export interface CrossReport {
  vehiculeNom: string;
  coutMaintenance: number;
  revenus: number;
  rotation: number;
  joursImmobilisation: number;
  ratioMaintenanceRevenu: number; // %
}
