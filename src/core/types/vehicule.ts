export type VehiculeStatut = "disponible" | "en_location" | "maintenance";
export type VehiculeCategorie =
  | "SUV"
  | "Berline"
  | "Pick-up"
  | "Citadine"
  | "Premium"
  | "Utilitaire";

export interface Vehicule {
  id: string;
  nom: string;
  marque: string;
  modele: string;
  annee: number;
  categorie: VehiculeCategorie;
  agence: string;
  prixJour: number;
  statut: VehiculeStatut;
  immatriculation: string;
}
