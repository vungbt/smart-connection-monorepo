import clsx from 'clsx';
import React from 'react';

export const FormLabel = ({
  children,
  required,
  id,
  className,
  size,
}: {
  children: React.ReactNode;
  required?: boolean;
  id?: string;
  size?: 'small' | 'middle' | 'large';
  className?: string;
}) => {
  const getLabelSize = () => {
    switch (size) {
      case 'small':
        return 'text-14';
      case 'large':
        return 'text-16';
      default:
        return 'text-14';
    }
  };

  return (
    <label
      htmlFor={id ?? (children as React.ReactElement<{ id?: string }>)?.props?.id}
      className={clsx(
        'block font-medium mb-1 w-fit',
        getLabelSize(),
        'text-neutral-text-primary',
        className
      )}
    >
      {children}
      {required && <span className="text-error ml-1">*</span>}
    </label>
  );
};
