import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../asett/contact.css'

function EditProduct() {
  const { productId } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:5000/api/product/" + productId
          , {
            method: 'GET'
          });
        if (!response.ok) {
          throw new Error('Failed to fetch product'); 
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/product/" + productId
        , {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          price: product.price,
          image: product.image,
        }),
      });

      if (response.ok) {
        console.log('Product updated successfully!');
        navigate('/admin/shop'); // Navigate back to the product list
      } else {
        console.error('Error updating product:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>; 
  }

  return (
    <div className='container'>
      <h2>Edit Product</h2>
        <form  onSubmit={handleSubmit} className='form'>
           <div className='form-group'>
          <label htmlFor="name" className='form-label'>Name:</label>
          <input className='form-control'
            type="text"
            id="name"
            name="name"
             value={product.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price" className='form-label'>Price:</label>
          <input className='form-control'
            type="number"
            id="price"
            name="price"
             value={product.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image" className='form-label'>Image URL:</label>
          <input className='form-control'
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className='form-button'>Update</button>
      </form>
    </div>
  );
}

export default EditProduct;
