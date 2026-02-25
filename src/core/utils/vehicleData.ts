// Mock vehicle data for the catalog page
// Vehicles reflect real rental market in Côte d'Ivoire (Abidjan and upcountry agencies)

export type VehicleCategory =
  | "Citadine"
  | "Berline"
  | "SUV"
  | "Utilitaire"
  | "Luxe Berline"
  | "Luxe SUV"
  | "Luxe Sportive";

export type Transmission = "Automatique" | "Manuelle";
export type Carburant = "Essence" | "Diesel";
export type VehicleStatus = "disponible" | "en-location" | "en-revision";

export interface Vehicle {
  id: string;
  name: string;
  category: VehicleCategory;
  pricePerDay: number; // in FCFA
  transmission: Transmission;
  carburant: Carburant;
  seats: number;
  agencies: string[];
  image: string;
  // Gradient stop colors for fallback background
  gradientFrom: string;
  gradientTo: string;
  popular?: boolean;
  addedAt: string; // ISO date string for "Récents" sort
  status: VehicleStatus;
  availableDate?: string; // ISO date — next availability when status is "en-location"
}

export const AGENCIES = [
  "Abidjan-Cocody",
  "Abidjan-Plateau",
  "Yamoussoukro",
  "Bouaké",
  "San Pedro",
] as const;

export type Agency = (typeof AGENCIES)[number];

export const VEHICLES: Vehicle[] = [
  {
    id: "v1",
    name: "Toyota Corolla 2023",
    category: "Berline",
    pricePerDay: 25000,
    transmission: "Automatique",
    carburant: "Essence",
    seats: 5,
    agencies: ["Abidjan-Cocody", "Abidjan-Plateau"],
    image: "https://images.unsplash.com/photo-1635876664453-20c68e076348?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#1d4ed8",
    gradientTo: "#3b82f6",
    popular: true,
    addedAt: "2025-11-15",
    status: "en-location",
    availableDate: "2026-03-05",
  },
  {
    id: "v2",
    name: "Hyundai Tucson 2022",
    category: "SUV",
    pricePerDay: 45000,
    transmission: "Automatique",
    carburant: "Diesel",
    seats: 5,
    agencies: ["Abidjan-Cocody", "Yamoussoukro"],
    image: "https://images.unsplash.com/photo-1709774378962-171db2614a30?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#0f172a",
    gradientTo: "#334155",
    popular: true,
    addedAt: "2025-12-01",
    status: "disponible",
  },
  {
    id: "v3",
    name: "Suzuki Swift 2022",
    category: "Citadine",
    pricePerDay: 15000,
    transmission: "Manuelle",
    carburant: "Essence",
    seats: 4,
    agencies: ["Abidjan-Plateau"],
    image: "https://images.unsplash.com/photo-1730470171326-066a81f185bb?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#dc2626",
    gradientTo: "#f87171",
    popular: false,
    addedAt: "2025-10-20",
    status: "disponible",
  },
  {
    id: "v4",
    name: "Mercedes-Benz C-Class 2023",
    category: "Luxe Berline",
    pricePerDay: 95000,
    transmission: "Automatique",
    carburant: "Essence",
    seats: 5,
    agencies: ["Abidjan-Cocody"],
    image: "https://images.unsplash.com/photo-1636127739824-37cb465c66e8?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#1a1a2e",
    gradientTo: "#4a4a6a",
    popular: true,
    addedAt: "2025-12-10",
    status: "en-location",
    availableDate: "2026-03-12",
  },
  {
    id: "v5",
    name: "Toyota Land Cruiser 2023",
    category: "Luxe SUV",
    pricePerDay: 150000,
    transmission: "Automatique",
    carburant: "Diesel",
    seats: 7,
    agencies: ["Abidjan-Cocody", "Abidjan-Plateau", "Yamoussoukro"],
    image: "https://images.unsplash.com/photo-1650530579355-7ad9d4766043?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#064e3b",
    gradientTo: "#10b981",
    popular: true,
    addedAt: "2025-12-20",
    status: "disponible",
  },
  {
    id: "v6",
    name: "Renault Kangoo 2021",
    category: "Utilitaire",
    pricePerDay: 22000,
    transmission: "Manuelle",
    carburant: "Diesel",
    seats: 5,
    agencies: ["Bouaké", "San Pedro"],
    image: "https://images.unsplash.com/photo-1768400554801-2002b63e0591?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#b45309",
    gradientTo: "#f59e0b",
    popular: false,
    addedAt: "2025-09-05",
    status: "en-revision",
  },
  {
    id: "v7",
    name: "BMW Serie 3 2024",
    category: "Luxe Berline",
    pricePerDay: 85000,
    transmission: "Automatique",
    carburant: "Essence",
    seats: 5,
    agencies: ["Abidjan-Plateau"],
    image: "https://images.unsplash.com/photo-1694658073846-bcb14ab05945?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#1e3a5f",
    gradientTo: "#2563eb",
    popular: false,
    addedAt: "2026-01-05",
    status: "disponible",
  },
  {
    id: "v8",
    name: "Kia Sportage 2023",
    category: "SUV",
    pricePerDay: 38000,
    transmission: "Automatique",
    carburant: "Essence",
    seats: 5,
    agencies: ["Abidjan-Cocody", "Bouaké"],
    image: "https://images.unsplash.com/photo-1649921777129-a28a26031a03?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#4c1d95",
    gradientTo: "#7c3aed",
    popular: false,
    addedAt: "2025-11-28",
    status: "en-location",
    availableDate: "2026-02-28",
  },
  {
    id: "v9",
    name: "Peugeot 208 2022",
    category: "Citadine",
    pricePerDay: 18000,
    transmission: "Manuelle",
    carburant: "Essence",
    seats: 5,
    agencies: ["Abidjan-Plateau", "Yamoussoukro"],
    image: "https://images.unsplash.com/photo-1636034943420-6ada4ce38982?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#0c4a6e",
    gradientTo: "#0ea5e9",
    popular: false,
    addedAt: "2025-08-14",
    status: "disponible",
  },
  {
    id: "v10",
    name: "Porsche Cayenne 2024",
    category: "Luxe SUV",
    pricePerDay: 140000,
    transmission: "Automatique",
    carburant: "Essence",
    seats: 5,
    agencies: ["Abidjan-Cocody"],
    image: "https://images.unsplash.com/photo-1740775377048-bd4653b7144b?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#7f1d1d",
    gradientTo: "#ef4444",
    popular: true,
    addedAt: "2026-01-20",
    status: "disponible",
  },
  {
    id: "v11",
    name: "Toyota Hilux 2022",
    category: "Utilitaire",
    pricePerDay: 35000,
    transmission: "Manuelle",
    carburant: "Diesel",
    seats: 5,
    agencies: ["Bouaké", "San Pedro", "Yamoussoukro"],
    image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#713f12",
    gradientTo: "#d97706",
    popular: false,
    addedAt: "2025-07-30",
    status: "en-revision",
  },
  {
    id: "v12",
    name: "Lamborghini Urus 2023",
    category: "Luxe Sportive",
    pricePerDay: 200000,
    transmission: "Automatique",
    carburant: "Essence",
    seats: 5,
    agencies: ["Abidjan-Cocody"],
    image: "https://images.unsplash.com/photo-1549288830-f95a7354fea8?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#78350f",
    gradientTo: "#f59e0b",
    popular: true,
    addedAt: "2026-02-01",
    status: "disponible",
  },
];

// Category images for the homepage categories section
export const CATEGORY_IMAGES: Record<string, string> = {
  Citadine: "https://images.unsplash.com/photo-1643796975309-f01dd1e50b1b?auto=format&fit=crop&w=800&q=80",
  Berline: "https://images.unsplash.com/photo-1646644431825-e5171c8cba53?auto=format&fit=crop&w=800&q=80",
  SUV: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
  Utilitaire: "https://images.unsplash.com/photo-1768393775846-6d0bd756a847?auto=format&fit=crop&w=800&q=80",
  "Luxe Berline": "https://images.unsplash.com/photo-1636378182990-3bc1fd5c8307?auto=format&fit=crop&w=800&q=80",
  "Luxe SUV": "https://images.unsplash.com/photo-1690141191020-9631850d3079?auto=format&fit=crop&w=800&q=80",
};

// Format price in FCFA locale (e.g. 25000 → "25 000 FCFA / jour")
export function formatPrice(price: number): string {
  return `${price.toLocaleString("fr-FR")} FCFA / jour`;
}
