export function formatDate(date: Date | string | number): string {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function formatDateTime(date: Date | string | number): string {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
