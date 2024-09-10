import React, { useState } from 'react';
import './SearchBooks.css'; // Importing the CSS file

const SearchBooks = () => {
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost/school-library/search_books.php?title=${title}`);
    const data = await response.json();
    setBooks(data);
  };

  return (
    <div className="search-books-container">
      <h2>Search for Books</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter book title"
          required
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book.book_id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBooks;
