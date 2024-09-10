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
} from 'mdb-react-ui-kit';
import './SearchBooks.css'
const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Fetch books from the backend
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = (query = '') => {
    const url = query
      ? `http://localhost/backend/books.php?query=${query}`
      : `http://localhost/backend/books.php`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
      })
      .catch((error) => console.error('Error fetching books:', error));
  };

  // Function to handle the search input and filter the books
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    // Fetch filtered books when search value is updated
    fetchBooks(searchValue);
  };


  return (
    <MDBContainer className="my-5">
      <h1 className="text-center mb-4">Search Books</h1>

      {/* Search input */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by title, author, genre, or ISBN"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Book cards displayed in rows */}
      <MDBRow>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <MDBCol md="4" className="mb-4" key={book.book_id}>
              <MDBCard>
                <MDBCardImage 
                  src="https://via.placeholder.com/150" 
                  alt="Book cover" 
                  position="top" 
                  className="w-100"
                />
                <MDBCardBody>
                  <MDBCardTitle>{book.title}</MDBCardTitle>
                  <MDBCardText>
                    <strong>Author:</strong> {book.author} <br />
                    <strong>Genre:</strong> {book.genre} <br />
                    <strong>ISBN:</strong> {book.isbn} <br />
                    <strong>Available Copies:</strong> {book.available_copies} <br />
                    <strong>Publication Year:</strong> {book.publication_year}
                  </MDBCardText>
                  <MDBBtn color="primary">Borrow</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))
        ) : (
          <p className="text-center">No books found.</p>
        )}
      </MDBRow>
    </MDBContainer>
  );
};

export default SearchBooks;
