
import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [orderData, setOrderData] = useState({
    customer: '',
    items: [{ product: '', quantity: '', price: '' }],
    total: '',
    status: 'pending',
    billing: { name: '', address: '', city: '', state: '', zip: '' },
    shipping: { name: '', address: '', city: '', state: '', zip: '', trackingNumber: '' },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...orderData.items];
    items[index][name] = value;
    setOrderData({ ...orderData, items });
  };

  const addItem = () => {
    setOrderData({ ...orderData, items: [...orderData.items, { product: '', quantity: '', price: '' }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://your-backend-url/api/orders', orderData);
      console.log('Order submitted:', response.data);
      // Optionally reset the form or show a success message
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Order</h2>
      <input type="text" name="customer" placeholder="Customer ID" onChange={handleChange} required />
      
      {orderData.items.map((item, index) => (
        <div key={index}>
          <input type="text" name="product" placeholder="Product ID" value={item.product} onChange={(e) => handleItemChange(index, e)} required />
          <input type="number" name="quantity" placeholder="Quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} required />
          <input type="number" name="price" placeholder="Price" value={item.price} onChange={(e) => handleItemChange(index, e)} required />
        </div>
      ))}
      <button type="button" onClick={addItem}>Add Item</button>

      <input type="number" name="total" placeholder="Total" onChange={handleChange} required />

      {/* Billing Information */}
      <h3>Billing Information</h3>
      <input type="text" name="billing.name" placeholder="Name" onChange={handleChange} required />
      <input type="text" name="billing.address" placeholder="Address" onChange={handleChange} required />
      <input type="text" name="billing.city" placeholder="City" onChange={handleChange} required />
      <input type="text" name="billing.state" placeholder="State" onChange={handleChange} required />
      <input type="text" name="billing.zip" placeholder="ZIP Code" onChange={handleChange} required />

      {/* Shipping Information */}
      <h3>Shipping Information</h3>
      <input type="text" name="shipping.name" placeholder="Name" onChange={handleChange} required />
      <input type="text" name="shipping.address" placeholder="Address" onChange={handleChange} required />
      <input type="text" name="shipping.city" placeholder="City" onChange={handleChange} required />
      <input type="text" name="shipping.state" placeholder="State" onChange={handleChange} required />
      <input type="text" name="shipping.zip" placeholder="ZIP Code" onChange={handleChange} required />
      <input type="text" name="shipping.trackingNumber" placeholder="Tracking Number (optional)" onChange={handleChange} />

      <button type="submit">Submit Order</button>
    </form>
  );
};

export default OrderForm;