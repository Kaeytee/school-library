import React, { useState } from 'react';

const AdminActions = () => {
  const [actionType, setActionType] = useState('add'); // Track the selected action
  const [bookData, setBookData] = useState({
    book_id: '',
    title: '',
    author: '',
    publication_year: '',
    genre: '',
    available_copies: '',
  });

  // Handle input change for the book form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  // Handle form submission for any admin action (add, update, delete)
  const handleAction = () => {
    const url = 'http://localhost/backend/admin_actions.php';
    const data = {
      action: actionType, // 'add', 'update', or 'delete'
      book_id: bookData.book_id, // Required only for update or delete actions
      title: bookData.title,
      author: bookData.author,
      year: bookData.publication_year,
      genre: bookData.genre,
      copies: bookData.available_copies,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="admin-actions">
      <h1>Admin Actions</h1>
      
      <div>
        <label htmlFor="actionType">Select Action:</label>
        <select
          id="actionType"
          name="actionType"
          value={actionType}
          onChange={(e) => setActionType(e.target.value)}
        >
          <option value="add">Add Book</option>
          <option value="update">Update Book</option>
          <option value="delete">Delete Book</option>
        </select>
      </div>

      {/* Form for Adding/Updating/Deleting Books */}
      <div>
        {actionType !== 'add' && (
          <div>
            <label htmlFor="book_id">Book ID:</label>
            <input
              type="text"
              id="book_id"
              name="book_id"
              value={bookData.book_id}
              onChange={handleInputChange}
              placeholder="Enter Book ID"
              required={actionType !== 'add'} // Required for update and delete actions
            />
          </div>
        )}

        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleInputChange}
            placeholder="Enter Book Title"
            required={actionType !== 'delete'}
          />
        </div>

        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleInputChange}
            placeholder="Enter Book Author"
            required={actionType !== 'delete'}
          />
        </div>

        {actionType !== 'delete' && (
          <>
            <div>
              <label htmlFor="publication_year">Publication Year:</label>
              <input
                type="number"
                id="publication_year"
                name="publication_year"
                value={bookData.publication_year}
                onChange={handleInputChange}
                placeholder="Enter Year"
              />
            </div>

            <div>
              <label htmlFor="genre">Genre:</label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={bookData.genre}
                onChange={handleInputChange}
                placeholder="Enter Genre"
              />
            </div>

            <div>
              <label htmlFor="available_copies">Available Copies:</label>
              <input
                type="number"
                id="available_copies"
                name="available_copies"
                value={bookData.available_copies}
                onChange={handleInputChange}
                placeholder="Enter Number of Copies"
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <div>
          <button onClick={handleAction}>
            {actionType === 'add'
              ? 'Add Book'
              : actionType === 'update'
              ? 'Update Book'
              : 'Delete Book'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminActions;
