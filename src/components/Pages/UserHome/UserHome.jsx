import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';

const UserHome = () => {
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    fetch('http://localhost/backend/logout.php')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Clear local storage and redirect to login
          localStorage.removeItem('userLoggedIn');
          localStorage.removeItem('userRole');
          navigate('/login');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="user-home">
      <h1>Welcome to the User Home Page</h1>
      <p>This is the User Home. You are successfully logged in as a user.</p>

      {/* Logout Button */}
      <MDBBtn color="danger" onClick={handleLogout}>
        Logout
      </MDBBtn>
    </div>
  );
};

export default UserHome;
