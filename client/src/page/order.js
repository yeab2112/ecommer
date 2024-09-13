import React, { useState ,useEffect} from 'react';
import axios from 'axios'
function PlaceOrder() {
  
    const [orderId, setOrderId] = useState(null);
    const [redirectUrl, setRedirectUrl] = useState(null);
  
    const handlePayment = async () => {
      try {
        const amount = 100; // Set your actual payment amount
        const response = await axios.post('http://localhost:5000/api/create-paypal-order', 
          { amount });
        setOrderId(response.data.orderId);
        setRedirectUrl(response.data.redirectUrl);
      } catch (error) {
        console.error('Error creating PayPal order:', error);
      }
    };
  
    // Handle redirect to PayPal
    if (redirectUrl) {
      window.location.href = redirectUrl; // Redirect to PayPal for payment
    }
  
    // Handle return from PayPal
    const handlePayPalReturn = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const payerId = urlParams.get('PayerID');
      const paymentId = urlParams.get('paymentId');
  
      if (payerId && paymentId) {
        try {
          const response = await axios.post('http://localhost:5000/api/verify-paypal-payment', {
            payerId,
            paymentId
          });
          console.log('Payment successful:', response.data.message);
          // Handle payment success (e.g., update cart, redirect to a thank you page)
        } catch (error) {
          console.error('Error verifying PayPal payment:', error);
        }
      }
    };
  
    // Handle cancellation from PayPal
    const handlePayPalCancel = () => {
      console.log('Payment canceled');
      // Handle payment cancellation (e.g., redirect to the cart)
    };
  
    useEffect(() => {
      // Handle return from PayPal
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const paymentId = urlParams.get('paymentId');
      const payerId = urlParams.get('PayerID');
  
      if (paymentId && payerId) {
        handlePayPalReturn();
      } else if (window.location.search.includes('cancel')) {
        handlePayPalCancel();
      }
    }, []);
  
    return (
      <div>
        <button onClick={handlePayment}>Pay with PayPal</button>
      </div>
    );
  }
  
  

export default PlaceOrder;
