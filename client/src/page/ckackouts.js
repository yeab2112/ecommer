import React, { useContext, useState,useEffect} from 'react';
import axios from "axios";
import '../asett/dashboard.css'; 
import 'react-step-progress/dist/index.css'
import PlaceOrder from './order';  
import StepProgressBar from "react-step-progress"
import CheckoutForm from './shipping'
import Payment from './Payment';  
import { cartcontext } from '../component/contextprovide';
import { AuthContext } from '../App';

const Checkouts = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0)
  const { cart } = useContext(cartcontext);
  const { user } = useContext(AuthContext)
  const [address, setAddress] = useState()
  const [state, setState] = useState()
  const [paymentMethod, setPaymentMethod] = useState()
  const [paymentCard, setPaymentCard] = useState()
  const [address2, setAddress2] = useState()
  const [city, setCtiy] = useState()
  const [zip, setZip] = useState()
  const getCartItemsFromLocalStorage = () => {
    const cartItems = localStorage.getItem('cart');
    return cartItems ? JSON.parse(cartItems) : []; 
  };

  useEffect(() => {
    const cart = getCartItemsFromLocalStorage();
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalPrice(total);
    const sum = cart.reduce((acc, item) => acc + item.quantity, 0)
    setTotalItem(sum)
  }, []);

  const onFormSubmit = async () => {
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/shipping', {
        address, address2, city, state, zip, userId: user._id,
        products: cart, totalPrice: totalPrice,totalItem:totalItem, paymentMethod: paymentMethod,
      });

      if (response.data.message) {
        alert(response.data.message);
      } else {
        alert('Order created successfully!'); // Or provide a default message
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
        steps={
          [

            {
              label: 'Shipping',
              subtitle: '10%',
              name: 'step 1',
              content: <CheckoutForm
                address={address}
                setAddress={setAddress}
                address2={address2}
                setAddress2={setAddress2}
                zip={zip}
                setZip={setZip}
                state={state}
                setState={setState}
                city={city}
                setCtiy={setCtiy}
              />
            },
            {
              label: 'Payment',
              subtitle: '50%',
              name: 'step 2',
              content: <Payment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
            },
            {
              label: 'place Order',
              subtitle: '100%',
              name: 'step 3',
              content: PlaceOrder(),
            }
          ]
        }
      />
     
    </div>
  );
};

export default Checkouts;
