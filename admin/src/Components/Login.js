import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/user/admin_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("API Response:", data); // Debugging log
  
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed. Please check your credentials.");
      }
  
      // Store the token in localStorage
      localStorage.setItem("token", data.token);
  
      // Call the onLogin function to update authentication state
      onLogin(data.token);
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  };
  

  const handleForgotPassword = () => {
    // Add logic for forgot password
    console.log('Forgot password clicked');
  };

  const handleSignUp = () => {
    // Add logic for sign up
    console.log('Sign up clicked');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Button */}
        <button
          onClick={handleForgotPassword}
          className="w-full text-center text-sm text-blue-500 hover:text-blue-700 mt-4 focus:outline-none"
        >
          Forgot password?
        </button>

        {/* Sign Up Button */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={handleSignUp}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;