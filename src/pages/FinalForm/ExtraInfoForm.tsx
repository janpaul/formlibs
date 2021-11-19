import { TextField } from 'mui-rff';
import { useFormState } from 'react-final-form';
import get from 'lodash.get';

export const ExtraInfoForm = ({ prefix }: { prefix?: string }) => {
  const form = useFormState();
  const fieldName = (name: string) => (prefix ? `${prefix}.${name}` : name);

  return (
    <div>
      <TextField name={fieldName('street')} label="Street" variant="outlined" />
      <TextField
        name={fieldName('number')}
        label="Number"
        required={!!get(form.values, prefix ? `${prefix}.street` : 'street')}
        variant="outlined"
      />
    </div>
  );
};
