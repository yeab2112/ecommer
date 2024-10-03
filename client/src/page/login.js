import '../asett/form.css'
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../App'; 
import { Auth } from '../App';
function Login({}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); 
   const {setRole} =useContext(Auth)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, userType }),
      });

      if (response.ok) {
        toast.success('Login successful', {
          position: 'top-right',
          autoClose: 5000,
        });

        const data = await response.json();
        const token = data.token;
        const user = data.userA;
        const role= data.role
        localStorage.setItem('token', token);
      setRole(role)
        setUser(user); 
        if (userType === 'admin') {
          navigate('/admin');
          setRole("admin")

        } else {
          navigate('/');
        }
        console.log(user);
      } else {
        const errorData = await response.json();
        console.log(errorData);
        toast.error(errorData.message || 'Login failed', {
          position: 'top-right',
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="form-continer">
      <form onSubmit={handleSubmit} className="formm">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            autoComplete="off"
            className="form-control"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="name" className="form-label">
            Password:
          </label>
          <input
            autoComplete="off"
            className="form-control"
            type="text"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <label htmlFor="name" className="form-label">
          ROLE:
        </label>
        <select
          className="form-control"
          name="roll"
          id="roll"
          onChange={(e) => setUserType(e.target.value)}
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="form-button">
          Login
        </button>
        <p>
        <Link to="/forget-password" className="log">
            Forget password
          </Link>
          </p>
          <p>
          I have'nt an account?
          <Link to="/signup" className="log">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

