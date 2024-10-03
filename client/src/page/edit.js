import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

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
        const response = await fetch("http://127.0.0.1:5000/api/product/" + productId, {
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
      const response = await fetch("http://127.0.0.1:5000/api/product/" + productId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          image: product.image,
          price: product.price,
          descrption: product.descrption,
          brand: product.brand,
          category: product.category,
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
    <div className="container d-flex justify-content-center align-items-center h-100">
      <form onSubmit={handleSubmit} className="w-50"> {/* Adjust width as necessary */}
        <h2>Edit Product</h2>
        
        <div className="m-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="m-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="m-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="m-3">
          <label htmlFor="descrption" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="descrption"
            name="descrption"
            value={product.descrption}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="m-3">
          <label htmlFor="brand" className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
          />
        </div>

        <div className="m-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary align-items-center" >Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
