import React, { useEffect } from "react";

function Home() {
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = () => {
      const token = localStorage.getItem('token'); // Retrieve token
      console.log('Token from localStorage:', token); // Log the token to verify
  
      fetch('http://localhost:3000/api/users', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`, // Include token in Authorization header
              'Content-Type': 'application/json',
          },
      })
      .then((response) => {
          console.log('Response:', response); // Log the response object
          if (!response.ok) {
              throw new Error('Unauthorized');
          }
          return response.json();
      })
      .then((data) => {
          console.log('User Data:', data); // Log the user data
      })
      .catch((error) => {
          console.error('Error:', error); // Handle errors
      });
  };
  

    return (
        <div style={{ backgroundColor:'#fff', height:'630px' }}>
            <h2 style={{ marginLeft:'-350px' }}>Dashboard</h2>
        </div>
    );
}

export default Home;
