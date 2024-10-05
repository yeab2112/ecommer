import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const location = useLocation();
  const [status, setStatus] = useState('Verifying payment...');

  // Extract the tx_ref from the URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const txRef = queryParams.get('tx_ref');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/verify', { txRef });
        if (response.data.status === 'success') {
          setStatus('Payment successful!');
        } else {
          setStatus('Payment verification failed.');
        }
      } catch (error) {
        setStatus('Error verifying payment.');
      }
    };

    if (txRef) {
      verifyPayment();
    }
  }, [txRef]);

  return <div>{status}</div>;
};

export default PaymentSuccess;