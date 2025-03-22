import React from 'react';
import { asset } from '../asset/asset';

const Navbar = ({ onLogout }) => {
  const handleLogout = () => {
    console.log("User logged out");
    onLogout(); // Call the logout function passed from App
  };

  return (
    <header className="border-b border-gray-200 p-4 flex items-center justify-between">
      {/* Left Section: Admin Info */}
      <div className="flex items-center space-x-3">
        <img 
          src={asset.admin}  
          alt="Admin"
          className="rounded-full w-12 h-12 border-2 border-gray-300" 
        />
        <h1 className="text-gray-800 font-semibold text-lg">Admin Dashboard</h1>
      </div>

      {/* Right Section: User Image with Clickable Dropdown */}
      <div className="relative group">
        {/* User Image */}
        <img
          src={asset.user} // Replace with your user image path
          alt="User"
          className="rounded-full w-12 h-12 border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition duration-300"
        />
        
        {/* Dropdown Menu */}
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 opacity-0 invisible group-focus:opacity-100 group-focus:visible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <ul className="py-2">
            <li>
              <button
                onClick={handleLogout} // Call the logout function here
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-400 hover:text-white transition duration-300 focus:bg-gray-100 focus:outline-none"
              >
                Logout
              </button>
            </li>
            {/* Add more dropdown options here if needed */}
            <li>
              <button
                onClick={() => console.log("Profile clicked")}
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-400 hover:text-white transition duration-300 focus:bg-gray-100 focus:outline-none"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => console.log("Settings clicked")}
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-400 hover:text-white transition duration-300 focus:bg-gray-100 focus:outline-none"
              >
                Settings
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
