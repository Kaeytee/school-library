import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useNavigate, Link } from 'react-router-dom';
import library from '../../../Assets/library.jpg';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    accountType: 'student'  // Default value for accountType
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost/backend/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('userLoggedIn', true);
          localStorage.setItem('userRole', data.role);  // Store user role ('admin', 'student', 'staff')
          if (data.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/home');
          }
        } else {
          alert('Invalid login credentials');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage 
              src={library} 
              alt="login form" 
              className="img-fluid" 
              style={{ width: '500px', height: '500px', objectFit: 'cover' }} 
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <h1 className="fw-bold mb-0">School Library</h1>
              </div>
              <h5 className="fw-normal my-4 pb-3">Sign into your account</h5>
              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <select
                name="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
                className="form-select mb-4"
              >
                <option value="student">Student</option>
                <option value="staff">Staff</option>
              </select>
              <MDBBtn className="mb-4 px-5" color="dark" size="lg" onClick={handleLogin}>
                Login
              </MDBBtn>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                Don't have an account? <Link to="/register" style={{ color: '#393f81' }}>Register here</Link>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
