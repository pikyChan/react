import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const cellStyle = {
    textAlign: 'center',
    padding: '8px',
    border: '1px solid #ddd'
  };

  const headerStyle = {
    ...cellStyle,
    backgroundColor: '#f4f4f4'
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete user with ID: ${id}?`)) {
      fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete user');
          }
          // Update the local state immediately after deletion
          setUsers(users.filter(user => user.id !== id));
        })
        .catch(error => console.error('Error:', error));
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const user = users.find((user) => user.id === id);
    setEditingData({ ...user });
  };

  const handleSaveChanges = (id) => {
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(editingData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save changes');
        }
        return response.json();
      })
      .then(updatedUser => {
        console.log('Updated User:', updatedUser);
        setUsers(users.map(user => (user.id === id ? updatedUser : user)));
        setEditingId(null);
        setEditingData({});
      })
      .catch(error => console.error('Error saving changes:', error));
  };

  const handleAddUser = () => {
    // Redirect to the add user page
    navigate('/addusers');
  };

  return (
    <div>
      <h2 style={{ float: 'left', margin: '20px 0 0 280px' }}>Users</h2>
      <button
        onClick={handleAddUser}
        style={{ margin: '20px 0 0px 760px', borderRadius: '8px', background: '#007bff', padding: '6px 20px' }}>
        Add Users
      </button>
      <table style={{ width: '75%', borderCollapse: 'collapse', margin: '30px 100px 100px 280px' }}>
        <thead>
          <tr>
            <th style={headerStyle}>No</th>
            <th style={headerStyle}>Nama Users</th>
            <th style={headerStyle}>Email</th>
            <th style={headerStyle}>Password</th>
            <th style={headerStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td style={cellStyle}>{index + 1}</td>
                <td style={cellStyle}>
                  {editingId === user.id ? (
                    <input
                      type="text"
                      style={{ backgroundColor: '#f0f0f0', color: '#000000' }}
                      value={editingData.username || ''}
                      onChange={e => setEditingData({ ...editingData, username: e.target.value })}
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td style={cellStyle}>
                  {editingId === user.id ? (
                    <input
                      type="text"
                      style={{ backgroundColor: '#f0f0f0', color: '#000000' }}
                      value={editingData.email || ''}
                      onChange={e => setEditingData({ ...editingData, email: e.target.value })}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td style={cellStyle}>
                  {editingId === user.id ? (
                    <input
                      style={{ backgroundColor: '#f0f0f0', color: '#000000' }}
                      type="text"
                      value={editingData.password || ''}
                      onChange={e => setEditingData({ ...editingData, password: e.target.value })}
                    />
                  ) : (
                    user.password
                  )}
                </td>
                <td style={cellStyle}>
                  {editingId === user.id ? (
                    <>
                      <button onClick={() => handleSaveChanges(user.id)} style={{ marginRight: '8px', borderRadius: '8px', background: '#007bff', padding: '6px 20px' }}>Save</button>
                      <button onClick={() => setEditingId(null)} style={{ marginTop: '10px', borderRadius: '8px', background: '#007bff', padding: '6px 20px' }}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(user.id)} style={{ marginRight: '8px', borderRadius: '8px', background: '#007bff', padding: '6px 20px' }}>Edit</button>
                      <button onClick={() => handleDelete(user.id)} style={{ marginTop: '10px', borderRadius: '8px', background: '#007bff', padding: '6px 20px' }}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ ...cellStyle, textAlign: 'center' }}>No Data Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
