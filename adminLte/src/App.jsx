import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom"; 
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideNav from "./components/SideNav";
import Users from "./components/Users";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Logout from "./components/Logout";
import Addtamu from "./components/Addtamu";
import Addusers from "./components/Addusers";
import Widgets from "./components/Widgets"; 

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn'); // Check if user is logged in
  const location = useLocation(); // Get the current URL path

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData(); // Fetch user data if logged in
    }
  }, [isLoggedIn]);

  const fetchUserData = () => {
    const token = localStorage.getItem('token'); // Get the token from local storage

    fetch('http://localhost:3000/api/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) throw new Error('Unauthorized');
        return response.json();
      })
      .then(data => console.log('User Data:', data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="wrapper">
      {/* Render Header and SideNav if logged in and not on the login page */}
      {isLoggedIn && location.pathname !== '/login' && <Header />}
      {isLoggedIn && location.pathname !== '/login' && <SideNav />}

      <div className="main-content">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/users" element={isLoggedIn ? <Users /> : <Navigate to="/login" />} />
          <Route path="/blog-content" element={isLoggedIn ? <Widgets /> : <Navigate to="/login" />} />
          <Route path="/addblog" element={isLoggedIn ? <Addtamu /> : <Navigate to="/login" />} />
          <Route path="/addusers" element={isLoggedIn ? <Addusers /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>

      {/* Render Footer if logged in and not on the login page */}
      {isLoggedIn && location.pathname !== '/login' && <Footer />}
    </div>
  );
}

// Wrap App with Router for routing
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
