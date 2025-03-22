import React from 'react';

function RelatedProduct({ category, products }) {
  // Filter products by category
  const filteredProducts = products.filter(product => product.category === category);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-500 font-semibold mt-2">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProduct;
