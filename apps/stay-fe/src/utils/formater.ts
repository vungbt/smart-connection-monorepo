import { format as formatDateFns, isValid, parseISO } from 'date-fns';

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

export enum EDateFormatPattern {
  MMM_DD_YYYY = 'MMM dd, yyyy',
  DD_MM_YYYY = 'dd/MM/yyyy',
  YYYY_MM_DD = 'yyyy-MM-dd',
  HH_MM_DD_MM_YYYY = 'HH:mm dd/MM/yyyy',
}

export const formatDate = (
  value?: Date | string | null,
  pattern: EDateFormatPattern = EDateFormatPattern.MMM_DD_YYYY
): string => {
  const fallback = '-';

  if (!value) {
    return fallback;
  }

  const dateValue = typeof value === 'string' ? parseISO(value) : value;

  if (!isValid(dateValue)) {
    return fallback;
  }

  return formatDateFns(dateValue, pattern);
};
