import { Link, Route, Switch } from 'react-router-dom';
import FinalFormPage from './pages/FinalForm';
import FormikPage from './pages/Formik';
import HookFormPage from './pages/HookForm';

function App() {
  return (
    <div>
      <header>
        <ul>
          <li>
            <Link to="/finalform">react-final-form</Link>
          </li>
          <li>
            <Link to="/formik">formik</Link>
          </li>
          <li>
            <Link to="/hookform">react-hook-form</Link>
          </li>
        </ul>
      </header>
      <div style={{ padding: 32 }}>
        <Switch>
          <Route path={['/', '/finalform']} exact component={FinalFormPage} />
          <Route path="/formik" component={FormikPage} />
          <Route path="/hookform" component={HookFormPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
