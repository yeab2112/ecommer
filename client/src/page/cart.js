import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { cartcontext } from '../component/contextprovide.js';
import '../asett/productdetail.css';
import { AuthContext } from '../App.js';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, dispatch } = useContext(cartcontext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleCheckout = async () => {
    try {
      await Promise.all(cart.map(product => {
        const totalItem = product.quantity;
        const totalPrice = product.quantity * product.price;

        return axios.post('http://127.0.0.1:5000/api/cart', {
          userId:user._id,
          productId: product._id,
          quantity: totalItem,
          totalPrice: totalPrice,
        });
      }));
      alert('Checkout successful!');
      dispatch({ type: 'CLEAR_CART' }); 
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('There was an error during checkout.');
    }
  };

  const increase = (_id) => {
    const index = cart.findIndex(p => p._id === _id);
    if (index !== -1 && cart[index].quantity < 10) {
      dispatch({ type: "increase", _id });
    }
  };

  const decrease = (_id) => {
    const index = cart.findIndex(p => p._id === _id);
    if (index !== -1 && cart[index].quantity > 1) {
      dispatch({ type: "decrease", _id });
    }
  };

  const totalPrice = () => {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  const totalItems = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className='product-detail-cart'>
          {cart.map(product => (
            <div key={product._id} className='product-detail-cart'>
              <img src={product.image} alt={product.name} className="image" />
              <div>
                <h2 className="name">{product.name}</h2>
                <p className="price">Price: ${product.price}</p>
                <button className='remove-button' 
                  onClick={() => dispatch({ type: "Remove", _id: product._id })}>
                  Remove
                </button>
              </div>
              <div className='quantity-controls'>
                <button className='quantity-button' 
                  onClick={() => decrease(product._id)}>-</button>
                <span>{product.quantity}</span>
                <button className='quantity-button'
                  onClick={() => increase(product._id)}>+</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className='total-cart'>
        <h4>Total Items: {totalItems()}</h4> 
        <h4>Total Price: ${totalPrice().toFixed(2)}</h4>
        <Link to="/checkouts">
          <button className='remove-button'
          onClick={handleCheckout} >Check Out</button>
        </Link>
      
      </div>
    </div>
  );
}

export default Cart;
