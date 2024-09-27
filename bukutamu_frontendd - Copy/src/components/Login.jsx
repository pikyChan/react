import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Reset error before submit

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then((response) => {
        return response.json(); // Ensure this returns the response
    })
    .then((data) => {
        console.log('Login Response:', data); // Log the response

        if (data.auth) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', data.token); // Save token in localStorage
            console.log('Login Successful:', localStorage.getItem('isLoggedIn'), localStorage.getItem('token'));
            window.location.href = '/'; // Redirect to home
        } else {
            setError(data.message);
        }
    })
    .catch((error) => {
        console.error('Error during login:', error); // Log any errors
        setError(error.message);
    });
};

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  

  return (
    <div className="container"  style={{ height:'510px'}}>
      <div className="row" style={{ boxShadow: '0 4px 10px rgba(0.5, 0, 0, 0.5)', padding: '20px', borderRadius: '10px', backgroundColor: '#fff', width:'350px', height:'370px', marginTop:'120px', marginLeft:'130%' }}>
        <div className="col-md-6 offset-md-3 ml-auto" >
          <h1 style={{ margin: '0px 0px 20px -50px', fontWeight:'500' }}>Login</h1>
          <form style={{ margin: '0px 0px 0px -160px' }} onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                style={{width:'300px', height: '45px', fontSize:'20px', padding: '5px 20px 10px 20px'}}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group" >
              <label>Password</label>
              <div className="input-group" style={{width:'340px', height: '45px', fontSize:'20px', padding: '5px 20px 10px 20px', marginLeft:'-20px'}}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control "
                  style={{width:'210px', height: '45px', fontSize:'20px', padding: '5px 20px 10px 20px'}}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleShowPassword}
                  >
                    <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} />
                  </button>
                </div>
              </div>
            </div>
            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}
            <button type="submit" className="btn btn-primary" style={{margin: '20px 0px 0px 0px', width:'300px', height:'40px', fontSize:'18px'}}>
              Login
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;