import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { asset } from '../asset/asset';

function Sidebar() {
  // Destructure the asset object for easier access
  const { addicon, listicon, order } = asset;

  return (
    <div className="flex flex-col w-48 h-screen bg-white border-r border-gray-200 text-gray-800 p-4 space-y-2 shadow-lg">
      {/* Add Icon with Text */}
      <Link
        to="/add"
        className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-all duration-200 border-b border-gray-200"
      >
        <img src={addicon} alt="Add Icon" className="w-6 h-6" />
        <span className="text-sm">Add</span>
      </Link>

      {/* List Icon with Text */}
      <Link
        to="/list"
        className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-all duration-200 border-b border-gray-200"
      >
        <img src={listicon} alt="List Icon" className="w-6 h-6" />
        <span className="text-sm">List</span>
      </Link>

      {/* Order Icon with Text */}
      <Link
        to="/order"
        className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-all duration-200 border-b border-gray-200"
      >
        <img src={order} alt="Order Icon" className="w-6 h-6" />
        <span className="text-sm">Order</span>
      </Link>
    </div>
  );
}

export default Sidebar;