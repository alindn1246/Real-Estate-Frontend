import React from 'react';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import './SignUp.css';

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .matches(/^[^\s]+(\d.*\d|\d)$/, 'Username should not have spaces and should contain at least two numbers'),
  email: yup
    .string()
    .email('Invalid email format')
    .matches(/^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/, 'Invalid email provider'),
  password: yup
    .string()
    .required('Password is required')
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/, 'Invalid password format'),
});

function SignUp() {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const registerResponse = await axios.post('https://localhost:7088/api/Authenticate/register-agency', {
          username: values.username,
          email: values.email,
          password: values.password,
        });

        console.log(registerResponse.data);

        // Assuming the server response follows the structure you provided
        if (registerResponse.data.status === 'Error') {
          // Set the specific error message for the 'username' field
          setFieldError('username', registerResponse.data.message);
        }

        // Handle other responses or redirect as needed
      } catch (error) {
        console.error('API error:', error);
      }
    },
  });

  return (
    <Form className="UserForm" onSubmit={formik.handleSubmit}>
      <h2 className="UserForm-title">Register </h2>

      <Form.Group controlId="formUsername">
        <InputGroup>
          <Form.Control
            className="UserForm-input"
            type="text"
            placeholder="Username"
            required
            {...formik.getFieldProps('username')}
          />
        </InputGroup>
        {formik.touched.username && formik.errors.username ? (
          <div className="error-message">{formik.errors.username}</div>
        ) : null}
      </Form.Group>
      <Form.Group controlId="formEmail">
        <InputGroup>
          <Form.Control
            className="UserForm-input"
            type="email"
            placeholder="Email"
            required
            {...formik.getFieldProps('email')}
          />
        </InputGroup>
        {formik.touched.email && formik.errors.email ? (
          <div className="error-message">{formik.errors.email}</div>
        ) : null}
      </Form.Group>
      <Form.Group controlId="formPassword">
        <InputGroup>
          <Form.Control
            className="UserForm-input"
            type="password"
            placeholder="Password"
            required
            {...formik.getFieldProps('password')}
          />
        </InputGroup>
        {formik.touched.password && formik.errors.password ? (
          <div className="error-message">{formik.errors.password}</div>
        ) : null}
      </Form.Group>

      <Button className="UserForm-submit" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SignUp;
