import React, { useEffect, useState } from 'react';

const Userlist = () => {
  const url = 'http://localhost:3000/api/users';
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Manage password visibility

  const getUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`, // Corrected
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const dataUsers = await response.json();
        setUsers(dataUsers);
      } else {
        console.error('Failed to fetch users:', response.status);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
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

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !selectedUser.id) {
      console.error('No user selected or user ID missing');
      return;
    }
  
    console.log("Updating user with data:", selectedUser); // Log selected user data
  
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${url}/${selectedUser.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        username: selectedUser.username,
          email: selectedUser.email,
          password: selectedUser.password,
        }),
      });
  
      if (response.ok) {
        setIsModalOpen(false);
        getUsers(); // Refresh the list of users after successful update
      } else {
        const errorData = await response.json();
        console.error('Error updating user:', response.status, errorData);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };
  

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="content" style={{ width: "800px", marginLeft:'40px', height:'1600px' }}>
        <div className="card-body" >
          <div className="pp"style={{display:'flex'}} >
          <h1 style={{textAlign: "center", marginLeft:"240px", fontWeight: "500", }}>Users</h1>
          <a href="/addusers">
            <button className="btn btn-primary" style={{ margin: '10px 0px 20px 700px', width: '130px' }}>Tambah Data</button>
          </a>
          </div>
          <table className="table table-bordered table-hover" style={{ width: '920px', marginLeft: '230px', marginRight: '-100px', textAlign:'center',}}>
            <thead style={{ background: '#f2f2f2' }}>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th style={{width:'300px'}}>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button className="btn btn-success" onClick={() => openModal(user)} style={{ marginBottom: '10px', width: '70px', marginRight:'10px', marginLeft:'10px',marginTop:'10px' }}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal" style={{ display: 'block', justifyContent: 'center', alignItems: 'center', position: 'fixed', marginLeft: '140px', marginTop: '70px' }}>
          <div className="modal-dialog" style={{ maxWidth: '800px', margin: 'auto' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="btn-close" onClick={closeModal}>X</button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEdit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Nama</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedUser?.username || ''}
                          onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={selectedUser?.email || ''}
                          onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            value={selectedUser?.password || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userlist;
