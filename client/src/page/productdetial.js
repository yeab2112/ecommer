import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cartcontext } from '../component/contextprovide.js';
import { Row, Col,  Image } from 'react-bootstrap'; 
import '../asset/productdetail.css';
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
    <div className="product-detail-continer"> 
      <Row className="justify-content-center"> 
        <Col md={6} className="text-center"> 
          <div className='left-item'>
            <h2 className="product-detail-name">{product.name}</h2>
            <Image src={product.image} alt={product.name} fluid className="mb-3" style={{ maxWidth: '100%' }} /> 
          </div>
        </Col>
        <Col md={6} className="text-center"> 
          <div className='right'>
            <p className="product-detail-price">Price: ${product.price}</p>
            <p className="product-detail-brand">Brand: {product.brand}</p>
            <p className="product-detail-description">Description: {product.descrption}</p>

            <button className='btn btn-primary' onClick={handleAddToCart}>Add to Cart</button>
            <Link to="/shop">
              <button className='btn btn-primary'>Back to Shop</button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetail;
