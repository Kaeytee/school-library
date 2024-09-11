import React, { useState } from 'react';

const ReserveBook = ({ bookId }) => {
  const handleReserve = () => {
    fetch('http://localhost/backend/reserve_book.php', {
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

  return <button onClick={handleReserve}>Reserve Book</button>;
};

export default ReserveBook;
