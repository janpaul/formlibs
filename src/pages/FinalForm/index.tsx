import * as yup from 'yup';
import { Form, useFormState } from 'react-final-form';
import { TextField } from 'mui-rff';
import { useRef, useState } from 'react';
import { sleep } from '../../util';
import { TogglesForm } from './TogglesForm';
import { ExtraInfoForm } from './ExtraInfoForm';
import { Button } from '@material-ui/core';
import { validateFormValues } from './yupToRFF';

const topLevelValidation = yup.object().shape({
  firstName: yup.string().min(5).max(20).required(),
  lastName: yup.string().min(5).max(20).required(),
});

const extraFormValidation = yup.object().shape({
  street: yup.string().max(20),
  number: yup
    .number()
    .optional()
    .when('extraInfo.street', {
      is: (val: Record<string, any>) => !!val,
      then: yup.number().required(),
    }),
});

const validate = validateFormValues(
  topLevelValidation.concat(
    yup.object().shape({
      age: yup
        .number()
        .optional()
        .when('toggles.age', {
          is: (val: boolean) => val,
          then: yup.number().required(),
        }),
      extraInfo: extraFormValidation,
    })
  )
);

const FinalFormPage = () => {
  const renderCount = useRef<number>(0);
  const [submitted, setSubmitted] = useState('');
  const handleOnSubmit = async (values: any) => {
    setSubmitted('Submitting...');
    await sleep(2500);
    setSubmitted(JSON.stringify(values));
    return true;
  };

  renderCount.current++;
  return (
    <div>
      <h1>Final Form</h1>
      <h2>Current re-renders of form: {renderCount.current}</h2>

      <Form
        onSubmit={handleOnSubmit}
        validate={validate}
        component={FinalFormForm}
      />
      {!!submitted && (
        <>
          <h3>Submitted</h3>
          <pre>{submitted}</pre>
        </>
      )}
    </div>
  );
};

export default FinalFormPage;

const FinalFormForm = () => {
  const form = useFormState();
  const timesCalled = useRef<number>(0);
  const showAge = form.values.toggles?.age;
  const showExtraInfo = form.values.toggles?.extraInfo;
  timesCalled.current++;
  return (
    <>
      <h2>Rerenders of form: {timesCalled.current} </h2>

      <TextField
        required
        variant="outlined"
        name="firstName"
        label="First name"
      />
      <TextField
        required
        variant="outlined"
        name="lastName"
        label="Last name"
      />
      {showAge && (
        <TextField required variant="outlined" name="age" label="Age" />
      )}
      <TogglesForm prefix="toggles" />
      {showExtraInfo && <ExtraInfoForm prefix="extraInfo" />}
      <Button disabled={form.submitting} variant="contained" type="submit">
        {form.submitting ? 'Submitting...' : 'Submit'}
      </Button>
      <h3>Current values</h3>
      <pre>{!!form?.values && JSON.stringify(form.values)}</pre>
    </>
  );
};
