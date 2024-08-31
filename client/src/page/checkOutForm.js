import React, { useState } from 'react';
import axios from 'axios';
import '../asett/form.css'; // Ensure this path is correct for your CSS file
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const [amount, setAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!stripe || !elements) return;

        try {
            const { data: clientSecret } = await axios.post('/api/payments/create-payment-intent', {
                amount: amount * 100, // Convert to cents
            });

            const cardElement = elements.getElement(CardElement);
            const result = await stripe.confirmCardPayment(clientSecret.id, {
                payment_method: { card: cardElement },
            });

            if (result.error) {
                setErrorMessage(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                alert('Payment successful!');
            }
        } catch (error) {
            setErrorMessage('Payment failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handlePayment}>
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Enter amount" 
                required 
            />
            <CardElement />
            <button type="submit" disabled={!stripe} className='pay-button'>Pay</button>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </form>
    );
};

export default CheckoutForm;
