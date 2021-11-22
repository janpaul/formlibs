import { useFormContext } from 'react-hook-form';
import { TextField } from './components/TextField';

export const ExtraInfoForm = ({ prefix }: { prefix?: string }) => {
  const { watch } = useFormContext();
  const fieldName = (name: string) => (prefix ? `${prefix}.${name}` : name);
  const street = watch(fieldName('street'));
  return (
    <div>
      <TextField
        name="street"
        prefix={prefix}
        label="Street"
        variant="outlined"
      />
      <TextField
        name="number"
        prefix={prefix}
        label="Number"
        required={!!street}
        variant="outlined"
      />
    </div>
  );
};
