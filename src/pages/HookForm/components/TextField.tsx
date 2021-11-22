import { TextFieldProps, TextField as MuiTextField } from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';
import get from 'lodash.get';

type Props = {
  name: string;
  label: string;
  required?: boolean;
  prefix?: string;
};

export const TextField = ({
  prefix,
  name,
  label,
  required,
  ...props
}: TextFieldProps & Props) => {
  const {
    control,
    formState: { errors, touchedFields },
  } = useFormContext();
  const fieldName = prefix ? `${prefix}.${name}` : `${name}`;
  const touched = get(touchedFields, fieldName);
  const error = get(errors, fieldName);

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <MuiTextField
          {...field}
          required={required}
          label={label}
          error={touched && !!error}
          helperText={touched && error}
          {...props}
        />
      )}
    />
  );
};
