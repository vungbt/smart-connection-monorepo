import React from 'react';
import { Checkbox } from '.';
import clsx from 'clsx';
import { FormErrorMessage } from '../form/form-error-message';

export interface CheckboxOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  name?: string;
  disabled?: boolean;
  className?: string;
  customClasses?: {
    root?: string;
    error?: string;
  };
  size?: 'small' | 'middle' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'pending' | 'neutral';
  error?: string;
  onChange?: (value: string[]) => void;
  value?: string[];
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  name,
  size = 'middle',
  color,
  disabled,
  className,
  customClasses,
  error,
  ...reset
}) => {
  const colorClass = error ? 'error' : color;
  return (
    <div className={clsx(className, customClasses?.root, 'flex items-center')}>
      {options.map(option => (
        <Checkbox
          {...(reset as any)}
          key={option.value}
          label={option.label}
          name={name}
          size={size}
          value={option.value}
          color={colorClass}
          disabled={disabled || option.disabled}
        />
      ))}
    </div>
  );
};
