import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useFormikContext } from 'formik';
import get from 'lodash.get';
import { useValues } from './useValues';

export const TogglesForm = (props: { name: string }) => {
  const formik = useFormikContext();
  const fieldName = (name: string) => `${props.name}.${name}`;
  useValues(props.name, props);
  console.log(props.name, props);
  return (
    <FormControlLabel
      label="Toggle age"
      control={
        <Checkbox
          name="age"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={get(formik.values, fieldName('age'), false)}
        />
      }
    />
  );
};
