import { TextField as MuiTextField, TextFieldProps } from '@material-ui/core';
import { useFormikContext } from 'formik';
import get from 'lodash.get';

type Props = { prefix?: string; validateOnlyBlur?: boolean };

export const TextField = ({
  prefix,
  validateOnlyBlur,
  ...props
}: TextFieldProps & Props) => {
  const formik = useFormikContext();
  const fieldName = prefix ? `${prefix}.${props.name}` : `${props.name}`;
  const value = get(formik.values, fieldName);
  const touched = get(formik.touched, fieldName);
  const error = get(formik.errors, fieldName);

  return (
    <MuiTextField
      id={props.name}
      value={value}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={(touched || !validateOnlyBlur) && !!error}
      helperText={(touched || !validateOnlyBlur) && error}
      {...props}
    />
  );
};
