export function toNumberOrNull(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error('clamp: min cannot be greater than max');
  }
  return Math.min(Math.max(value, min), max);
}
