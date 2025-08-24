// components/FormikForm.tsx
import { Formik, FormikConfig, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';

type FormikFormProps<Values> = FormikConfig<Values> & {
  children: React.ReactNode;
};

export function FormikForm<Values extends Record<string, any>>({
  children,
  ...props
}: FormikFormProps<Values>) {
  return <Formik<Values> {...props}>{() => <Form>{children}</Form>}</Formik>;
}

export { Yup as yup };
