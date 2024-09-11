import React from 'react';

const BorrowBook = ({ bookId }) => {
  const handleBorrow = () => {
    fetch('http://localhost/backend/borrow_book.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ book_id: bookId }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      });
  };

  return <button onClick={handleBorrow}>Borrow Book</button>;
};

export default BorrowBook;
