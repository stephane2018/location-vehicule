export type DocumentType = "facture" | "devis" | "contrat" | "reçu" | "rapport";
export type DocumentStatut = "brouillon" | "en_attente" | "valide" | "archive";

export interface Document {
  id: string;
  type: DocumentType;
  statut: DocumentStatut;
  titre: string;
  clientId?: string;
  client?: string;
  reservationId?: string;
  vehiculeId?: string;
  montant?: number;
  dateCreation: string;
  dateEmission?: string;
  fichier?: string;
  description?: string;
}
