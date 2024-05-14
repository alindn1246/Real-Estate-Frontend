import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BiCalendar } from 'react-icons/bi';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

function InspectionModal({ propertyId, userData }) {
  const [show, setShow] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedAvailableDateId, setSelectedAvailableDateId] = useState('');
  const [askProperty, setAskProperty] = useState('');

  const localizer = momentLocalizer(moment);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBookNow = async () => {
    try {
      const response = await axios.post('https://localhost:7088/api/Book', {
        availableDateId: selectedAvailableDateId,
        askProperty: askProperty,
        userId: userData.userId,
      });

      console.log('Booking successful:', response.data);
      // Optionally, you can add code to handle success, e.g., show a success message.
    } catch (error) {
      console.error('Error booking property:', error);
      // Optionally, you can add code to handle errors, e.g., show an error message.
    } finally {
      handleClose(); // Close the modal regardless of success or failure.
    }
  };

  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7088/api/AvailableDates/GetByPropertyId/${propertyId}`
        );
        setAvailableDates(response.data);
      } catch (error) {
        console.error('Error fetching available dates:', error);
      }
    };

    fetchAvailableDates();
  }, [propertyId]);

  return (
    <>
      <Button className='btnInspection' onClick={handleShow}>
        <BiCalendar className='iconInspection' />
        Organise an inspection
      </Button>

      <Modal show={show} onHide={handleClose} container={document.body} className='mymodal'>
        <Modal.Header closeButton>
          <Modal.Title>Property Inspection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlSelect1'>
              <Form.Label>Select a date </Form.Label>
              <Form.Control
                as='select'
                value={selectedAvailableDateId}
                onChange={(e) => setSelectedAvailableDateId(e.target.value)}
              >
                <option value=''>Select a date to view the property</option>
                {availableDates.map((availableDate) => (
                  <option key={availableDate.id} value={availableDate.id}>
                    {moment(availableDate.dateTime).format('MMMM DD, YYYY - h:mm A')}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='name@example.com'
                autoFocus
                value={userData.email}
                readOnly
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Ask about this property</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={askProperty}
                onChange={(e) => setAskProperty(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleBookNow}>
            Book Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InspectionModal;
