// client/src/components/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/api/reset-password/${token}, { password }`);
    alert('Password has been reset!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" required />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
