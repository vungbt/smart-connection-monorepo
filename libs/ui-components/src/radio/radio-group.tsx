import React from 'react';
import { Radio } from '.';
import clsx from 'clsx';
import { FormErrorMessage } from '../form/form-error-message';

export interface RadioOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  customClasses?: {
    root?: string;
    error?: string;
  };
  error?: string;
  size?: 'small' | 'middle' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'pending' | 'neutral';
  optionType?: 'button' | 'default';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  size = 'middle',
  color,
  optionType,
  error,
  disabled,
  className,
  customClasses,
}) => {
  const colorClass = error ? 'error' : color;

  return (
    <>
      <div className={clsx(className, customClasses?.root, 'flex items-center')}>
        {options.map(option => (
          <Radio
            key={option.value}
            label={option.label}
            name={name}
            value={option.value}
            size={size}
            color={colorClass}
            optionType={optionType}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
            disabled={disabled || option.disabled}
          />
        ))}
      </div>
    </>
  );
};
