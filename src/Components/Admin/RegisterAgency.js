import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'; // Import Axios
import './RegisterAgency.css';
import { data } from 'jquery';

const validationSchema = yup.object({
  firstName: yup.string().required('Firstname is required'),
  lastName: yup.string().required('Lastname is required'),
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

function RegisterAgency({userData}) {
  const [selectedCity, setSelectedCity] = useState('');
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    setPreviewImages([...e.target.files].map((file) => URL.createObjectURL(file)));
  };

  const cities = [
    { title: 'Sydney' },
    { title: 'Melbourne' },
    { title: 'Brisbane' },
    { title: 'Perth' },
    { title: 'Adelaide' },
  ];
 
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
      
        const agencyFullname = `${values.firstName} ${values.lastName}`;
    
      
        const registerResponse = await axios.post('https://localhost:7088/api/Authenticate/register-agency', {
          
          username: values.username,
          email: values.email,
          password: values.password,
        });
    
       console.log(registerResponse.data)
        
        
        
       
        const AgencyResponse = await axios.post(`https://localhost:7088/api/Agency`, {
          agencyId: 0,
          agencyName: agencyFullname,
          userId: registerResponse.data.userId,
        });
    
        console.log('Create Agent API response:', AgencyResponse.data);
        
        const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`imageFiles`, file);
      });
      formData.append('agencyId', AgencyResponse.data.agencyId);

      await axios.post('https://localhost:7088/api/ImageAgency', formData);

     
      setPreviewImages([]);

       
      } catch (error) {
        console.error('API error:', error);
    
        
      }
    },
    
  });

  return (
    <Form className="agentForm" onSubmit={formik.handleSubmit}>
      <h2 className="agentForm-title">Register Agency</h2>
     
      <Row className="agentForm-flex">
        <Col>
        
          <Form.Group controlId="formFirstName">
            <InputGroup>
              <Form.Control
                className="agentForm-input"
                type="text"
                placeholder="Firstname"
                required
                {...formik.getFieldProps('firstName')}
              />
            </InputGroup>
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="error-message">{formik.errors.firstName}</div>
            ) : null}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formLastName">
            <InputGroup>
              <Form.Control
                className="agentForm-input"
                type="text"
                placeholder="Lastname"
                required
                {...formik.getFieldProps('lastName')}
              />
            </InputGroup>
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="error-message">{formik.errors.lastName}</div>
            ) : null}
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="formUsername">
        <InputGroup>
          <Form.Control
            className="agentForm-input"
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
            className="agentForm-input"
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
            className="agentForm-input"
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
      <Form.Group className="formAddress">
  
  <InputGroup >
          <Form.Label className="agentForm-label">Upload Image:</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className='ImageAgentContainer'
          />
        </InputGroup>
</Form.Group>
    
      <Button className="agentForm-submit" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default RegisterAgency;
