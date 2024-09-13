import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const userLoggedIn = localStorage.getItem('userLoggedIn');
  const userRole = localStorage.getItem('userRole');

  // Logout handler
  const handleLogout = () => {
    // Clear local storage and session
    fetch('http://localhost/backend/logout.php', {
      method: 'POST',
    })
    .then(() => {
      localStorage.removeItem('userLoggedIn');
      localStorage.removeItem('userRole');
      navigate('/login');
    })
    .catch((error) => console.error('Error logging out:', error));
  };

  // Redirect to login if not authenticated
  const handleProtectedClick = (e, path) => {
    if (!userLoggedIn) {
      e.preventDefault();
      alert('Please log in first!');
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>School Library App</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books" onClick={(e) => handleProtectedClick(e, '/books')}>Books</Link>
        </li>
        {!userLoggedIn ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </li>
        )}
        {userLoggedIn && userRole === 'admin' && (
          <li>
            <Link to="/dashboard" onClick={(e) => handleProtectedClick(e, '/dashboard')}>Admin Dashboard</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
