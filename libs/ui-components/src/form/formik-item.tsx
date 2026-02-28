import { useField } from 'formik';
import React, { ReactElement, cloneElement } from 'react';
import { FormLabel } from './form-label';
import { FormErrorMessage } from './form-error-message';
import clsx from 'clsx';

interface FormikItemProps {
  name: string;
  label?: string;
  children: ReactElement<any>;
  required?: boolean;
  size?: 'small' | 'middle' | 'large';
  className?: string;
  mapValue?: (value: any) => any;
  mapOnChange?: (value: any) => any;
}

export const FormikItem: React.FC<FormikItemProps> = ({
  name,
  label,
  children,
  required,
  size,
  className,
  mapValue,
  mapOnChange,
}) => {
  const [field, meta] = useField(name);
  const isError = meta.touched && !!meta.error;
  return (
    <div className={clsx('mb-4', className)}>
      {label && (
        <FormLabel id={name} size={size} required={required}>
          {label}
        </FormLabel>
      )}

      {cloneElement(children, {
        ...field,
        value: mapValue ? mapValue(field.value) : field.value,
        onChange: (value: any) => {
          const mappedValue = mapOnChange ? mapOnChange(value) : value;
          if (mappedValue?.target) return field.onChange(mappedValue);

          if (mappedValue === undefined) {
            return field.onChange({
              target: {
                name: field.name,
                value: '',
              },
            });
          }

          field.onChange({
            target: {
              name: field.name,
              value: mappedValue,
            },
          });
        },
        id: name,
        name: name,
        size: size,
        required: required,
        error: isError ? meta.error : undefined,
        className: children.props.className,
      })}

      {isError && <FormErrorMessage error={meta.error ?? ''} size={size} />}
    </div>
  );
};
