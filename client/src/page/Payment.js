import React, { useState, useEffect } from 'react';
import '../asett/form.css';

const Payment = () => {
  const [payment, setPayment] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const[totalItem,setTotalItem]=useState(0)

  // Function to get cart items from local storage
  const getCartItemsFromLocalStorage = () => {
    const cartItems = localStorage.getItem('cart'); // Replace 'cart' with your actual key
    return cartItems ? JSON.parse(cartItems) : []; // Parse JSON or return an empty array if not found
  };

  // Calculate total price when component mounts
  useEffect(() => {
    const cart = getCartItemsFromLocalStorage();
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalPrice(total);
    const sum =cart.reduce((acc,item)=>acc+item.quantity ,0)
    setTotalItem(sum)
  }, []);

  // Function to handle payment submission
  const handlePaymentSubmit = async () => {
    if (payment) {
      try {
        const response = await fetch('http://127.0.0.1:5001/api/payment',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentMethod: payment, totalPrice }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Payment response:', data);
      } catch (error) {
        console.error('Error submitting payment:', error);
      }
    } else {
      alert('Please select a payment method.');
    }
  };
  
  return (
    <div className='form-continerp'>
      <h2>Payment Method</h2>
      <div className='form-groupp'>
        <label className='form-label'>Stripe</label>
        <input
          type="radio"
          name="paymentMethod"
          onChange={(e) => setPayment(e.target.value)}
          required
          value={'Stripe'}
          className='form-controlp'
          checked={payment === 'Stripe'}
        />
      </div>
      <div className='form-groupp'>
        <label className='form-label'>PayPal</label>
        <input
          type="radio"
          name="paymentMethod"
          onChange={(e) => setPayment(e.target.value)}
          required
          value={'PayPal'}
          className='form-controlp'
          checked={payment === 'PayPal'}
        />
      </div>
      <div className='total-price'>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        <h3>Total Item: {totalItem}</h3>

      <button onClick={handlePaymentSubmit} className='submit-button'>
        Submit Payment
      </button>
      </div>

    </div>
  );
};

export default Payment;
