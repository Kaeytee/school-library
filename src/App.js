import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/Pages/NavBar/NavBar';
import Footer from './components/Pages/Footer/Footer';
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import AdminDashboard from './components/Pages/AdminDashboard/AdminDashboard';
import HomePage from './components/Pages/Home/HomePage';
import SearchBooks from './components/Pages/SearchBooks/SearchBooks'; // Assuming this is the Books page

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Check if user is logged in from localStorage on initial render
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    const role = localStorage.getItem('userRole');
    if (userLoggedIn && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  // Function to set auth and user role after login
  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('userLoggedIn', true);
    localStorage.setItem('userRole', role);
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Protect the "Books" route */}
        <Route
          path="/books"
          element={isAuthenticated ? <SearchBooks /> : <Navigate to="/login" />}
        />

        {/* Protect the "Admin Dashboard" route for admins only */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated && userRole === 'admin' ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Home route */}
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
