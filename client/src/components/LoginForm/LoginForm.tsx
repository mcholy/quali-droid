import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../../middleware/api';
import { authResponse, loginDTO } from '../../models/model';
import { authStore, hydrateAuth } from '../../stores/authStore';
import { getClaims, saveTokenInLocalStorage } from '../../utils/handleJwt';
import Button from '../Button/Button';
import ErrorSection from '../ErrorSection/ErrorSection';
import './LoginForm.css';

function LoginForm() {
  const [error, setError] = useState<string>();
  const location = useLocation();
  const { setCredentials } = authStore();
  const navigate = useNavigate();

  const initialValues: loginDTO = {
    userName: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .email('Invalid email.')
      .required('Email is required.'),
    password: Yup.string().min(8).max(12).required('Password is required.'),
  });

  const handleSubmit = async (values: loginDTO) => {
    try {
      const response = await login(values);
      saveTokenInLocalStorage(response as authResponse);
      const { claims } = getClaims();
      setCredentials(claims);
      hydrateAuth();
      const { from } = location.state || { from: { pathname: '/' } };
      navigate(from, { replace: true });
    } catch (error) {
      setError(error as string);
      console.error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="LoginForm">
              <div className="LoginForm__hero-content">
                <div className="LoginForm__card">
                  <div className="LoginForm__card-body">
                    <div className="LoginForm__form-control">
                      <label className="LoginForm__label">
                        <span className="LoginForm__label-text">Email</span>
                      </label>
                      <Field
                        type="text"
                        name="userName"
                        className="LoginForm__input"
                      />
                      <ErrorMessage name="userName" component="div" />
                    </div>
                    <div className="LoginForm__form-control">
                      <label className="LoginForm__label">
                        <span className="LoginForm__label-text">Password</span>
                      </label>
                      <Field
                        type="password"
                        name="password"
                        className="LoginForm__input"
                      />
                      <ErrorMessage name="password" component="div" />
                    </div>
                    <div className="LoginForm__form-control">
                      <Button
                        type="submit"
                        text={isSubmitting ? 'Logging...' : 'Log In'}
                        disabled={isSubmitting}
                      />
                    </div>
                    <label className="LoginForm__label">
                      <span className="LoginForm__label-text">
                        User: qualidroid, Pass: Quali022024#
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ErrorSection error={error}/>
    </>
  );
}

export default LoginForm;
