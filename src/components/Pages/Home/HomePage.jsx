import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBIcon
} from 'mdb-react-ui-kit';

function HomePage() {
  const navigate = useNavigate();

  // Check if the user is logged in (you can use a more secure authentication check in production)
  const isLoggedIn = localStorage.getItem('userLoggedIn');

  const handleBooksClick = () => {
    if (!isLoggedIn) {
      alert('Please log in first!');
      navigate('/login'); // Redirect to login if not logged in
    } else {
      navigate('/books'); // Navigate to books if logged in
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage 
              src='https://images.pexels.com/photos/6549910/pexels-photo-6549910.jpeg?auto=compress&cs=tinysrgb&w=400' 
              alt="School Library" 
              className='rounded-start w-100' 
            />
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="book fa-3x me-3" style={{ color: '#ff6219' }} />
                <h1 className="fw-bold mb-0">Welcome to Our School Library</h1>
              </div>

              <p className="my-4">
                Our school library provides access to a rich collection of books, journals, and digital resources 
                to support students and staff in their academic journey. Explore, read, and learn through our diverse 
                collection of materials. Our library ensures that all resources are available at your fingertips, anytime, anywhere.
              </p>

              <p className="mb-5">
                Please log in or sign up to access our collection of books, borrow resources, and manage your library account.
              </p>

              <div className='d-flex flex-row justify-content-start'>
                <Link to="/login">
                  <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
                </Link>
                <Link to="/register">
                  <MDBBtn className="mb-4 px-5" color='primary' size='lg'>Sign Up</MDBBtn>
                </Link>
              </div>

              {/* View Books Button */}
              <MDBBtn className="mb-4 px-5" color='secondary' size='lg' onClick={handleBooksClick}>
                View Books
              </MDBBtn>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default HomePage;
