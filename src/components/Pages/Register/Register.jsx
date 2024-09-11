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
import { Link, useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

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

    fetch('http://localhost/backend/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  // Ensure all form data is sent
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert('Registration successful');
            navigate('/login');  // Redirect to login after success
          } else {
            alert(data.message || 'Registration failed');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('There was an error with the registration. Please try again.');
        });
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage 
              src='https://images.pexels.com/photos/14520333/pexels-photo-14520333.jpeg?auto=compress&cs=tinysrgb&w=400' 
              alt="register form" 
              className='rounded-start w-100' 
            />
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">School Library</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Create a Library Account Today
              </h5>

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

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleSubmit}>
                Register
              </MDBBtn>

              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                Already have an account? <Link to="/login" style={{ color: '#393f81' }}>Login here</Link>
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
