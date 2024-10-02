// src/components/Logout.js
import React, { useEffect, useState } from 'react';

const Logout = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Clear login status immediately
        localStorage.removeItem('isLoggedIn'); 
        localStorage.removeItem('token'); // Clear the token if you're using it

        // Log the local storage to verify items are removed
        console.log('Local storage after removing items:', localStorage);

        const response = await fetch('http://localhost:3000/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Optionally, you can clear other user-related data here
          // localStorage.removeItem('userData'); // Clear any additional user data

          // Redirect to the login page
          window.location.href = '/login'; 
        } else {
          console.error('Logout failed'); // Display error if logout fails
          setError('Logout failed, please try again.'); // Set error message
        }
      } catch (error) {
        console.error('Logout error:', error);
        setError('Logout error, please try again.'); // Set error message
      } finally {
        setLoading(false); // Stop loading in both success and failure
      }
    };

    handleLogout();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Logging out...</p> // Show loading message
      ) : error ? (
        <p>{error}</p> // Show error message if any
      ) : null}
    </div>
  ); // Render feedback based on loading state and error
};

export default Logout;
