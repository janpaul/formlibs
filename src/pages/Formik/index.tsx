import { Form, Formik, useFormikContext } from 'formik';
import { useRef, useState } from 'react';
import { sleep } from '../../util';
import { TextField } from './components/TextField';
import * as yup from 'yup';
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

const initialValues = {
  firstName: '',
  lastName: '',
  toggles: {},
  extraInfo: {},
};

const FormikPage = () => {
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
      <h1>Formik</h1>
      <h2>Current re-renders of page: {renderCount.current}</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validationSchema={topLevelValidation.concat(
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
        )}
      >
        <FormikForm />
      </Formik>
      {!!submitted && (
        <>
          <h3>Submitted</h3>
          <pre>{submitted}</pre>
        </>
      )}
    </div>
  );
};

export default FormikPage;

const FormikForm = () => {
  const formik = useFormikContext<any>();
  const timesCalled = useRef<number>(0);

  const showAge = formik.values.toggles?.age;
  const showExtraInfo = formik.values.toggles?.extraInfo;

  timesCalled.current++;
  return (
    <>
      <h2>Rerenders of form: {timesCalled.current} </h2>
      <Form>
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
        <Button
          disabled={formik.isSubmitting}
          variant="contained"
          type="submit"
        >
          {formik.isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>
      <h3>Current values</h3>
      <pre>{!!formik?.values && JSON.stringify(formik.values)}</pre>
    </>
  );
};
