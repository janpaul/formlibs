import { FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';
import { useFormikContext } from 'formik';
import get from 'lodash.get';

type Props = {
  label: string;
  prefix?: string;
  name: string;
};

export const Checkbox = ({ label, prefix, name }: Props) => {
  const formik = useFormikContext();
  const fieldName = prefix ? `${prefix}.${name}` : `${name}`;
  const value = get(formik.values, fieldName, false);
  return (
    <FormControlLabel
      label={label}
      control={
        <MuiCheckbox
          name={fieldName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={value}
        />
      }
    />
  );
};
