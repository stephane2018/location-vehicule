export type ReservationStatut =
  | "confirmee"
  | "en_attente"
  | "en_cours"
  | "terminee"
  | "annulee";

export interface Reservation {
  id: string;
  client: string;
  telephone: string;
  vehicule: string;
  agenceRetrait: string;
  agenceRetour: string;
  dateDebut: string;
  dateFin: string;
  jours: number;
  statut: ReservationStatut;
  montant: number;
  paiement: "Orange Money" | "MTN MoMo" | "Wave" | "Moov Money" | "Carte bancaire";
}
