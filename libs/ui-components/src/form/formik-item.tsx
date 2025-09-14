import { useField } from 'formik';
import React, { ReactElement, cloneElement } from 'react';
import { FormLabel } from './form-label';
import { FormErrorMessage } from './form-error-message';

interface FormikItemProps {
  name: string;
  label?: string;
  children: ReactElement<any>;
  required?: boolean;
  size?: 'small' | 'middle' | 'large';
}

export const FormikItem: React.FC<FormikItemProps> = ({
  name,
  label,
  children,
  required,
  size,
}) => {
  const [field, meta] = useField(name);
  const isError = meta.touched && !!meta.error;
  return (
    <div className="mb-4">
      {label && (
        <FormLabel id={name} size={size} required={required}>
          {label}
        </FormLabel>
      )}

      {cloneElement(children, {
        ...field,
        onChange: (value: any) => {
          console.log('value', value);
          if (value?.target) return field.onChange(value);
          field.onChange({
            target: {
              name: field.name,
              value: value,
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
