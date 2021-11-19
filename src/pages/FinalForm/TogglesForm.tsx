// import { Checkbox } from './components/Checkbox';
import { Checkboxes } from 'mui-rff';

export const TogglesForm = ({ prefix }: { prefix: string }) => {
  const fieldName = (name: string) => (prefix ? `${prefix}.${name}` : name);
  return (
    <div>
      <Checkboxes
        data={{ label: 'Show Age', value: true }}
        name={fieldName('age')}
      />
      <Checkboxes
        data={{ label: 'Show extra info', value: true }}
        name={fieldName('extraInfo')}
      />
    </div>
  );
};
