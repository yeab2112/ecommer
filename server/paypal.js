// // myfile.mjs
// import dotenv from 'dotenv';
// import paypal from 'paypal-rest-sdk';

// dotenv.config();

// paypal.configure({
//   mode: 'sandbox', // Change to 'live' for production

//     client_id: process.env.PAYPAL_CLIENT_ID,
//     client_secret: process.env.PAYPAL_CLIENT_SECRET,
//   });

//   export default paypal;
  

// // utility/paypal.js

import paypal from 'paypal-rest-sdk';

export const createPayment = (paymentJSON) => {
  return new Promise((resolve, reject) => {
    paypal.payment.create(paymentJSON, (error, payment) => {
      if (error) {
        return reject(error);
      }
      resolve(payment);
    });
  });
};

export const executePayment = (paymentId, payerId) => {
  return new Promise((resolve, reject) => {
    paypal.payment.execute(paymentId, { payer_id: payerId }, (error, payment) => {
      if (error) {
        return reject(error);
      }
      resolve(payment);
    });
  });
};


