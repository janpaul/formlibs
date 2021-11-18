import { FormikBag } from 'formik';
import { useEffect } from 'react';

export const useValues = (name: string, props: any) => {
  useEffect(() => {
    props?.setFieldValue(name, { ...props.values }, false);
  }, [name, props.values]);
};
