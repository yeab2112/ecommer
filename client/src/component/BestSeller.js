import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

function BestSeller() {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    if (products) {
      const filteredBestSellers = products.filter((item) => item.bestSeller);
      setBestSellers(filteredBestSellers.slice(0, 5)); // Limit to top 5 best sellers
    }
  }, [products]);

  return (
    <div className="p-6 bg-gray-100">
      <Title title1="Best" title2="Sellers" />
      <p className="text-lg font-medium text-gray-700 text-center mt-4 mb-6">
        Discover our top-selling products, handpicked for you!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {bestSellers.length > 0 ? (
          bestSellers.map((product) => (
            <div
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow group"
              key={product.id}
            >
              <img
                src={product.image || 'fallback-image.jpg'}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="text-lg font-semibold text-gray-700 mt-4 group-hover:text-blue-600">
                {product.name}
              </h3>
              {product.price && (
                <p className="text-xl font-bold text-green-800 mt-2">
                  {`${product.currency || '$'}${product.price}`}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No best sellers available.
          </p>
        )}
      </div>
    </div>
  );
}

export default BestSeller;
