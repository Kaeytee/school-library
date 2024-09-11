import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Send a POST request to the backend login endpoint
    fetch('http://localhost/backend/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        // Log the full response object to check status, headers, etc.
        console.log('Response Object:', response);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Log the parsed JSON data to the console
        console.log('Parsed JSON Data:', data);
  
        if (data.success) {
          // Store login state and role in localStorage
          localStorage.setItem('userLoggedIn', true);
          localStorage.setItem('userRole', data.role);  // Store user role (e.g., 'admin', 'student', 'staff')
  
          // Navigate based on user role
          if (data.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/home');
          }
        } else {
          // Log failure and display message
          console.log('Login failed:', data.message);
          alert(data.message || 'Invalid login credentials');
        }
      })
      .catch((error) => {
        // Log any errors that occur during the fetch request
        console.error('There was an error during login:', error);
        alert('There was an error with the login. Please try again.');
      });
  };

  return (
    <MDBContainer className="my-5" style={{ maxWidth: '900px' }}>
      <MDBCard>
        <MDBRow className="g-0">
          {/* Left side image */}
          <MDBCol md="6">
            <MDBCardImage
              src="https://images.pexels.com/photos/14520333/pexels-photo-14520333.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="login form"
              className="img-fluid"
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </MDBCol>
          {/* Right side form */}
          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column justify-content-center align-items-center">
              <h1 className="fw-bold mb-2" style={{ color: '#ff6219' }}>
                <i className="fas fa-cubes me-3"></i>Logo
              </h1>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Sign into your account
              </h5>

              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="email"
                name="email"
                type="email"
                value={formData.email}
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

              <MDBBtn className="mb-4 px-5" color="dark" size="lg" onClick={handleLogin}>
                Login
              </MDBBtn>

              <p className="small text-muted">
                <a href="#!" className="text-muted">Forgot password?</a>
              </p>

              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: '#393f81' }}>Register here</Link>
              </p>

              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
