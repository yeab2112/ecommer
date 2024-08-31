import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../asett/productdetail.css'; // Ensure the path is correct
import axios from 'axios';

import { cartcontext } from '../component/contextprovide.js';
import { AuthContext } from '../App.js';

function ProductDetail() {
  const { productId } = useParams(); // Get the productId from URL parameters
  const { dispatch } = useContext(cartcontext); // Get dispatch from context
  const { user, quantity, setQuantity } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/productdetail/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (product) {
      // Validate quantity
      if (quantity < 1 || isNaN(quantity)) {
        alert("Please select a valid quantity.");
        return;
      }

      // Dispatch action to update cart context
      dispatch({ type: 'add', product, quantity });

      try {

        await axios.post('http://127.0.0.1:5000/api/cart', {
          productId: productId,
          quantity,
          userId: user?._id,
        });
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  if (isLoading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="product-detail">
      <div className='left-item'>
        <h2 className="product-detail-name">{product.name}</h2>
        <img src={product.image} alt={product.name} className="product-detail-image" />
      </div>
      <div className='right'>
        <p className="product-detail-price">Price: ${product.price}</p>
        <p className="product-detail-brand">Brand: {product.brand}</p>
        <p className="product-detail-description">Description: {product.description}</p>

        <div className="quantity-selector">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value) || 1)} // Ensure it's a number
          />
        </div>

        <button className='btn' onClick={handleAddToCart}>Add to Cart</button>
        <Link to="/shop">
          <button className='btn'>Back to Shop</button>
          </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
