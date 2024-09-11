import React from 'react';

const ReserveBook = ({ bookId }) => {
  const handleReserve = () => {
    if (!bookId) {
      alert('Book ID is missing.');
      return;
    }

    // Fetch to backend located on localhost:80
    fetch('http://localhost/backend/reserve_book.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ book_id: bookId }), // Send the book ID to reserve
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert('Book reserved successfully!');
        } else {
          alert(data.message || 'Failed to reserve the book.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to reserve the book. Please try again.');
      });
  };

  return (
    <button onClick={handleReserve} disabled={!bookId}>
      Reserve Book
    </button>
  );
};

export default ReserveBook;
