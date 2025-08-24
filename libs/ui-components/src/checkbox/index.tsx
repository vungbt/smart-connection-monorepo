import clsx from 'clsx';
import React from 'react';
import { RenderIcon } from '../icons';
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  size?: 'small' | 'middle' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'pending' | 'neutral';
  indeterminate?: boolean;
  customClasses?: {
    root?: string;
    label?: string;
    box?: string;
    error?: string;
  };
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = props => {
  const {
    label,
    className,
    size = 'middle',
    color = 'primary',
    indeterminate = false,
    customClasses,
    error,
    ...reset
  } = props;
  const isError = error && error.length > 0;
  const iconName = indeterminate ? 'minus' : 'check-v2';
  const sizeClass = sizeClasses[size];
  const colorClass = isError ? colorClasses.error : colorClasses[color];
  const shouldShowIcon = indeterminate || reset?.checked || reset?.value;
  return (
    <label
      className={clsx(
        'flex items-center cursor-pointer',
        reset.disabled && 'cursor-not-allowed opacity-50',
        className,
        customClasses?.root,
        sizeClass.root
      )}
    >
      <input type="checkbox" className="peer hidden" {...reset} />
      <span
        className={clsx(
          'relative inline-flex items-center justify-center border border-solid bg-white transition-all ease-linear',
          sizeClass.box,
          colorClass.box,
          customClasses?.box
        )}
      >
        {shouldShowIcon && (
          <RenderIcon name={iconName} className={clsx(sizeClass.icon, colorClass.icon)} />
        )}
      </span>

      {label && <span className={clsx(sizeClass.label, customClasses?.label)}>{label}</span>}
    </label>
  );
};

const sizeClasses = {
  small: {
    root: 'gap-1',
    box: 'w-3 h-3 rounded',
    label: 'text-14 px-2',
    icon: '!w-2 !h-2 max-w-2 max-h-2',
  },
  middle: {
    root: 'gap-1',
    box: 'w-4 h-4 rounded',
    label: 'text-14 px-2',
    icon: '!w-2 !h-2 max-w-2 max-h-2',
  },
  large: {
    root: 'gap-1',
    box: 'w-5 h-5 rounded',
    label: 'text-16 px-2',
    icon: '!w-2 !h-2 max-w-2 max-h-2',
  },
};

const colorClasses = {
  primary: {
    box: 'peer-checked:border-primary peer-checked:bg-primary border-neutral',
    icon: 'text-white peer-checked:text-primary',
    label: '',
  },
  secondary: {
    box: 'peer-checked:border-secondary peer-checked:bg-secondary border-neutral',
    icon: 'text-white peer-checked:text-secondary',
    label: '',
  },
  success: {
    box: 'peer-checked:border-success peer-checked:bg-success border-neutral',
    icon: 'text-white peer-checked:text-success',
    label: '',
  },
  error: {
    box: 'peer-checked:border-error peer-checked:bg-error border-error',
    icon: 'text-white peer-checked:text-error',
    label: '',
  },
  pending: {
    box: 'peer-checked:border-pending peer-checked:bg-pending border-neutral',
    icon: 'text-white peer-checked:text-pending',
    label: '',
  },
  neutral: {
    box: 'peer-checked:border-neutral peer-checked:bg-neutral border-neutral',
    icon: 'text-white peer-checked:text-neutral',
    label: '',
  },
};
