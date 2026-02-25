export * from './vehicule';
export * from './agence';
export * from './reservation';
export * from './client';
export * from './intervention';
export * from './document';
export * from './finance';

// Re-export specific types for backward compatibility
export type { Agence } from './agence';
export type { Reservation, ReservationStatut } from './reservation';
export type { Client } from './client';
export type { Intervention, InterventionType, InterventionStatut } from './intervention';
