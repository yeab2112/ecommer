import React, { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? 'Login' : 'Signup'}
        </h2>

        {isLogin ? (
          <LoginForm />
        ) : (
          <SignupForm />
        )}

        {/* Toggle link for signup/login */}
        <div className="text-center mt-4">
          <button
            onClick={toggleForm} // Ensure toggle happens only when button is clicked
            className="focus:outline-none"
          >
            {isLogin ? (
              <span>
                Don't have an account?{' '}
                <span className="text-blue-500 cursor-pointer hover:underline">
                  Sign up
                </span>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <span className="text-blue-500 cursor-pointer hover:underline">
                  Log in
                </span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (send login request to backend)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Login
      </button>
    </form>
  );
};

const SignupForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here (send signup request to backend)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Email"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Sign up
      </button>
    </form>
  );
};

export default AuthPage;
