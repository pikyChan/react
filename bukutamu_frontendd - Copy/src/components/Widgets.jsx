import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Widgets = () => {
  const [bukuTamuData, setBukuTamuData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ title: '', description: '', img: '', cat: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    fetch('http://localhost:3000/api/post', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Fetched data:', data);
      setBukuTamuData(data); // Assuming no filtering needed
    })
    .catch(error => console.error('Error fetching posts:', error));
  
  }, []);

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete post with ID: ${id}?`)) {
      fetch(`http://localhost:3000/api/post/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        if (!response.ok) throw new Error('Error deleting the post');
        setBukuTamuData(bukuTamuData.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error:', error));
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const item = bukuTamuData.find(item => item.id === id);
    setEditingData({ ...item });
  };

  const handleSaveChanges = (id) => {
    fetch(`http://localhost:3000/api/post/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(editingData)
    })
    .then(response => response.json())
    .then(() => {
      setBukuTamuData(bukuTamuData.map(item => item.id === id ? { ...item, ...editingData } : item));
      setEditingId(null);
      setEditingData({ title: '', description: '', img: '', cat: '' });
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2 style={{ float: 'left', margin: '20px 0 0 280px' }}>Blog</h2>
      <button style={{ margin: '20px 0 30px 680px', borderRadius: '8px', background: '#007bff', padding: '6px 20px' }}>
        <Link style={{ color: '#ffffff', textDecoration: 'none' }} to="/addtamu">Add Blog</Link>
      </button>
    
      <table style={{ width: '75%', borderCollapse: 'collapse', margin: '0px 100px 100px 280px' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#f4f4f4', width: '50px' }}>No</th>
            <th style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>Judul</th>
            <th style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>Deskripsi</th>
            <th style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>Foto</th>
            <th style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>Kategori</th>
            <th style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bukuTamuData.length > 0 ? (
            bukuTamuData.map((item, index) => (
              <tr key={item.id}>
                <td style={{ width: '50px' }}>{index + 1}</td>
                <td style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editingData.title}
                      onChange={e => setEditingData({ ...editingData, title: e.target.value })}
                      style={{ backgroundColor: '#f0f0f0', color: '#000000' }}
                    />
                  ) : (
                    item.title
                  )}
                </td>
                <td style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editingData.description}
                      onChange={e => setEditingData({ ...editingData, description: e.target.value })}
                      style={{ backgroundColor: '#f0f0f0', color: '#000000' }}
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editingData.img}
                      onChange={e => setEditingData({ ...editingData, img: e.target.value })}
                      style={{ backgroundColor: '#f0f0f0', color: '#000000' }}
                    />
                  ) : (
                    item.img
                  )}
                </td>
                <td style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editingData.cat}
                      onChange={e => setEditingData({ ...editingData, cat: e.target.value })}
                      style={{ backgroundColor: '#f0f0f0', color: '#000000' }}
                    />
                  ) : (
                    item.cat
                  )}
                </td>
                <td style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>
                  {editingId === item.id ? (
                    <>
                      <button onClick={() => handleSaveChanges(item.id)} style={{ marginRight: '8px', borderRadius: '8px', background: '#007bff', padding: '6px 20px' }}>Save</button>
                      <button onClick={() => setEditingId(null)} style={{ borderRadius: '8px', background: '#007bff', padding: '6px 20px' }}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(item.id)} style={{ marginRight: '8px', borderRadius: '8px', background: '#007bff', padding: '6px 20px' }}>Edit</button>
                      <button onClick={() => handleDelete(item.id)} style={{ borderRadius: '8px', background: '#007bff', padding: '6px 20px' }}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>No Data Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Widgets;
