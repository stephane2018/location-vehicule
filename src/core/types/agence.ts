export interface Agence {
  id: string;
  nom: string;
  ville: string;
  adresse: string;
  telephone: string;
  responsable: string;
  nombreVehicules: number;
  vehiculesDisponibles: number;
  statut: "active" | "inactive";
}
