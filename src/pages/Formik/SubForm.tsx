import { Field, Formik, useFormikContext } from 'formik';
import { ReactNode } from 'react';
import { ObjectSchema } from 'yup';

type Props = {
  validationSchema?: ObjectSchema<any>;
  prefix: string;
  Component: ReactNode;
  initialValues: Record<string, any>;
};

const emptyOnSubmit = () => {};
export const SubForm = ({
  prefix,
  validationSchema,
  Component,
  initialValues,
}: Props) => {
  const formik = useFormikContext();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={emptyOnSubmit}
      validationSchema={validationSchema}
    >
      <Field
        name={prefix}
        component={Component}
        setFieldValue={formik.setFieldValue}
        setFieldError={formik.setFieldError}
        setErrors={formik.setErrors}
      />
    </Formik>
  );
};
