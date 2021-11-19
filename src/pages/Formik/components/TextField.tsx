import { TextField as MuiTextField, TextFieldProps } from '@material-ui/core';
import { useFormikContext } from 'formik';
import get from 'lodash.get';

type Props = { prefix?: string; alwaysValidate?: boolean };

export const TextField = ({
  prefix,
  alwaysValidate,
  name,
  ...props
}: TextFieldProps & Props) => {
  const formik = useFormikContext();
  const fieldName = prefix ? `${prefix}.${name}` : `${name}`;
  const value = get(formik.values, fieldName, '');
  const touched = get(formik.touched, fieldName);
  const error = get(formik.errors, fieldName);
  console.log(fieldName);
  return (
    <MuiTextField
      fullWidth
      id={fieldName}
      name={fieldName}
      value={value}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={(touched || alwaysValidate) && !!error}
      helperText={(touched || alwaysValidate) && error}
      {...props}
    />
  );
};
