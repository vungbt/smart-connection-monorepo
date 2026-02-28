export type FormatPriceOptions = {
  locale?: string;
  currency?: string;
  style?: 'currency' | 'decimal';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  fallback?: string;
};

export const formatPrice = (
  value: number | string | null | undefined,
  options: FormatPriceOptions = {}
): string => {
  const {
    locale = 'vi-VN',
    currency = 'VND',
    style = 'currency',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    fallback = '-',
  } = options;

  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  const normalizedValue = typeof value === 'string' ? value.replace(/,/g, '').trim() : value;
  const amount = Number(normalizedValue);

  if (!Number.isFinite(amount)) {
    return fallback;
  }

  return new Intl.NumberFormat(locale, {
    style,
    currency: style === 'currency' ? currency : undefined,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
};
