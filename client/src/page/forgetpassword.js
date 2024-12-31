import React, {  useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../asset/form.css';

function Forgetpassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/api/forget-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        navigate('/login');
        toast.success('Password reset email sent. Check your inbox.'); // Use toast for feedback
      } else {
        const errorData = await response.json(); // Get error details from the server
        toast.error(errorData.message || 'Failed to send reset email'); 
      }
    } catch (error) {
      console.error('Forget password error:', error);
      toast.error('An error occurred. Please try again later'); 
    }
  };

  return (
    <div className="form-continer">
      <form onSubmit={handleSubmit} className="formm">
        <h2>Forget Password</h2>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            autoComplete="off"
            className="form-control"
            type="email"
            id="email"
            value={email} // Use value to display the current email
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default Forgetpassword;
