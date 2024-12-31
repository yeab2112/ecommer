import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';  
import { ShopContext } from '../context/ShopContext';
import { assets } from "../asset/asset.js";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();  // Get current location

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setSearch("");
    setShowSearch(false);
  };

  if (location.pathname !== '/collection') {
    return null; // Return nothing if the path is not '/collection'
  }

  return (
    <div className="flex justify-center items-center">
      {showSearch && (
        <div className="flex items-center mt-4 w-full sm:w-72 md:w-96 space-x-2">
          <div className="flex items-center border border-gray-300 rounded-full p-2 shadow-sm w-full">
            <input
              type="text"
              className="w-full focus:outline-none"
              placeholder="Search for products..."
              value={search}
              onChange={handleSearchChange}
            />
            <img
              src={assets.search}
              alt="Search Icon"
              className="h-6 w-6 ml-2 pointer-events-none"
            />
          </div>
          <img
            src={assets.cross}
            alt="Clear Search"
            className=" h-8 w-4 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
