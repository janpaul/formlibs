import { Checkbox } from './components/Checkbox';

export const TogglesForm = ({ prefix }: any) => {
  return (
    <div>
      <Checkbox label="Show Age" name="age" prefix={prefix} />
      <Checkbox label="Show extra info" name="extraInfo" prefix={prefix} />
    </div>
  );
};
