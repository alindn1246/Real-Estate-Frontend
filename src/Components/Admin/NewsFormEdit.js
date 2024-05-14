import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Col, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './NewsForm.css';

const validationSchema = yup.object({
  author: yup.string().required('Author is required'),
  title: yup.string().required('Title is required'),
  mainIdea: yup.string().required('Main Idea is required'),
  imageAddress: yup.string().required('Image Address is required'),
  newsAddress: yup.string().required('News Address is required'),
  newsTypeId: yup.number().required('News Type is required'),
});

function NewsFormEdit() {
  const { NewsId } = useParams();
  const [newsTypes, setNewsTypes] = useState([]);
  const [selectedNewsType, setSelectedNewsType] = useState('');

  const isEditMode = NewsId !== undefined;

  const formik = useFormik({
    initialValues: {
      author: '',
      title: '',
      mainIdea: '',
      imageAddress: '',
      newsAddress: '',
      newsTypeId: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const apiUrl = `https://localhost:7088/api/News/${NewsId}`;

        const axiosConfig = {
          method: 'PUT',
          url: apiUrl,
          data: values,
        };

        const response = await axios(axiosConfig);

        console.log('Edit News API response:', response.data);

        formik.resetForm();
      } catch (error) {
        console.error('API error:', error);
      }
    },
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchNewsDetails = async () => {
        try {
          const response = await axios.get(`https://localhost:7088/api/News/${NewsId}`);
          const newsData = response.data;

          formik.setValues({
            author: newsData.author,
            title: newsData.title,
            mainIdea: newsData.mainIdea,
            imageAddress: newsData.imageAddress,
            newsAddress: newsData.newsAddress,
            newsTypeId: newsData.newsTypeId,
          });

          setSelectedNewsType(newsData.newsTypeId.toString());
        } catch (error) {
          console.error('Error fetching news details', error);
        }
      };

      fetchNewsDetails();
    }
  }, [isEditMode, NewsId, formik]);

  return (
    <Form className="newsForm" onSubmit={formik.handleSubmit}>
      <div>
        <h2>{isEditMode ? 'Edit News' : 'Add News'}</h2>
        <br />
      </div>
      <Row>
        <Col>
          <Form.Group controlId="author" className="newsForm-group">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Author"
                {...formik.getFieldProps('author')}
                className="newsForm-input"
              />
            </InputGroup>
            {formik.touched.author && formik.errors.author ? (
              <div className="error-message">{formik.errors.author}</div>
            ) : null}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="title" className="newsForm-group">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Title"
                {...formik.getFieldProps('title')}
                className="newsForm-input"
              />
            </InputGroup>
            {formik.touched.title && formik.errors.title ? (
              <div className="error-message">{formik.errors.title}</div>
            ) : null}
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="mainIdea" className="newsForm-group">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Main Idea"
            {...formik.getFieldProps('mainIdea')}
            className="newsForm-input"
          />
        </InputGroup>
        {formik.touched.mainIdea && formik.errors.mainIdea ? (
          <div className="error-message">{formik.errors.mainIdea}</div>
        ) : null}
      </Form.Group>

      <Form.Group controlId="imageAddress" className="newsForm-group">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Image Address"
            {...formik.getFieldProps('imageAddress')}
            className="newsForm-input"
          />
        </InputGroup>
        {formik.touched.imageAddress && formik.errors.imageAddress ? (
          <div className="error-message">{formik.errors.imageAddress}</div>
        ) : null}
      </Form.Group>

      <Form.Group controlId="newsAddress" className="newsForm-group">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="News Address"
            {...formik.getFieldProps('newsAddress')}
            className="newsForm-input"
          />
        </InputGroup>
        {formik.touched.newsAddress && formik.errors.newsAddress ? (
          <div className="error-message">{formik.errors.newsAddress}</div>
        ) : null}
      </Form.Group>

      <Form.Group controlId="newsTypeId" className="newsForm-group">
        <InputGroup>
          <Form.Label className="newsForm-label">Select News Type:</Form.Label>
          <Form.Control
            as="select"
            value={selectedNewsType}
            onChange={(e) => {
              setSelectedNewsType(e.target.value);
              formik.setFieldValue('newsTypeId', parseInt(e.target.value, 10));
            }}
            className="newsForm-select"
          >
            <option value="" disabled>Select a News Type</option>
            {newsTypes.map((newsType) => (
              <option key={newsType.newsTypeId} value={newsType.newsTypeId}>
                {newsType.newsTypeName}
              </option>
            ))}
          </Form.Control>
        </InputGroup>
        {formik.touched.newsTypeId && formik.errors.newsTypeId ? (
          <div className="error-message">{formik.errors.newsTypeId}</div>
        ) : null}
      </Form.Group>
      <Button type="submit" className="newsForm-submit">
        Update
      </Button>
    </Form>
  );
}

export default NewsFormEdit;
