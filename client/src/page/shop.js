import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '../App';
import '../asset/shop.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Shop() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { role } = useContext(Auth);

  // Handles search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/search?searchText=${searchTerm}&category=${filters.category}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, filters]);

  // Handle deleting a product (Admin role)
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/product/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Pagination Logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = products.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(products.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      {/* Search and Filter Section */}
      <div className="justify-content-center text-align-center d-flex">
        <select
          className="form-select w-50 m-5"
          aria-label="Filter"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value=''>ALL CATEGORIES</option>
          <option value='electronics'>Electronics</option>
          <option value='clothing'>Clothing</option>
          <option value='home-appliances'>Home Appliances</option>
          <option value='furniture'>Furniture</option>
        </select>
        <input
          type="text"
          className="form-control w-50 m-5"
          placeholder="Search products..."
          onChange={handleSearchChange}
          aria-label="Search"
        />
      </div>

      <h2>Product List</h2>

      {isLoading && <p>Loading products...</p>}
      {error && <p>Error: {error}</p>}

      {/* Product List */}
      <div className="row">
  {currentRecords.length > 0 ? (
    currentRecords.map((product) => (
      <div key={product._id} className="col-md-4 mb-4">
        <div className="product-card card">
          <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} className="product-image card-img-top" />
          </Link>

          <div className="product-info card-body">
            <h3 className="product-name card-title">{product.name}</h3>
            <p className="product-price card-text">${product.price}</p>
          </div>

          {role === 'admin' && (
            <div className="buttons">
              <Link to={`/products/edit/${product._id}`}>
                <button className="btn btn-primary">Update</button>
              </Link>
              <button className="btn btn-danger" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
            </div>
          )}
        </div>
      </div>
    ))
  ) : (
    <p>No products found.</p>
  )}
</div>


      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <Link className="page-link" to="#" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </Link>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              <Link className="page-link" to="#" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Link>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <Link className="page-link" to="#" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Shop;
