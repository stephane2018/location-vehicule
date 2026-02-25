import type {
  GlobalFinancials,
  VehicleFinancials,
  RevenueByPeriod,
  CrossReport,
} from "@/core/types/admin";

// ---------------------------------------------------------------------------
// Indicateurs financiers globaux
// ---------------------------------------------------------------------------

export const GLOBAL_FINANCIALS: GlobalFinancials = {
  revenuTotal: 75_000_000,
  revenuMensuel: 12_500_000,
  tauxRentabilite: 72,
  revenuMoyenVehicule: 6_250_000,
  coutMaintenanceTotal: 18_000_000,
  coutMaintenanceMensuel: 3_000_000,
};

// ---------------------------------------------------------------------------
// Finances par véhicule (12 véhicules du parc)
// ---------------------------------------------------------------------------

export const VEHICLE_FINANCIALS: VehicleFinancials[] = [
  {
    vehiculeId: "VEH-001",
    nom: "Toyota RAV4 2023",
    chiffreAffaires: 9_800_000,
    coutMaintenance: 980_000,
    rentabilite: 90,
    rotation: 22,
    joursImmobilisation: 3,
  },
  {
    vehiculeId: "VEH-002",
    nom: "Hyundai Tucson 2022",
    chiffreAffaires: 7_200_000,
    coutMaintenance: 1_080_000,
    rentabilite: 85,
    rotation: 18,
    joursImmobilisation: 5,
  },
  {
    vehiculeId: "VEH-003",
    nom: "Mercedes Classe C 2023",
    chiffreAffaires: 14_500_000,
    coutMaintenance: 3_625_000,
    rentabilite: 75,
    rotation: 15,
    joursImmobilisation: 8,
  },
  {
    vehiculeId: "VEH-004",
    nom: "Kia Sportage 2022",
    chiffreAffaires: 6_500_000,
    coutMaintenance: 780_000,
    rentabilite: 88,
    rotation: 20,
    joursImmobilisation: 4,
  },
  {
    vehiculeId: "VEH-005",
    nom: "Peugeot 3008 2023",
    chiffreAffaires: 8_100_000,
    coutMaintenance: 1_620_000,
    rentabilite: 80,
    rotation: 17,
    joursImmobilisation: 6,
  },
  {
    vehiculeId: "VEH-006",
    nom: "Toyota Corolla 2022",
    chiffreAffaires: 5_400_000,
    coutMaintenance: 540_000,
    rentabilite: 90,
    rotation: 25,
    joursImmobilisation: 2,
  },
  {
    vehiculeId: "VEH-007",
    nom: "Ford Ranger 2023",
    chiffreAffaires: 5_800_000,
    coutMaintenance: 1_740_000,
    rentabilite: 70,
    rotation: 12,
    joursImmobilisation: 10,
  },
  {
    vehiculeId: "VEH-008",
    nom: "Renault Duster 2022",
    chiffreAffaires: 4_200_000,
    coutMaintenance: 1_260_000,
    rentabilite: 70,
    rotation: 14,
    joursImmobilisation: 12,
  },
  {
    vehiculeId: "VEH-009",
    nom: "BMW X3 2023",
    chiffreAffaires: 12_000_000,
    coutMaintenance: 4_800_000,
    rentabilite: 60,
    rotation: 10,
    joursImmobilisation: 18,
  },
  {
    vehiculeId: "VEH-010",
    nom: "Toyota Land Cruiser 2023",
    chiffreAffaires: 15_200_000,
    coutMaintenance: 7_600_000,
    rentabilite: 50,
    rotation: 8,
    joursImmobilisation: 25,
  },
  {
    vehiculeId: "VEH-011",
    nom: "Suzuki Swift 2022",
    chiffreAffaires: 2_800_000,
    coutMaintenance: 1_400_000,
    rentabilite: 50,
    rotation: 10,
    joursImmobilisation: 30,
  },
  {
    vehiculeId: "VEH-012",
    nom: "Citro\u00ebn C3 2022",
    chiffreAffaires: 2_200_000,
    coutMaintenance: 1_320_000,
    rentabilite: 40,
    rotation: 3,
    joursImmobilisation: 45,
  },
];

// ---------------------------------------------------------------------------
// Revenus et co\u00fbts par p\u00e9riode (6 derniers mois)
// ---------------------------------------------------------------------------

export const REVENUE_BY_PERIOD: RevenueByPeriod[] = [
  { mois: "Sep 2025", revenus: 10_800_000, coutsMaintenance: 2_700_000 },
  { mois: "Oct 2025", revenus: 11_200_000, coutsMaintenance: 2_900_000 },
  { mois: "Nov 2025", revenus: 11_900_000, coutsMaintenance: 3_100_000 },
  { mois: "D\u00e9c 2025", revenus: 13_500_000, coutsMaintenance: 3_400_000 },
  { mois: "Jan 2026", revenus: 12_100_000, coutsMaintenance: 2_800_000 },
  { mois: "F\u00e9v 2026", revenus: 12_500_000, coutsMaintenance: 3_000_000 },
];

// ---------------------------------------------------------------------------
// Rapport crois\u00e9 maintenance / revenus
// ---------------------------------------------------------------------------

export const CROSS_REPORT: CrossReport[] = VEHICLE_FINANCIALS.map((v) => ({
  vehiculeNom: v.nom,
  coutMaintenance: v.coutMaintenance,
  revenus: v.chiffreAffaires,
  rotation: v.rotation,
  joursImmobilisation: v.joursImmobilisation,
  ratioMaintenanceRevenu:
    v.chiffreAffaires > 0
      ? Math.round((v.coutMaintenance / v.chiffreAffaires) * 100)
      : 0,
}));
