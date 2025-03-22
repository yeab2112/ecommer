import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom'; 
import Title from './Title';
function LatestCollection() {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="p-6 bg-gray-100">
      <Title title1={'Latest'} title2={'Collection'} />
      <div className="text-center mb-6 text-gray-600">
        <p className="text-lg font-medium text-gray-700 mt-2">Explore the newest products in our collection.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products && products.length > 0 ? (
          products.slice(0, 10).map((product) => (
            <Link
              to={`/product/${product.id}`} // Link to the product details page
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow group"
              key={product.id}
            >
              <img
                src={product.image } 
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="text-lg font-semibold text-gray-700 mt-4 group-hover:text-blue-600">
                {product.name}
              </h3>
              {product.price && (
  <p className="text-xl font-bold text-green-800 mt-2">
    ${(product.price)}
  </p>
)}
 </Link>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No products available in the collection.
          </p>
        )}
      </div>
    </div>
  );
}

export default LatestCollection;
