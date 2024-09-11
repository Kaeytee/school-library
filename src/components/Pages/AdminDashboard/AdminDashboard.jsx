import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    total_books: 0,
    total_users: 0,
    borrowed_books: 0,
    reserved_books: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost/backend/admin_dashboard.php')
      .then((response) => response.json())
      .then((data) => setDashboardData(data))
      .catch((error) => console.error('Error fetching dashboard data:', error));
  }, []);

  const handleLogout = () => {
    fetch('http://localhost/backend/logout.php')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.removeItem('userLoggedIn');
          localStorage.removeItem('userRole');
          navigate('/login');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <MDBContainer className="mt-5 admin-dashboard">
      <MDBRow>
        <MDBCol md="4">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBCardTitle className="fw-bold"><MDBIcon fas icon="book" className="me-2" />Total Books</MDBCardTitle>
              <h2>{dashboardData.total_books}</h2>
              <Link to="/admin-actions">
                <MDBBtn className="mt-3" color="primary">Manage Books</MDBBtn>
              </Link>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="4">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBCardTitle className="fw-bold"><MDBIcon fas icon="users" className="me-2" />Total Users</MDBCardTitle>
              <h2>{dashboardData.total_users}</h2>
              <Link to="/manage-users">
                <MDBBtn className="mt-3" color="primary">Manage Users</MDBBtn>
              </Link>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="4">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBCardTitle className="fw-bold"><MDBIcon fas icon="book-reader" className="me-2" />Borrowed Books</MDBCardTitle>
              <h2>{dashboardData.borrowed_books}</h2>
              <Link to="/borrowed-books">
                <MDBBtn className="mt-3" color="primary">View Borrowed Books</MDBBtn>
              </Link>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="4">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBCardTitle className="fw-bold"><MDBIcon fas icon="bookmark" className="me-2" />Reserved Books</MDBCardTitle>
              <h2>{dashboardData.reserved_books}</h2>
              <Link to="/reserved-books">
                <MDBBtn className="mt-3" color="primary">View Reserved Books</MDBBtn>
              </Link>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      {/* Logout Button */}
      <MDBBtn color="danger" onClick={handleLogout} className="mt-4">Logout</MDBBtn>
    </MDBContainer>
  );
};

export default AdminDashboard;
