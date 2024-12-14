import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import IncidentForm from './components/IncidentForm';
import IncidentList from './components/IncidentList';
import Auth from './components/Auth'; // Import the Auth component
import axios from 'axios';
import './App.css';

const App = () => {
  const [incidents, setIncidents] = useState([]); // State to store incidents

  // Fetch incidents
  const fetchIncidents = async () => {
    console.log('Fetching incidents...'); // Debugging log
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.get('http://localhost:5000/api/incidents', {
        headers: { Authorization: `Bearer ${token}` }, // Include the token
      });
      console.log('Fetched data:', response.data); // Debugging log
      setIncidents(response.data); // Set incidents to the state
    } catch (error) {
      console.error('Error fetching incidents:', error);
      if (error.response?.status === 401) {
        alert('Unauthorized! Please log in again.');
        localStorage.removeItem('token'); // Clear invalid token
        window.location.href = '/login'; // Redirect to login
      }
    }
  };

  // Fetch incidents on component mount
  useEffect(() => {
    fetchIncidents(); // Call fetchIncidents when the app mounts
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/login'; // Redirect to login
  };

  return (
    <Router>
      <header className="App-header">
        <div className="logo">
          <img src="/Logo.png" alt="App Logo" />
        </div>
        <nav>
          <ul className="nav-links">
            {localStorage.getItem('token') && ( // Only show this button if the user is logged in
              <>
                <li>
                  <NavLink
                    to="/incident-list"
                    className={({ isActive }) =>
                      isActive ? 'active-link view-incident-button' : 'view-incident-button'
                    }
                  >
                    View Incidents
                  </NavLink>
                </li>
              </>
            )}
            {localStorage.getItem('token') && (
              <li>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route
            path="/login"
            element={<Auth mode="login" onAuthSuccess={() => (window.location.href = '/')} />}
          />
          <Route path="/signup" element={<Auth mode="signup" />} />
          <Route
            path="/incident-list"
            element={
              localStorage.getItem('token') ? (
                <IncidentList incidents={incidents} fetchIncidents={fetchIncidents} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/"
            element={
              localStorage.getItem('token') ? (
                <IncidentForm onIncidentAdded={fetchIncidents} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
