// import { Checkbox } from './components/Checkbox';

import { Checkbox } from './components/Checkbox';

export const TogglesForm = ({ prefix }: { prefix: string }) => {
  return (
    <div>
      <Checkbox label="Show age" prefix={prefix} name="age" />
      <Checkbox label="Show extra info" prefix={prefix} name="extraInfo" />
    </div>
  );
};
