import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const AddWorkout = ({ show, handleClose, onWorkoutAdded }) => {
  const [workout, setWorkout] = useState({
    name: '',
    duration: '',
    dateAdded: new Date().toISOString().split('T')[0], // Default to today's date
    status: ''
  });

  const [error, setError] = useState(''); // Add error state
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state on submit
    setLoading(true); // Set loading to true

    // Validate duration
    if (workout.duration <= 0) {
      setError('Duration must be a positive number.');
      setLoading(false);
      return;
    }

    try {
      await axios.post('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout', workout, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Fix template literal syntax
      });
      onWorkoutAdded(); // Notify parent component to refresh workouts
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error adding workout:", error);
      const errorMessage = error.response?.data?.message || 'Could not add workout. Please try again.'; // Use server error message if available
      setError(errorMessage); // Set error message
    } finally {
      setLoading(false); // Set loading to false after request
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>} {/* Display error message if exists */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formWorkoutName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              value={workout.name} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formWorkoutDuration">
            <Form.Label>Duration (in minutes)</Form.Label>
            <Form.Control 
              type="number" // Ensure only numeric input
              name="duration" 
              value={workout.duration} 
              onChange={handleChange} 
              required 
              min="1" // Ensure minimum value is 1
            />
          </Form.Group>
          <Form.Group controlId="formWorkoutDateAdded">
            <Form.Label>Date Added</Form.Label>
            <Form.Control 
              type="date" 
              name="dateAdded" 
              value={workout.dateAdded} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formWorkoutStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control 
              type="text" 
              name="status" 
              value={workout.status} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Add Workout'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddWorkout;
