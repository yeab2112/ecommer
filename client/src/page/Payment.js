import React, { useState, useEffect } from 'react';
import '../asett/form.css';

const Payment = ({ paymentMethod, setPaymentMethod }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0)

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
    const sum = cart.reduce((acc, item) => acc + item.quantity, 0)
    setTotalItem(sum)
  }, []);

  return (
    <div>
      <h2 className='peyment-method'>Payment Method</h2>
      <div className='form-groupp'>
        <label className='form-label'>Stripe</label>
        <input
          type="radio"
          name="paymentMethod"
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
          value={'Stripe'}
          className='form-controlp'
        />
      </div>
      <div className='form-groupp'>
        <label className='form-label'>PayPal</label>
        <input
          type="radio"
          name="paymentMethod"
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
          value={'PayPal'}
          className='form-controlp'
        />
      </div>
      <div className='total-price'>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        <h3>Total Item: {totalItem}</h3>

      </div>

    </div>
  );
};

export default Payment;
