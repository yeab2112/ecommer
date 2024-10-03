import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '../App';
import '../asett/shop.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Shop() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const recordsPerPage = 3; 
  const [searchTerm, setSearchTerm] = useState('');
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
      const response = await fetch(`http://127.0.0.1:5000/api/product/${productId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        console.log('Product deleted successfully!');
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
       <div className="justify-content-center text-aligns-center d-flex ">
        <select className="form-select w-50 m-5" aria-label="Filter" onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
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
      {error && <p>Error: {error.message}</p>}

      <div className='product'>
        <ul className='list-unstyled'> 
          {products.length > 0 ? (
            currentRecords.map((product) => (
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

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}> 
            <Link className="page-link" to="#" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
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
              <span className="sr-only">Next</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Shop;
