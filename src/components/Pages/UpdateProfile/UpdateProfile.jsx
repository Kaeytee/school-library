import React, { useState, useEffect } from 'react';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({ name: '', contact_information: '' });

  useEffect(() => {
    // Load initial data (you could fetch this from the backend)
    setFormData({ name: 'John Doe', contact_information: '123-456-7890' });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    fetch('http://localhost/backend/update_profile.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Profile updated successfully');
        } else {
          alert('Profile update failed');
        }
      });
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="contact_information"
        value={formData.contact_information}
        onChange={handleInputChange}
        placeholder="Contact Information"
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateProfile;
