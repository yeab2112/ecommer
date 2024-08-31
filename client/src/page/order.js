import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkOutForm'; // Ensure correct casing in file names

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
console.log(stripePromise)
function PlaceOrder() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default PlaceOrder;
