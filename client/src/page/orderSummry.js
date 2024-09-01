import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';

function AdminOrderSummary() {
  const [orderDetails, setOrderDetails] = useState(null);
  const { orderId } = useParams(); 

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/orderSummry/${orderId}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <div>Loading order details...</div>;
  }

  const { 
    products, 
    totalItems, 
    totalPrice, 
    paymentMethod, 
    paymentStatus,
    shippingAddress, 
    billingAddress 
  } = orderDetails;

  return (
    <div>
      <h2>Order Summary</h2>

      <h3>Products</h3>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.quantity} x {product.name} - ${product.price * product.quantity}
          </li>
        ))}
      </ul>

      {/* Order Details */}
      <h3>Order Details</h3>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice}</p>
      <p>Payment Method: {paymentMethod}</p>
      <p>Payment Status: {paymentStatus}</p>

      {/* Address Details (Optional) */}
      <h3>Address Information</h3>
      {shippingAddress && (
        <div>
          <h4>Shipping Address</h4>
          <p>{shippingAddress.street}</p>
          <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
        </div>
      )}
      {billingAddress && (
        <div>
          <h4>Billing Address</h4>
          <p>{billingAddress.street}</p>
          <p>{billingAddress.city}, {billingAddress.state} {billingAddress.zip}</p>
        </div>
      )}

    </div>
  );
}

export default AdminOrderSummary;
