import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
 import '../asett/payment.css';

const Payment = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div className="payment-continer">
      <h2 className="text-center m-4">Payment Method</h2>
      
      <div className="d-flex  flex-column justify-content-center align-items-center">
        <div className=' input ms-4'>
          <input
          className='m-2'
            type="radio"
            name="paymentMethod"
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            value={'Stripe'}
          />
          <label className='m-2' >Stripe</label>
        </div>
        <div className="input ms-4"> {/* Add margin start for spacing */}
          <input
          className='m-2'
            type="radio"
            name="paymentMethod"
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            value={'PayPal'}
          />
          <label className='m-2' >PayPal</label>
        </div>
      </div>
    </div>
  );
};

export default Payment;
