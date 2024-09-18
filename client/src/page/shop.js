import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '../App';
import '../asett/shop.css';

function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { role } = useContext(Auth);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/search?searchText=${searchTerm}&category=${filters.category ?? ''}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, filters]);

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/product/" + productId
        , {
          method: 'DELETE'
        });

      if (response.ok) {
        // Update products state (after removing the deleted product)
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        console.log('Product deleted successfully!');
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <div >
        <select className='input-filtter' onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value=''>ALL CATEGORIES</option>
          <option value='electronics'>Electronics</option>
          <option value='clothing'>Clothing</option>
          <option value='home-appliances'>Home Appliances</option>
          {/* Add more categories as needed */}
        </select>
        <input
          type="text"
          value={searchTerm}
          className="search-input"
          onChange={handleSearchChange}
          placeholder="Search products..."
        />
      </div>
      <h2>Product List</h2>

      {isLoading && <p>Loading products...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className='product'>
        <ul>
          {products.length > 0 ? (
            products.map((product) => (
              <li key={product._id} className='product-card'>
                <Link to={`/product/${product._id}`}>
                  <img src={product.image} alt={product.name} className="product-image" />
                </Link>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">${product.price}</p>
                </div>
                {role === 'admin' && (
                  <div className="buttons">
                    <Link to={`/products/edit/${product._id}`}>
                      <button>Update</button>
                    </Link>
                    <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default Shop;
