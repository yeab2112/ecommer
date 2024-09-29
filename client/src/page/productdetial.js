import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../asett/productdetail.css';

import { cartcontext } from '../component/contextprovide.js';

function ProductDetail() {
  const { productId } = useParams(); 
  const { dispatch } = useContext(cartcontext); 
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
  

      dispatch({ type: 'add', product});

     
    
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

       

        <button className='btn' onClick={handleAddToCart}>Add to Cart</button>
        <Link to="/shop">
          <button className='btn'>Back to Shop</button>
          </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
