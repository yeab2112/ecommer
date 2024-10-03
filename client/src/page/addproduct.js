import React, { useState } from 'react';
import '../asett/addproduct.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Addproduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [descrption, setDescription] = useState('');
    const [brand, setPrand] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            name,
            price: parseFloat(price),
            image,
            descrption,
            brand,
            category,
        };
        try {
            const response = await fetch('http://127.0.0.1:5000/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(`Product added successfully: ${data.newProduct.name}`, {
                    position: "top-right",
                    autoClose: 5000
                });
                setMessage('Product added successfully');
                setName('');
                setPrice('');
                setImage('');
                setDescription('');
                setCategory('');
                setPrand('');
                navigate('/admin/shop');
            } else {
                setMessage('Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while adding the product');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center h-100">
            <div className="col-md-6">
                <h2 className="text-center mb-4">Add New Arrival</h2>
                <form onSubmit={handleSubmit} className='form'>
                    <div className='mb-3'>
                        <label className='form-label'>Name:</label>
                        <input className='form-control'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Description:</label>
                        <input className='form-control'
                            type="text"
                            value={descrption}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Category:</label>
                        <input className='form-control'
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Brand:</label>
                        <input className='form-control'
                            type="text"
                            value={brand}
                            onChange={(e) => setPrand(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Price:</label>
                        <input className='form-control'
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Image URL:</label>
                        <input className='form-control'
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Add Product</button>
                </form>
                {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
        </div>
    );
};

export default Addproduct;
