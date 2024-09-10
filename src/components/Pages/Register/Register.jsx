import React, { useState } from 'react';
import './Register.css'; // Importing the CSS file

const Register = () => {
  const [name, setName] = useState('');
  const [gradeClass, setGradeClass] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const member = { name, grade_class: gradeClass, contact_information: contactInfo, role };

    const response = await fetch('http://localhost/school-library/register_member.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    });

    const data = await response.json();
    setMessage(data.message);

    if (data.success) {
      setName('');
      setGradeClass('');
      setContactInfo('');
      setRole('student');
    }
  };

  return (
    <div className="register-container">
      <h2>Register New Member</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Grade/Class (Leave blank for staff):</label>
        <input
          type="text"
          value={gradeClass}
          onChange={(e) => setGradeClass(e.target.value)}
        />
        <label>Contact Information:</label>
        <input
          type="text"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
