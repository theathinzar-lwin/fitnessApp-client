import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For handling error messages
  const [success, setSuccess] = useState(''); // For handling success messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages
    setSuccess(''); // Clear any previous success messages

    try {
      const response = await axios.post('https://fitnessapp-api-ln8u.onrender.com/users/register', { email, password });

      // If registration is successful
      if (response.status === 201) {
        setSuccess('User registered successfully. Redirecting to login...');
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      // If there's an error during registration, handle it here
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message); // Show "Email already in use" or other errors
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
