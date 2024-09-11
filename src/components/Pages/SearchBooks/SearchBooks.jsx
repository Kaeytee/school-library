import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBInput
} from 'mdb-react-ui-kit';
import './SearchBooks.css';

const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Fetch books from the backend when component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to fetch books from the backend with an optional search query
  const fetchBooks = (query = '') => {
    const url = query
      ? `http://localhost:5000/backend/books.php?query=${query}` // Ensure correct port number
      : `http://localhost:5000/backend/books.php`; // Ensure correct port number

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
      })
      .catch((error) => console.error('Error fetching books:', error));
  };

  // Handle search input and fetch filtered books
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    // Fetch filtered books based on search value
    fetchBooks(searchValue);
  };

  return (
    <MDBContainer>
      {/* Search input */}
      <MDBRow className="my-4">
        <MDBCol md="12">
          <MDBInput
            label="Search Books"
            id="searchInput"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
          />
        </MDBCol>
      </MDBRow>

      {/* Display books in a grid */}
      <MDBRow>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <MDBCol md="4" key={book.book_id} className="mb-4">
              <MDBCard>
                {/* Book Image (Fallback if no image is provided) */}
                <MDBCardImage
                  src={book.image || 'https://via.placeholder.com/150'}
                  position="top"
                  alt={book.title}
                />
                <MDBCardBody>
                  <MDBCardTitle>{book.title}</MDBCardTitle>
                  <MDBCardText>
                    <strong>Author:</strong> {book.author} <br />
                    <strong>Genre:</strong> {book.genre || 'N/A'} <br />
                    <strong>Available Copies:</strong> {book.available_copies}
                  </MDBCardText>
                  <MDBBtn href="#">Read More</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))
        ) : (
          <MDBCol md="12">
            <h5>No books found</h5>
          </MDBCol>
        )}
      </MDBRow>
    </MDBContainer>
  );
};

export default SearchBooks;
