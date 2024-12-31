
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const location = useLocation();
  const [status, setStatus] = useState('Verifying payment...');

  const queryParams = new URLSearchParams(location.search);
  const txRef = queryParams.get('tx_ref'); 
  // Assuming the tx_ref is passed as a query param
  console.log (txRef) 

  useEffect(() => {     
       // Send tx_ref to the backend for verification
 const verifyPayment = async () => {
      try {
  const response = await axios.post('http://localhost:5000/api/verify', { txRef });
        
// Update UI based on verification result
        if (response.data.status === 'success') {
          setStatus('Payment successful!');
          

        } else {
          setStatus('Payment verification failed.');
        }
      } catch (error) {
        setStatus('Error verifying payment.');
      }
    };

    // Trigger verification if txRef exists
    if (txRef) {
      verifyPayment();
    }
  }, [txRef]);

  return <div className='text-center'>{status}</div>;
};

export default PaymentSuccess;
