import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    gradeClass: '',
    contactInfo: '',
    role: 'student', // Default role is 'student'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // POST request to your backend for registration
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Registration successful", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          {/* Left Image Column */}
          <MDBCol md='6'>
            <MDBCardImage 
              src='https://images.pexels.com/photos/14520333/pexels-photo-14520333.jpeg?auto=compress&cs=tinysrgb&w=400' 
              alt="register form" 
              className='rounded-start w-100' 
            />
          </MDBCol>

          {/* Right Form Column */}
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              {/* Logo and Icon */}
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">School Library</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Create a Library Account Today
              </h5>

              {/* Role Selection (Student or Staff) */}
              <div className="mb-4">
                <label className="mb-2">I am a: </label>
                <select 
                  className="form-select" 
                  value={formData.role} 
                  name="role" 
                  onChange={handleInputChange}
                >
                  <option value="student">Student</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              {/* Username Input */}
              <MDBInput 
                wrapperClass='mb-4' 
                label='Username' 
                id='username' 
                name='username' 
                type='text' 
                size="lg"
                required
                onChange={handleInputChange}
              />

              {/* Password Input */}
              <MDBInput 
                wrapperClass='mb-4' 
                label='Password' 
                id='password' 
                name='password' 
                type='password' 
                size="lg"
                required
                onChange={handleInputChange}
              />

              {/* Confirm Password Input */}
              <MDBInput 
                wrapperClass='mb-4' 
                label='Confirm Password' 
                id='confirmPassword' 
                name='confirmPassword' 
                type='password' 
                size="lg"
                required
                onChange={handleInputChange}
              />

              {/* Full Name Input */}
              <MDBInput 
                wrapperClass='mb-4' 
                label='Full Name' 
                id='name' 
                name='name' 
                type='text' 
                size="lg"
                required
                onChange={handleInputChange}
              />

              {/* Grade/Class Input for Students Only */}
              {formData.role === 'student' && (
                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Grade/Class' 
                  id='gradeClass' 
                  name='gradeClass' 
                  type='text' 
                  size="lg"
                  onChange={handleInputChange}
                />
              )}

              {/* Contact Information Input */}
              <MDBInput 
                wrapperClass='mb-4' 
                label='Contact Information' 
                id='contactInfo' 
                name='contactInfo' 
                type='text' 
                size="lg"
                required
                onChange={handleInputChange}
              />

              {/* Register Button */}
              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleSubmit}>
                Register
              </MDBBtn>

              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                Already have an account? <Link to="/login" style={{ color: '#393f81' }}>Login</Link>
              </p>

              <div className='d-flex flex-row justify-content-start'>
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

export default Register;
