import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddWorkout = ({ show, handleClose, onWorkoutAdded }) => {
  const [workout, setWorkout] = useState({
    name: '',
    duration: '',
    dateAdded: new Date().toISOString().split('T')[0], // Default to today's date
    status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout', workout, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onWorkoutAdded(); // Notify parent component to refresh workouts
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error adding workout:", error);
      // Add error handling here (e.g., show an alert)
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formWorkoutName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={workout.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formWorkoutDuration">
            <Form.Label>Duration</Form.Label>
            <Form.Control type="text" name="duration" value={workout.duration} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formWorkoutDateAdded">
            <Form.Label>Date Added</Form.Label>
            <Form.Control type="date" name="dateAdded" value={workout.dateAdded} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formWorkoutStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" name="status" value={workout.status} onChange={handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Workout
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddWorkout;
