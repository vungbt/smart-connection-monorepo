// components/FormikForm.tsx
import { Formik, FormikConfig, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';

type FormikFormProps<Values> = FormikConfig<Values> & {
  children: React.ReactNode;
  className?: string;
};

export function FormikForm<Values extends Record<string, any>>({
  children,
  className,
  ...props
}: FormikFormProps<Values>) {
  return <Formik<Values> {...props}>{() => <Form className={className}>{children}</Form>}</Formik>;
}

export { Yup as yup };
