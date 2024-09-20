import express from 'express';
import cors from 'cors';
import { router } from './route/user.js';
import './config/db.js';
import bodyParser from 'body-parser';
import paypal from 'paypal-rest-sdk';
import dotenv from 'dotenv';
import { createPayment, executePayment } from './paypal.js';

dotenv.config();

// Configure PayPal API credentials
paypal.configure({
  'mode': 'sandbox', // Use 'sandbox' for testing, 'live' for production
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

const app = express(); // Initialize the app

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', router);

app.post('/api/create-paypal-order', async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentJSON = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      transactions: [
        {
          amount: {
            currency: 'USD',
            total: amount
          }
        }
      ],
      redirect_urls: {
        return_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel'
      }
    };

    const createOrderResponse = await createPayment(paymentJSON);

    res.json({
      orderId: createOrderResponse.id,
      redirectUrl: createOrderResponse.links.find(link => link.rel === 'approval_url').href
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).send('Error creating order');
  }
});

app.post('/api/verify-paypal-payment', async (req, res) => {
  try {
    const { payerId, paymentId } = req.body;

    const executePaymentResponse = await executePayment(paymentId, payerId);

    res.status(200).json({ message: 'Payment successful!' });
  } catch (error) {
    console.error('Error executing PayPal payment:', error);
    res.status(500).send('Error executing payment');
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
