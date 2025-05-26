import React from 'react';
import { Radio } from '.';
import clsx from 'clsx';

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
  };
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
  disabled,
  className,
  customClasses,
}) => {
  return (
    <div className={clsx(className, customClasses?.root, 'flex items-center')}>
      {options.map(option => (
        <Radio
          key={option.value}
          label={option.label}
          name={name}
          value={option.value}
          size={size}
          color={color}
          optionType={optionType}
          checked={value === option.value}
          onChange={() => onChange?.(option.value)}
          disabled={disabled || option.disabled}
        />
      ))}
    </div>
  );
};
