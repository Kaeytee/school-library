import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [gradeClass, setGradeClass] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const member = { name, grade_class: gradeClass, contact_information: contactInfo, role };

    // Make API request to the PHP backend
    const response = await fetch('http://localhost:8000/register_member.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    });

    const data = await response.json();
    setMessage(data.message);

    if (data.success) {
      // Reset form
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
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Grade/Class:</label>
          <input type="text" value={gradeClass} onChange={(e) => setGradeClass(e.target.value)} required />
        </div>
        <div>
          <label>Contact Information:</label>
          <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} required />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;