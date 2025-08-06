export function toISODateString(date: Date): string {
  return date.toISOString();
}

export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}
