import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../component/Title';

function Collection() {
  const { products, search, showSearch } = useContext(ShopContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('relavent');
  const [showFilters, setShowFilters] = useState(false); // State to toggle filters

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filter products by category and search query
  const filteredProducts = products
    .filter((product) =>
      (!selectedCategories.length || selectedCategories.includes(product.category)) &&
      (!search || product.name.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOption === 'high-low') return b.price - a.price;
      if (sortOption === 'low-high') return a.price - b.price;
      return 0;
    });

  return (
    <div className="flex flex-col md:flex-row">
      {/* Filters Section */}
      <div className="w-full md:w-1/4 p-4 pb-4 border-r h-72 border-gray-300 mb-6">
        {/* Toggle Button for Small Screens */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden bg-blue-500 text-white p-2 rounded-full w-full text-center"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Filters Content */}
        <div className={`mt-4 ${showFilters ? "block" : "hidden"} md:block`}>
          <p className="font-bold text-lg mb-2 text-gray-800">Filter</p>
          <div className="mb-6">
            <p className="font-semibold text-gray-700 mb-2">Categories</p>
            {['Men', 'Women', 'Kids'].map((category) => (
              <label key={category} className="block text-gray-600 mb-2">
                <input
                  type="checkbox"
                  className="mr-2 accent-blue-500"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="w-full md:w-3/4 p-4">
        {/* Filters, Title, and Sort in a Row */}
        <div className="flex flex-wrap items-center justify-between mb-4">
          {/* Filter Toggle (Small Screens) */}
          <div className="md:hidden flex">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-blue-500 text-white p-2 rounded-full mr-2"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Title */}
          <div className="flex-grow flex justify-center">
            <Title title1="All" title2="Collection" />
          </div>

          {/* Sort Dropdown */}
          <div>
            <select
              className="border p-2 rounded shadow-sm text-gray-700 focus:ring focus:ring-blue-300"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="relavent">Relevant</option>
              <option value="high-low">High to Low</option>
              <option value="low-high">Low to High</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="border p-4 rounded shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="font-bold mt-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-500">{product.category}</p>
                <p className="font-bold text-blue-600">${product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collection;
