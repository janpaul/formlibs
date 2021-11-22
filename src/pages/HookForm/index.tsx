import { TextField } from './components/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useRef, useState } from 'react';
import { sleep } from '../../util';
import { TogglesForm } from './TogglesForm';
import { Button } from '@material-ui/core';
import { ExtraInfoForm } from './ExtraInfoForm';

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

const schema = topLevelValidation.concat(
  yup.object({
    age: yup
      .number()
      .optional()
      .when('toggles.age', {
        is: (val: boolean) => val,
        then: yup.number().required(),
      }),
    extraInfo: extraFormValidation,
  })
);

const HookFormPage = () => {
  const form = useForm({
    resolver: yupResolver(schema),
  });
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
      <FormProvider {...form}>
        <form onSubmit={handleOnSubmit}>
          <HookFormForm />
        </form>
      </FormProvider>
      {!!submitted && (
        <>
          <h3>Submitted</h3>
          <pre>{submitted}</pre>
        </>
      )}
    </div>
  );
};

export default HookFormPage;

const HookFormForm = () => {
  const {
    watch,
    formState: { isSubmitting, errors },
    getValues,
  } = useFormContext();
  const [showAge, showExtraInfo] = watch(['toggles.age', 'toggles.extraInfo']);

  const timesCalled = useRef<number>(0);
  timesCalled.current++;
  console.log(errors);
  const values = getValues();
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
      <Button disabled={isSubmitting} variant="contained" type="submit">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
      <h3>Current values</h3>
      <pre>{!!values && JSON.stringify(values)}</pre>
    </>
  );
};
