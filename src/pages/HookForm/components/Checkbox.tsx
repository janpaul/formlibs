import {
  CheckboxProps,
  Checkbox as MuiCheckbox,
  FormControlLabel,
} from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  required?: boolean;
  prefix?: string;
};

export const Checkbox = ({
  prefix,
  name,
  label,
  required,
  ...props
}: CheckboxProps & Props) => {
  const { control } = useFormContext();
  const fieldName = prefix ? `${prefix}.${name}` : `${name}`;

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={<MuiCheckbox {...field} required={required} {...props} />}
        />
      )}
    />
  );
};
