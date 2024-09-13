import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminOrderSummary() {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/orderSummry');
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setOrderDetails(null); // Set orderDetails to null on error 
      }
    };

    fetchOrderDetails();
  }, []); 
  

  if (!orderDetails) {
    return <div>Loading order details...</div>;
  }

  const { products, totalPrice, user, paymentMethod, shippingAddress } = orderDetails;
  


  return (
    <div>
          <h3>Products</h3>
     {products && ( // Check if products is defined
       <ul>
         {products.map((product, index) => (
           <li key={index}>
             {product.quantity} x {product.name} - ${product.price * product.quantity}
           </li>
         ))}
       </ul>
     )}
     


      {/* Order Details */}
      <h3>Order Details</h3>
      {/* <p>Total Items: {totalItems}</p> */}
      <p>Total Price: ${totalPrice}</p>
      <p>Payment Method: {paymentMethod}</p>
      <p>customer: {user}</p>

      {/* Address Details (Optional) */}
      <h3>Address Information</h3>
      {shippingAddress && (
        <div>
          <h4>Shipping Address</h4>
          <p>{shippingAddress.address}</p>
          <p>{shippingAddress.address2}</p>

          <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
        </div>
      )}
      {/* {billingAddress && (
        <div>
          <h4>Billing Address</h4>
          <p>{billingAddress.street}</p>
          <p>{billingAddress.city}, {billingAddress.state} {billingAddress.zip}</p>
        </div>
      )} */}

    </div>
  );
}

export default AdminOrderSummary;
