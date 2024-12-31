import React, { useState } from 'react';

function NewsLeterBox() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      setMessage('Please enter a valid email address.');
    } else {
      setMessage('Thank you for subscribing to our newsletter!');
      setEmail(''); // Clear the input field
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Stay updated with the latest news, promotions, and exclusive offers
        directly to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Subscribe
        </button>
      </form>
      {message && (
        <p className="text-center mt-4 text-gray-700">
          {message}
        </p>
      )}
    </div>
  );
}

export default NewsLeterBox;
