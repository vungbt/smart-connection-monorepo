import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { IconName, RenderIcon } from '../icons';

export type InputPasswordProps = {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'middle' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'pending' | 'neutral';
  variant?: 'solid' | 'outline' | 'subtle' | 'ghost';
  icon?: IconName;
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  customClasses?: {
    root?: string;
    label?: string;
    input?: string;
    icon?: string;
    iconRight?: string;
    helperText?: string;
    error?: string;
  };
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'password'>;

const sizeClasses = {
  small: 'px-2 py-1 text-14',
  middle: 'px-4 py-2 text-16',
  large: 'px-6 py-3 text-16',
};

const colorClasses = {
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
    solid: 'bg-error-bg border-error text-error focus:border-error-base focus:shadow-error-bg',
    outline: 'bg-transparent border-error text-error focus:border-error-base focus:shadow-error-bg',
    subtle: 'bg-error-bg border-error-bg text-error focus:border-error focus:shadow-error-bg',
    ghost:
      'text-error bg-transparent border border-dashed border-error hover:bg-error-bg focus:shadow-none',
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
      'bg-neutral-bg border-neutral text-neutral focus:border-neutral-text-primary focus:shadow-neutral-bg',
    outline:
      'bg-transparent border-neutral text-neutral focus:border-neutral-text-primary focus:shadow-neutral-bg',
    subtle:
      'bg-neutral-bg border-neutral-bg text-neutral focus:border-neutral focus:shadow-neutral-bg',
    ghost:
      'text-neutral bg-transparent border border-dashed border-neutral hover:bg-neutral-bg focus:shadow-none',
  },
};

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  (
    {
      className,
      disabled,
      loading,
      size = 'middle',
      color = 'neutral',
      variant = 'outline',
      icon,
      label,
      helperText,
      error,
      required,
      customClasses,
      id,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const colorClass = error ? colorClasses.error[variant] : colorClasses[color][variant];
    const getIconSize = (): string => {
      switch (size) {
        case 'small':
          return '!h-4 !w-4';
        case 'large':
          return '!h-6 !w-6';
        default:
          return '!h-5 !w-5';
      }
    };

    const getLabelSize = (): string => {
      switch (size) {
        case 'small':
          return 'text-14';
        case 'large':
          return 'text-16';
        default:
          return 'text-16';
      }
    };

    const getHelperTextSize = (): string => {
      switch (size) {
        case 'small':
          return 'text-14';
        case 'large':
          return 'text-16';
        default:
          return 'text-16';
      }
    };

    return (
      <div className={clsx('w-full', customClasses?.root)}>
        {label && (
          <label
            htmlFor={id}
            className={clsx(
              'block font-medium mb-1 w-fit',
              getLabelSize(),
              error ? 'text-error' : 'text-neutral-text-primary',
              customClasses?.label
            )}
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <RenderIcon
                name={loading ? 'loading' : icon}
                className={clsx(getIconSize(), customClasses?.icon, loading && 'animate-spin')}
              />
            </div>
          )}

          <input
            ref={ref}
            id={id}
            type={showPassword ? 'text' : 'password'}
            className={clsx(
              'w-full border rounded-lg transition-all ease-in-out outline-none focus:shadow-border',
              sizeClasses[size],
              colorClass,
              icon ? (size === 'small' ? 'pl-8' : size === 'large' ? 'pl-12' : 'pl-10') : '',
              size === 'small' ? 'pr-8' : size === 'large' ? 'pr-12' : 'pr-10',
              disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
              className,
              customClasses?.input
            )}
            disabled={disabled || loading}
            {...rest}
          />

          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-fit cursor-pointer z-[1]"
            onClick={() => setShowPassword(!showPassword)}
          >
            <RenderIcon
              name={showPassword ? 'eye' : 'eye-slash'}
              className={clsx(getIconSize(), customClasses?.iconRight)}
            />
          </div>
        </div>

        {(helperText || error) && (
          <div className="mt-1">
            {error ? (
              <p className={clsx('text-error', getHelperTextSize(), customClasses?.error)}>
                {error}
              </p>
            ) : (
              helperText && (
                <p
                  className={clsx(
                    'text-neutral-placeholder',
                    getHelperTextSize(),
                    customClasses?.helperText
                  )}
                >
                  {helperText}
                </p>
              )
            )}
          </div>
        )}
      </div>
    );
  }
);

InputPassword.displayName = 'InputPassword';
