import React, { useState } from 'react';
import axios from 'axios';
import './IncidentForm.css';

const IncidentForm = ({ onIncidentAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve the token
      await axios.post(
        'http://localhost:5000/api/incidents',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        }
      );
      alert('Incident logged successfully!');
      setFormData({ title: '', description: '', assignedTo: '' }); // Reset form
      if (onIncidentAdded) onIncidentAdded(); // Notify parent to refresh list
    } catch (error) {
      console.error('Error logging incident:', error);
      alert('Failed to log the incident.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f8ff', // Pastel background for the entire page
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#ffefc5', // Soft pastel yellow for the form
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          minWidth: '350px',
          maxWidth: '500px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#333',
            marginBottom: '20px',
          }}
        >
          Log Incident
        </h2>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              color: '#555',
              fontWeight: 'bold',
            }}
          >
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              color: '#555',
              fontWeight: 'bold',
            }}
          >
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none',
              minHeight: '100px',
            }}
          ></textarea>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              color: '#555',
              fontWeight: 'bold',
            }}
          >
            Assigned To:
          </label>
          <input
            type="text"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Log Incident
        </button>
      </form>
    </div>
  );
};

export default IncidentForm;
