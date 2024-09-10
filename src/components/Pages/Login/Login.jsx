import React from 'react';
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
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Link } from 'react-router-dom';


function Login() {
  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>

          {/* Left Image Column */}
          <MDBCol md='6'>
            <MDBCardImage 
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' 
              alt="login form" 
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

              {/* Sign In Text */}
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Sign into your account
              </h5>

              {/* Member ID Input */}
              <MDBInput 
                wrapperClass='mb-4' 
                label='Library Member ID' 
                id='memberId' 
                type='text' 
                size="lg"
                required
              />
              
              {/* Password Input */}
              <MDBInput 
                wrapperClass='mb-4' 
                label='Password' 
                id='password' 
                type='password' 
                size="lg"
                required
              />

              {/* Login Button */}
              <MDBBtn className="mb-4 px-5" color='dark' size='lg'>
                Login
              </MDBBtn>

              {/* Forgot Password and Registration Links */}
              <a className="small text-muted" href="#!">Forgot password?</a>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                Don't have an account? <Link to="/register" style={{ color: '#393f81' }}>Register</Link>
              </p>

              {/* Terms and Privacy Links */}
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

export default Login;
