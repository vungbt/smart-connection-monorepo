import React from 'react';
import { Checkbox } from '.';
import clsx from 'clsx';

export interface CheckboxOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  customClasses?: {
    root?: string;
  };
  size?: 'small' | 'middle' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'pending' | 'neutral';
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  value,
  onChange,
  name,
  size = 'middle',
  color,
  disabled,
  className,
  customClasses,
}) => {
  return (
    <div className={clsx(className, customClasses?.root, 'flex items-center')}>
      {options.map(option => (
        <Checkbox
          key={option.value}
          label={option.label}
          name={name}
          value={option.value}
          size={size}
          color={color}
          checked={value === option.value}
          onChange={() => onChange?.(option.value)}
          disabled={disabled || option.disabled}
        />
      ))}
    </div>
  );
};
