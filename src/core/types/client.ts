export interface Client {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  ville: string;
  inscriptionDate: string;
  nombreReservations: number;
  totalDepense: number;
  statut: "actif" | "inactif" | "nouveau";
}
