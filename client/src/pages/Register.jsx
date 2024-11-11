import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // optional, you can remove this or manage differently
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Correct way to use navigation in React Router v6+

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setErrorMessage('');

    try {
      const userData = { name, email, password, isAdmin };
      console.log(userData); // Before sending data to the backend
      const response = await axios.post('http://localhost:8000/api/user/register', userData);

      if (response.status === 201) {
        navigate('/login'); // Correct usage of navigate in React Router v6+
      }
    } catch (error) {
        console.log(error.response);  // Log the full response error object
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
    console.log(error);  // This will log the full error object
return res.status(400).json({ status: false, message: error.message });

  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Optional: Check for Admin role */}
        <div className="form-group">
          <label htmlFor="isAdmin">
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            Admin
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default RegistrationPage;
