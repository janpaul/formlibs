import { Form, Formik, useFormikContext } from 'formik';
import { PropsWithChildren, useRef } from 'react';
import { sleep } from '../../util';
import { TextField } from './TextField';
import * as yup from 'yup';
import { SubForm } from './SubForm';
import { TogglesForm } from './TogglesForm';
import { Button } from '@material-ui/core';

const topLevelValidation = yup.object().shape({
  firstName: yup.string().min(5).max(20).required(),
  lastName: yup.string().min(5).max(20).required(),
});

const FormikPage = () => {
  const renderCount = useRef<number>(0);
  const handleOnSubmit = async (values: any) => {
    console.log(values);
    await sleep(2500);
    console.log('done');
    return true;
  };

  renderCount.current++;
  return (
    <div>
      <h1>Formik</h1>
      <h2>Current re-renders of page: {renderCount.current}</h2>
      <Formik
        initialValues={{ firstName: '', lastName: '' }}
        onSubmit={handleOnSubmit}
        validationSchema={topLevelValidation}
      >
        <FormikForm />
      </Formik>
    </div>
  );
};

export default FormikPage;

const FormikForm = () => {
  const formik = useFormikContext();
  return (
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
        validateOnlyBlur
      />
      <SubForm
        Component={TogglesForm}
        prefix={'toggles'}
        initialValues={{ age: false }}
      />
      <Button disabled={formik.isSubmitting} variant="contained" type="submit">
        {formik.isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </Form>
  );
};
