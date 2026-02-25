export type DocumentType = "pro_forma" | "facture" | "facture_reparation";
export type DocumentStatut = "brouillon" | "envoyee" | "payee" | "annulee";

export interface ClientInfo {
  nom: string;
  telephone: string;
  email: string;
}

export interface VehiculeInfo {
  id: string;
  nom: string;
  immatriculation: string;
}

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
  dateEcheance?: string;
  client?: ClientInfo;
  vehicule?: VehiculeInfo;
  lignes: LigneDocument[];
  sousTotal: number;
  taxe: number;
  total: number;
  reservationId?: string;
  interventionId?: string;
}
