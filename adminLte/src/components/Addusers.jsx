import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Addusers = () => {
  const [username, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = () => {
    try {
      const formData = {
        username: username,
        email: email,
        password: password
      };
  
      console.log('Form data:', formData);
  
      fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response data:', data);
        navigate('/users');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error creating users: ' + error.message);
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating users: ' + error.message);
    }
  };
  return (
    <div style={{ padding: '20px', margin: '0px 100px 100px 250px'}}>
      <h1>Create Users</h1>
      <br />
      <div className="col-md-6">
     <div className="mb-3">
        <label className="form-lable">Nama</label>
      <input
        type="text"
        placeholder="Nama"
        className="form-control"
        value={username}
        onChange={e => setNama(e.target.value)}
      />
        </div>
      </div>
      <div className="col-md-6">
     <div className="mb-3">
        <label className="form-lable">Email</label>
      <input
        type="text"
        placeholder="Email"
        className="form-control"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      </div>
      </div>
      <div className="col-md-6">
     <div className="mb-3">
        <label className="form-lable">Password</label>
      <input
        type="text"
        placeholder="Password"
        className="form-control"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      </div>
      </div>
      <br />
      <button className="btn btn-success btn-lg" onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default Addusers;