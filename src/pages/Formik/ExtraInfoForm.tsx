import { useFormikContext } from 'formik';
import { TextField } from './components/TextField';
import get from 'lodash.get';

export const ExtraInfoForm = ({ prefix }: { prefix?: string }) => {
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
        required={!!get(formik.values, prefix ? `${prefix}.street` : 'street')}
        variant="outlined"
      />
    </div>
  );
};
