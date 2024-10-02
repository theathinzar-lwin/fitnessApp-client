import React from 'react';

const WorkoutCard = ({ workout }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{workout.name}</h5>
        <p className="card-text">Duration: {workout.duration}</p>
        <p className="card-text">Date Added: {new Date(workout.dateAdded).toLocaleDateString()}</p>
        <p className="card-text">Status: {workout.status}</p>
      </div>
    </div>
  );
};

export default WorkoutCard;
