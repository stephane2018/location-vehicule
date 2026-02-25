export interface VehicleCategory {
  name: string;
  priceFrom: number;
  count: number;
  isLuxury?: boolean;
  slug: string;
  image: string;
  description: string;
}
