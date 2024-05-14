import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'; // Import Axios
import './AgencyRegister.css';

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

function AgencyRegister({userData}) {
  const [selectedCity, setSelectedCity] = useState('');
  const [agency, setAgency] = useState({});
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
  const userIdAgency = userData.userId;
  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const responseAgency = await axios.get(`https://localhost:7088/api/Agency/GetByUserId/${userIdAgency}`);
        const fetchedAgency = responseAgency.data[0];

        setAgency(fetchedAgency);


      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    if (userIdAgency) {
      fetchData();
    }
  }, [userIdAgency]);
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
      
        const agentFullName = `${values.firstName} ${values.lastName}`;
    
      
        const registerResponse = await axios.post('https://localhost:7088/api/Authenticate/register-agent', {
          
          username: values.username,
          email: values.email,
          password: values.password,
        });
    
       
        const AgentUserId = registerResponse.data.userId;
        console.log(registerResponse.data);
        console.log(userIdAgency);
        
       
        const createAgentResponse = await axios.post(`https://localhost:7088/api/Agents`, {
          agentId: 0,
          agentName: agentFullName,
          userId: registerResponse.data.userId,
          agencyId: agency.agencyId,
          address: selectedCity, 
        });
    
        console.log('Create Agent API response:', createAgentResponse.data);
        
        const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`imageFiles`, file);
      });
      formData.append('agentId', createAgentResponse.data.agentId);

      await axios.post('https://localhost:7088/api/ImageAgent', formData);

     
      setPreviewImages([]);

       
      } catch (error) {
        console.error('API error:', error);
    
        
      }
    },
    
  });

  return (
    <Form className="agentForm" onSubmit={formik.handleSubmit}>
      <h2 className="agentForm-title">Register Agent</h2>
      <p className="agentForm-message">Register an agent in {agency.agencyName} </p>
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
  <InputGroup>
    <Form.Label className="agentForm-label">Select Address:</Form.Label>
    <Form.Control
      as="select"
      className="agentForm-select"  
      required
      value={selectedCity}
      onChange={(e) => setSelectedCity(e.target.value)}
    >
      <option value="" disabled>Select an Address</option>
      {cities.map((city) => (
        <option key={city.title} value={city.title}>
          {city.title}
        </option>
      ))}
    </Form.Control>
  </InputGroup>
  
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

export default AgencyRegister;
