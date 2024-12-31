import React, { useContext, useState, useEffect } from 'react';
import axios from "axios";
import '../asset/dashboard.css'; 
import 'react-step-progress/dist/index.css';
import StepProgressBar from "react-step-progress";
import { cartcontext } from '../component/contextprovide';
import { AuthContext } from '../App';
import PaymentForm from './paymentform';
import Shipping from './shipping';

const Checkouts = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const { cart } = useContext(cartcontext);
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [amount, setAmount] = useState(0);  // Set default as 0
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const getCartItemsFromLocalStorage = () => {
    const cartItems = localStorage.getItem('cart');
    return cartItems ? JSON.parse(cartItems) : []; 
  };

  useEffect(() => {
    const cartItems = getCartItemsFromLocalStorage();
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalPrice(total);
    const sum = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItem(sum);
    setAmount(total);  // Set amount based on total price
  }, []);

  const onFormSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/shipping', {
        address, address2, city, state, zip, userId: user._id,
        products: cart, totalPrice: totalPrice, totalItem: totalItem, 
      });

      if (response.data.message) {
        alert(response.data.message);
      } else {
        alert('Order created successfully!');
      }
    } catch (error) {
      console.error(error);
      alert('Error processing order');
    }
  };

  return (
    <div>
      <StepProgressBar
        startingStep={0}
        onSubmit={onFormSubmit}
        nextBtnName="Continue"
        previousBtnName="Back"
        steps={[
          {
            label: 'Shipping',
            subtitle: '50%',
            name: 'step 1',
            content: <Shipping
              address={address}
              setAddress={setAddress}
              address2={address2}
              setAddress2={setAddress2}
              zip={zip}
              setZip={setZip}
              state={state}
              setState={setState}
              city={city}
              setCity={setCity} // Fixed typo here from setCtiy to setCity
            />
          },
          {
            label: 'Payment',
            subtitle: '100%',
            name: 'step 2',
            content: <PaymentForm 
              amount={amount} 
              setAmount={setAmount} 
              email={email} 
              setEmail={setEmail}         
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
            />
          }
        ]}
      />
    </div>
  );
};

export default Checkouts;
