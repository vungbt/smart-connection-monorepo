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
  icon?: IconName;
  iconRight?: IconName;
  customClasses?: {
    root?: string;
    icon?: string;
    iconRight?: string;
  };
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
    solid: 'bg-primary text-white hover:bg-primary-base',
    outline: 'border border-primary text-primary bg-transparent hover:bg-primary-background',
    subtle: 'bg-primary-background text-primary-base hover:bg-primary-hover',
    link: 'text-primary bg-transparent hover:underline',
    text: 'text-primary bg-transparent hover:text-primary-clicked',
    ghost:
      'text-primary bg-transparent border border-dashed border-primary hover:bg-primary-background',
  },
  secondary: {
    solid: 'bg-secondary text-white hover:bg-secondary-base',
    outline: 'border border-secondary text-secondary bg-transparent hover:bg-secondary-background',
    subtle: 'bg-secondary-background text-secondary-base hover:bg-secondary-hover',
    link: 'text-secondary bg-transparent hover:underline',
    text: 'text-secondary bg-transparent hover:text-secondary-clicked',
    ghost:
      'text-secondary bg-transparent border border-dashed border-secondary hover:bg-secondary-background',
  },
  success: {
    solid: 'bg-success text-white hover:bg-success-base',
    outline: 'border border-success text-success bg-transparent hover:bg-success-bg',
    subtle: 'bg-success-bg text-success hover:bg-success-base',
    link: 'text-success bg-transparent hover:underline',
    text: 'text-success bg-transparent hover:text-success-base',
    ghost: 'text-success bg-transparent border border-dashed border-success hover:bg-success-bg',
  },
  error: {
    solid: 'bg-error text-white hover:bg-error-base',
    outline: 'border border-color-error text-error bg-transparent hover:bg-error-bg',
    subtle: 'bg-error-bg text-error hover:bg-error-base',
    link: 'text-error bg-transparent hover:underline',
    text: 'text-error bg-transparent hover:text-error-base',
    ghost: 'text-error bg-transparent border border-dashed border-error hover:bg-error-bg',
  },
  pending: {
    solid: 'bg-pending text-white hover:bg-pending-base',
    outline: 'border border-pending text-pending bg-transparent hover:bg-pending-bg',
    subtle: 'bg-pending-bg text-pending hover:bg-pending-base',
    link: 'text-pending bg-transparent hover:underline',
    text: 'text-pending bg-transparent hover:text-pending-base',
    ghost: 'text-pending bg-transparent border border-dashed border-pending hover:bg-pending-bg',
  },
  neutral: {
    solid: 'bg-neutral text-white hover:bg-neutral-text-primary',
    outline: 'border border-neutral text-neutral bg-transparent hover:bg-neutral-bg',
    subtle: 'bg-neutral-bg text-neutral hover:bg-neutral-text-primary',
    link: 'text-neutral bg-transparent hover:underline',
    text: 'text-neutral bg-transparent hover:text-neutral-text-primary',
    ghost: 'text-neutral bg-transparent border border-dashed border-neutral hover:bg-neutral-bg',
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
      icon,
      iconRight,
      customClasses,
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
          className,
          customClasses?.root
        )}
        disabled={disabled || loading}
        {...rest}
      >
        {loading ? (
          <RenderIcon
            name="loading"
            className={clsx(getIconSize(), children ? 'mr-2' : '', customClasses?.icon)}
          />
        ) : (
          icon && (
            <RenderIcon
              name={icon}
              className={clsx(getIconSize(), children ? 'mr-2' : '', customClasses?.icon)}
            />
          )
        )}
        {children}
        {iconRight && (
          <RenderIcon
            name={iconRight}
            className={clsx(getIconSize(), children ? 'ml-2' : '', customClasses?.iconRight)}
          />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
