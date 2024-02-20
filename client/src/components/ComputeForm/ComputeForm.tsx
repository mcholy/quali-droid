import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { compute } from '../../middleware/api';
import { CalculationFormCreationDto, computeResult } from '../../models/model';
import { resultStore } from '../../stores/resultStore';
import Button from '../Button/Button';
import ErrorSection from '../ErrorSection/ErrorSection';
import './ComputeForm.css';

function ComputeForm() {
  const [error, setError] = useState<string>();
  const location = useLocation();
  const { setCalculations, setPagination, setParams } = resultStore();
  const navigate = useNavigate();

  const initialValues: CalculationFormCreationDto = {
    inputOne:0, 
    inputTwo:0, 
    sampleSize:0, 
  };

  const validationSchema = Yup.object().shape({
    inputOne: Yup.number()
    .required("Required")
    .max(100000000, "To big")
    .min(0, "Not negative number"),
    inputTwo: Yup.number()
    .required("Required")
    .max(100000000, "To big")
    .min(0, "Not negative number"),
    sampleSize: Yup.number()
    .required("Required")
    .max(100000000, "To big")
    .min(0, "Not negative number"),
  });

  const handleSubmit = async (values: CalculationFormCreationDto) => {
    try {
      const response = await compute(values, {pageNumber:1, pageSize:10 });
      setCalculations((response as computeResult).calculations);
      setPagination((response as computeResult).pagination);
      setParams(values.inputOne, values.inputTwo, values.sampleSize);
      const { from } = location.state || { from: { pathname: '/result' } };
      navigate(from, { replace: true });
    } catch (error) {
      setError(error as string);
      console.error(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (formik: any, fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!isNaN(Number(value))) { 
      formik.setFieldValue(fieldName, value);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div className="ComputeForm">
              <div className="ComputeForm__hero-content">
                <div className="ComputeForm__card">
                  <div className="ComputeForm__card-body">
                    <div className="ComputeForm__form-control">
                      <label className="ComputeForm__label">
                        <span className="ComputeForm__label-text">InputOne</span>
                      </label>
                      <Field
                        type="text"
                        name="inputOne"
                        onChange={handleChange(formik, 'inputOne')}
                        className="ComputeForm__input"
                      />
                      <ErrorMessage name="inputOne" component="div" />
                    </div>
                    <div className="ComputeForm__form-control">
                      <label className="ComputeForm__label">
                        <span className="ComputeForm__label-text">InputTwo</span>
                      </label>
                      <Field
                        type="text"
                        name="inputTwo"
                        onChange={handleChange(formik, 'inputTwo')}
                        className="ComputeForm__input"
                      />
                      <ErrorMessage name="inputTwo" component="div" />
                    </div>
                    <div className="ComputeForm__form-control">
                      <label className="ComputeForm__label">
                        <span className="ComputeForm__label-text">SampleSize</span>
                      </label>
                      <Field
                        type="text"
                        name="sampleSize"
                        onChange={handleChange(formik, 'sampleSize')}
                        className="ComputeForm__input"
                      />
                      <ErrorMessage name="sampleSize" component="div" />
                    </div>
                    <div className="ComputeForm__form-control">
                      <Button
                        type="submit"
                        text={formik.isSubmitting ? 'Submitting...' : 'Submit'}
                        disabled={formik.isSubmitting}
                      />
                    </div>
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

export default ComputeForm;
