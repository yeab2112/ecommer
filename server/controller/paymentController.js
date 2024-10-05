import axios from 'axios';

// Chapa API endpoint
const CHAPA_API_URL = 'https://api.chapa.co/v1/transaction/initialize';
// Replace with your Chapa public and secret keys
const CHAPA_SECRET_KEY = 'CHASECK_TEST-Zx9WYTlcvbOsbvqOMLbDclIchCwINaHP';


const initiatePayment = async (req, res) => {
  const { amount, currency, email, firstName, lastName, txRef, callbackUrl } = req.body;

  const paymentData = {
    amount,
    currency,
    email,
    first_name: firstName,
    last_name: lastName,
    tx_ref: txRef,
    return_url:"http://localhost:3000",
    callback_url: callbackUrl,
    customization: {
      title: 'Payment',
      description: 'Payment for goods',
    },
  };

  try {
    const response = await axios.post(CHAPA_API_URL, paymentData, {
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
      },
    });

    if (response.data.status === 'success') {
      res.status(200).json({
        status: 'success',
        data: response.data.data, // The payment initialization response
      });
    } else {
      res.status(400).json({
        status: 'fail',
        message: response.data.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Payment initiation failed',
      error: error.message,
    });
  }
};

// Verify payment after transaction completes
 const verifyPayment = async (req, res) => {
  const { txRef } = req.body;

  try {
    const response = await axios.get(`https://api.chapa.co/v1/transaction/verify/${txRef}`, {
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
      },
    });

    if (response.data.status === 'success') {
      // Payment was successful
      res.status(200).json({
        status: 'success',
        data: response.data.data, // Payment verification data
      });
    } else {
      // Payment failed
      res.status(400).json({
        status: 'fail',
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Verification failed',
      error: error.message,
    });
  }
};
export {initiatePayment,verifyPayment}