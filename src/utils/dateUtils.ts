export function calculateAge(birthDate: string, deathDate: string): number {
  // Handle BC dates (starting with "前")
  const birthYear = parseYear(birthDate);
  const deathYear = parseYear(deathDate);

  return deathYear - birthYear;
}

function parseYear(dateString: string): number {
  // Handle BC dates (e.g., "前156-07-14")
  if (dateString.startsWith('前')) {
    const year = parseInt(dateString.substring(1, dateString.indexOf('-')));
    return -year; // Negative for BC
  }

  // Handle AD dates (e.g., "598-01-23")
  return parseInt(dateString.substring(0, dateString.indexOf('-')));
}

export function formatDate(dateString: string): string {
  // Handle BC dates
  if (dateString.startsWith('前')) {
    return dateString.replace('前', '公元前');
  }

  return dateString;
}