import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignUp = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State untuk error handling

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman

    const formData = { nama, email, password };

    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) { // Asumsi server mengirim properti success
          navigate('/login'); // Redirect ke halaman login setelah berhasil
        } else {
          setError(data.message || 'Registration failed'); // Tampilkan error jika gagal
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Error creating user: ' + error.message);
      });
  };

  return (
    <div className="container" style={{ height: '560px' }}>
      <div className="row" style={{ boxShadow: '0 4px 10px rgba(0.5, 0, 0, 0.5)', padding: '20px', borderRadius: '10px', backgroundColor: '#fff', width: '350px', height: '470px', marginTop: '70px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="col-md-12">
          <h1 style={{ margin: '0px 0px 20px 0px', fontWeight: '500' }}>Create Account</h1>
          <form style={{ margin: '0px' }} onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nama</label>
              <input
                type="text"
                placeholder="Nama"
                className="form-control"
                style={{ height: '45px', fontSize: '20px', padding: '5px 20px' }}
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email" // Ubah ke type email untuk validasi yang lebih baik
                placeholder="Email"
                className="form-control"
                style={{ height: '45px', fontSize: '20px', padding: '5px 20px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password" // Ubah ke type password untuk keamanan
                placeholder="Password"
                className="form-control"
                style={{ height: '45px', fontSize: '20px', padding: '5px 20px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
