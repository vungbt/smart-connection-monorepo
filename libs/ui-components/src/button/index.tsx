import clsx from 'clsx';
import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { IconName, RenderIcon } from '../icons';

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'middle' | 'large';
  shape?: 'default' | 'circle' | 'round';
  danger?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'pending' | 'neutral';
  variant?: 'solid' | 'outline' | 'subtle' | 'link' | 'text' | 'ghost';
  iconLeft?: IconName;
  iconRight?: IconName;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const sizeClasses = {
  small: 'px-2 py-1 text-sm',
  middle: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-lg',
};

const shapeClasses = {
  default: 'rounded-lg',
  circle: 'rounded-full p-2 w-10 h-10 flex items-center justify-center',
  round: 'rounded-full',
};

const colorClasses = {
  primary: {
    solid: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-base)]',
    outline:
      'border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary-bg)]',
    subtle:
      'bg-[var(--color-primary-bg)] text-[var(--color-primary-base)] hover:bg-[var(--color-primary-hover)]',
    link: 'text-[var(--color-primary)] bg-transparent hover:underline',
    text: 'text-[var(--color-primary)] bg-transparent hover:text-[var(--color-primary-hover)]',
    ghost:
      'text-[var(--color-primary)] bg-transparent border border-dashed border-[var(--color-primary)] hover:bg-[var(--color-primary-bg)]',
  },
  secondary: {
    solid: 'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-base)]',
    outline:
      'border border-[var(--color-secondary)] text-[var(--color-secondary)] bg-transparent hover:bg-[var(--color-secondary-bg)]',
    subtle:
      'bg-[var(--color-secondary-bg)] text-[var(--color-secondary-base)] hover:bg-[var(--color-secondary-hover)]',
    link: 'text-[var(--color-secondary)] bg-transparent hover:underline',
    text: 'text-[var(--color-secondary)] bg-transparent hover:text-[var(--color-secondary-hover)]',
    ghost:
      'text-[var(--color-secondary)] bg-transparent border border-dashed border-[var(--color-secondary)] hover:bg-[var(--color-secondary-bg)]',
  },
  success: {
    solid: 'bg-[var(--color-success)] text-white hover:bg-[var(--color-success-base)]',
    outline:
      'border border-[var(--color-success)] text-[var(--color-success)] bg-transparent hover:bg-[var(--color-success-bg)]',
    subtle:
      'bg-[var(--color-success-bg)] text-[var(--color-success)] hover:bg-[var(--color-success-base)]',
    link: 'text-[var(--color-success)] bg-transparent hover:underline',
    text: 'text-[var(--color-success)] bg-transparent hover:text-[var(--color-success-base)]',
    ghost:
      'text-[var(--color-success)] bg-transparent border border-dashed border-[var(--color-success)] hover:bg-[var(--color-success-bg)]',
  },
  error: {
    solid: 'bg-[var(--color-error)] text-white hover:bg-[var(--color-error-base)]',
    outline:
      'border border-[var(--color-error)] text-[var(--color-error)] bg-transparent hover:bg-[var(--color-error-bg)]',
    subtle:
      'bg-[var(--color-error-bg)] text-[var(--color-error)] hover:bg-[var(--color-error-base)]',
    link: 'text-[var(--color-error)] bg-transparent hover:underline',
    text: 'text-[var(--color-error)] bg-transparent hover:text-[var(--color-error-base)]',
    ghost:
      'text-[var(--color-error)] bg-transparent border border-dashed border-[var(--color-error)] hover:bg-[var(--color-error-bg)]',
  },
  pending: {
    solid: 'bg-[var(--color-pending)] text-white hover:bg-[var(--color-pending-base)]',
    outline:
      'border border-[var(--color-pending)] text-[var(--color-pending)] bg-transparent hover:bg-[var(--color-pending-bg)]',
    subtle:
      'bg-[var(--color-pending-bg)] text-[var(--color-pending)] hover:bg-[var(--color-pending-base)]',
    link: 'text-[var(--color-pending)] bg-transparent hover:underline',
    text: 'text-[var(--color-pending)] bg-transparent hover:text-[var(--color-pending-base)]',
    ghost:
      'text-[var(--color-pending)] bg-transparent border border-dashed border-[var(--color-pending)] hover:bg-[var(--color-pending-bg)]',
  },
  neutral: {
    solid: 'bg-[var(--color-neutral)] text-white hover:bg-[var(--color-neutral-text-primary)]',
    outline:
      'border border-[var(--color-neutral)] text-[var(--color-neutral)] bg-transparent hover:bg-[var(--color-neutral-bg)]',
    subtle:
      'bg-[var(--color-neutral-bg)] text-[var(--color-neutral)] hover:bg-[var(--color-neutral-text-primary)]',
    link: 'text-[var(--color-neutral)] bg-transparent hover:underline',
    text: 'text-[var(--color-neutral)] bg-transparent hover:text-[var(--color-neutral-text-primary)]',
    ghost:
      'text-[var(--color-neutral)] bg-transparent border border-dashed border-[var(--color-neutral)] hover:bg-[var(--color-neutral-bg)]',
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      loading,
      size = 'middle',
      shape = 'default',
      danger,
      color = 'primary',
      variant = 'solid',
      iconLeft,
      iconRight,
      ...rest
    },
    ref
  ) => {
    const colorClass = danger ? colorClasses.error[variant] : colorClasses[color][variant];

    const getIconSize = () => {
      switch (size) {
        case 'small':
          return 'h-4 w-4';
        case 'large':
          return 'h-6 w-6';
        default:
          return 'h-5 w-5';
      }
    };

    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center font-medium transition-colors focus:outline-none',
          sizeClasses[size],
          shapeClasses[shape],
          colorClass,
          disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
          className
        )}
        disabled={disabled || loading}
        {...rest}
      >
        {loading && (
          <svg className="animate-spin mr-2 h-4 w-4 text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        )}
        {iconLeft && (
          <RenderIcon name={iconLeft} className={clsx(getIconSize(), children ? 'mr-2' : '')} />
        )}
        {children}
        {iconRight && (
          <RenderIcon name={iconRight} className={clsx(getIconSize(), children ? 'ml-2' : '')} />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
