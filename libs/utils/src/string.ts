export function capitalize(input: string): string {
  if (input.length === 0) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function isEmptyString(input: unknown): input is '' {
  return typeof input === 'string' && input.length === 0;
}
