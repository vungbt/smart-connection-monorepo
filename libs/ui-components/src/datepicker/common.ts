import { IconName } from '../icons';

export type BaseDatePickerProps = {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'middle' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'pending' | 'neutral';
  variant?: 'solid' | 'outline' | 'subtle' | 'ghost';
  icon?: IconName;
  error?: string;
  placeholder?: string;
  dateFormat?: string;
  popperClassName?: string;
  minDate?: Date;
  maxDate?: Date;
  isClearable?: boolean;
  showTimeSelect?: boolean;
  timeIntervals?: number;
  locale?: string;
  customClasses?: {
    root?: string;
    label?: string;
    input?: string;
    icon?: string;
    iconRight?: string;
    helperText?: string;
    error?: string;
  };
};

export const sizeClasses = {
  small: 'px-2 py-1 text-14',
  middle: 'min-h-10 px-4 py-2 text-14',
  large: 'px-6 py-3 text-16',
};

export const colorClasses = {
  primary: {
    solid:
      'bg-primary-background border-primary text-primary-base focus:border-primary focus:shadow-primary-background',
    outline:
      'bg-transparent border-primary text-primary-base focus:border-primary-base focus:shadow-primary-background',
    subtle:
      'bg-primary-background border-primary-background text-primary-base focus:border-primary focus:shadow-primary-background',
    ghost:
      'text-primary bg-transparent border border-dashed border-primary hover:bg-primary-background focus:shadow-none',
  },
  secondary: {
    solid:
      'bg-secondary-background border-secondary text-secondary-base focus:border-secondary focus:shadow-secondary-background',
    outline:
      'bg-transparent border-secondary text-secondary-base focus:border-secondary-base focus:shadow-secondary-background',
    subtle:
      'bg-secondary-background border-secondary-background text-secondary-base focus:border-secondary focus:shadow-secondary-background',
    ghost:
      'text-secondary bg-transparent border border-dashed border-secondary hover:bg-secondary-background focus:shadow-none',
  },
  success: {
    solid:
      'bg-success-bg border-success text-success focus:border-success-base focus:shadow-success-bg',
    outline:
      'bg-transparent border-success text-success focus:border-success-base focus:shadow-success-bg',
    subtle:
      'bg-success-bg border-success-bg text-success focus:border-success focus:shadow-success-bg',
    ghost:
      'text-success bg-transparent border border-dashed border-success hover:bg-success-bg focus:shadow-none',
  },
  error: {
    solid: 'bg-error-bg border-error focus:border-error-base focus:shadow-error-bg',
    outline: 'bg-transparent border-error focus:border-error-base focus:shadow-error-bg',
    subtle: 'bg-error-bg border-error-bg focus:border-error focus:shadow-error-bg',
    ghost: 'bg-transparent border border-dashed border-error hover:bg-error-bg focus:shadow-none',
  },
  pending: {
    solid:
      'bg-pending-bg border-pending text-pending focus:border-pending-base focus:shadow-pending-bg',
    outline:
      'bg-transparent border-pending text-pending focus:border-pending-base focus:shadow-pending-bg',
    subtle:
      'bg-pending-bg border-pending-bg text-pending focus:border-pending focus:shadow-pending-bg',
    ghost:
      'text-pending bg-transparent border border-dashed border-pending hover:bg-pending-bg focus:shadow-none',
  },
  neutral: {
    solid:
      'bg-neutral-bg border-neutral text-neutral-text-primary focus:border-primary-border focus:shadow-neutral-bg',
    outline:
      'bg-transparent border-neutral text-neutral-text-primary focus:border-primary-border focus:shadow-neutral-bg',
    subtle:
      'bg-neutral-bg border-neutral-bg text-neutral-text-primary focus:border-neutral focus:shadow-neutral-bg',
    ghost:
      'text-neutral-text-primary bg-transparent border border-dashed border-neutral hover:bg-neutral-bg focus:shadow-none',
  },
};

export const getPaddingClasses = (
  size: 'small' | 'middle' | 'large',
  hasIcon: boolean,
  hasIconRight: boolean
): string => {
  const basePadding = {
    small: hasIcon ? 'pl-8' : 'pl-2',
    middle: hasIcon ? 'pl-10' : 'pl-4',
    large: hasIcon ? 'pl-12' : 'pl-6',
  };

  const rightPadding = {
    small: hasIconRight ? 'pr-8' : 'pr-2',
    middle: hasIconRight ? 'pr-10' : 'pr-2',
    large: hasIconRight ? 'pr-12' : 'pr-4',
  };

  return `${basePadding[size]} ${rightPadding[size]}`;
};
