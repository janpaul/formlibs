import { FieldAttributes, useFormikContext } from 'formik';
import { TextField } from './components/TextField';

export const ExtraInfoForm = ({ prefix }: FieldAttributes<any>) => {
  const formik = useFormikContext<any>();
  return (
    <div>
      <TextField
        prefix={prefix}
        name="street"
        label="Street"
        variant="outlined"
      />
      <TextField
        prefix={prefix}
        name="number"
        label="Number"
        required={!!formik.values[prefix].street}
        variant="outlined"
      />
    </div>
  );
};
