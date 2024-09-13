import React from 'react';
import '../asett/form.css';

const Payment = ({ paymentMethod, setPaymentMethod }) => {
 

  // Function to get cart items from local storage
 

  // Calculate total price when component mounts
  

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
      

    </div>
  );
};

export default Payment;
