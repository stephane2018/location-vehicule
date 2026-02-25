export type InterventionType = "entretien" | "reparation" | "controle" | "urgence";
export type InterventionStatut = "planifiee" | "en_cours" | "terminee" | "annulee";

export interface Intervention {
  id: string;
  vehiculeId: string;
  vehicule: string;
  type: InterventionType;
  statut: InterventionStatut;
  dateDebut: string;
  dateFin?: string;
  technicien: string;
  cout: number;
  description: string;
  pieces?: string[];
}
