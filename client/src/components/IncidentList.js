import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IncidentList.css';

const IncidentList = ({ incidents, fetchIncidents }) => {
  const [editingIncident, setEditingIncident] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [editPosition, setEditPosition] = useState({ top: 0, left: 0 }); // Track edit form position

  useEffect(() => {
    fetchIncidents(); // Fetch incidents on mount
  }, [fetchIncidents]);

  // Handle edit click
  const handleEditClick = (incident, event) => {
    setEditingIncident(incident);
    setUpdatedStatus(incident.status);

    // Position the form near the button
    const buttonRect = event.target.getBoundingClientRect();
    setEditPosition({
      top: buttonRect.top + window.scrollY + 40, // Adjust for spacing
      left: buttonRect.left + window.scrollX,
    });
  };

  // Update the incident
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/incidents/${editingIncident._id}`,
        { ...editingIncident, status: updatedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Incident updated successfully!');
      setEditingIncident(null); // Close the edit form
      fetchIncidents(); // Refresh the list
    } catch (err) {
      console.error('Error updating incident:', err);
      alert('Failed to update the incident.');
    }
  };

  // Delete the incident
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/incidents/${editingIncident._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Incident deleted successfully!');
        setEditingIncident(null); // Close the edit form
        fetchIncidents(); // Refresh the list
      } catch (err) {
        console.error('Error deleting incident:', err);
        alert('Failed to delete the incident.');
      }
    }
  };

  // Determine the background color based on the status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'important':
        return '#FFB3BA'; // Pastel Red
      case 'completed':
        return '#B9FBC4'; // Pastel Green
      case 'in progress':
        return '#FFDFBA'; // Pastel Orange
      case 'open':
        return '#B2E7F2'; // Pastel Blue
      default:
        return '#F5F5F5'; // Default Light Gray
    }
  };

  return (
    <div>
      <h2>Incident List</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {incidents.length === 0 ? (
          <p>No incidents to display.</p>
        ) : (
          incidents.map((incident) => (
            <div
              key={incident._id}
              style={{
                backgroundColor: getStatusColor(incident.status),
                borderRadius: '12px',
                padding: '20px',
                minWidth: '250px',
                maxWidth: '300px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
              }}
            >
              <h3>{incident.title}</h3>
              <p>{incident.description}</p>
              <p><strong>Status:</strong> {incident.status}</p>
              <p><strong>Assigned To:</strong> {incident.assignedTo || 'Unassigned'}</p>
              <p><strong>Created At:</strong> {new Date(incident.createdAt).toLocaleString()}</p>
              <button
                onClick={(e) => handleEditClick(incident, e)}
                style={{
                  backgroundColor: '#2196F3',
                  color: 'white',
                  padding: '10px 15px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                Edit
              </button>
            </div>
          ))
        )}
      </div>

      {editingIncident && (
        <div
          className="edit-form"
          style={{
            position: 'absolute',
            top: editPosition.top,
            left: editPosition.left,
            zIndex: 1000,
            background: '#f0f4ff', // Pastel Gray
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #ccc',
          }}
        >
          <h3>Edit Incident</h3>
          <p>{editingIncident.title}</p>
          <label>Status:</label>
          <select
            value={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              marginBottom: '10px',
              width: '100%',
            }}
          >
            <option value="important">Important</option>
            <option value="completed">Completed</option>
            <option value="in progress">In Progress</option>
            <option value="open">Open</option>
          </select>
          <button
            onClick={handleUpdate}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            style={{
              backgroundColor: '#FF4D4D',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Delete
          </button>
          <button
            onClick={() => setEditingIncident(null)}
            style={{
              backgroundColor: '#CCC',
              color: 'black',
              padding: '10px 15px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default IncidentList;
