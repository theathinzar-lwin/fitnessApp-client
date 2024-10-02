import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkoutCard from '../components/WorkoutCard';
import AddWorkout from '../components/AddWorkout';
import { Button } from 'react-bootstrap';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setWorkouts(response.data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleWorkoutAdded = () => {
    fetchWorkouts(); // Refresh workouts after adding a new one
  };

  return (
    <div className="container">
      <h1>Your Workouts</h1>
      <Button id="addWorkout" onClick={() => setShowModal(true)}>Add Workout</Button>
      <AddWorkout show={showModal} handleClose={() => setShowModal(false)} onWorkoutAdded={handleWorkoutAdded} />
      <div className="row mt-3">
        {workouts.map(workout => (
          <div className="col-md-4" key={workout._id}>
            <WorkoutCard workout={workout} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;
