import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export function formatMontant(n: number): string {
  return n.toLocaleString("fr-CI") + " FCFA";
}

export function formatPourcentage(n: number): string {
  return n.toFixed(1) + " %";
}

export function formatKilometrage(n: number): string {
  return n.toLocaleString("fr-CI") + " km";
}

export function formatDate(date: string): string {
  return format(parseISO(date), "d MMM yyyy", { locale: fr });
}
