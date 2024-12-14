import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Auth.css';

const Auth = ({ mode, onAuthSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = mode === 'login'
    ? 'http://localhost:5000/api/auth/login'
    : 'http://localhost:5000/api/auth/register';

      const response = await axios.post(endpoint, { username, password });
      if (mode === 'login') {
        const token = response.data.token;
        localStorage.setItem('token', token); // Store token in localStorage
        console.log('Stored token:', token); // Debug: Log the token for verification
        onAuthSuccess(); // Redirect or refresh the page
      } else {
        alert('Registration successful! Please log in.');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred.'); // Handle errors
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    window.location.href = '/login'; // Redirect to login
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
      {mode === 'login' ? (
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      ) : (
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      )}
      {mode === 'login' && (
        <button type="button" onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
    </form>
  );
};

export default Auth;