import React, { useContext, useEffect } from 'react';
// import axios from 'axios';
import { cartcontext } from '../component/contextprovide.js';
import '../asett/productdetail.css';
import { Link } from 'react-router-dom';
// import { AuthContext } from '../App.js';

function Cart() {
  const { cart, dispatch } = useContext(cartcontext);
  // const { user} = useContext(AuthContext);
  // Save cart to local storage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // const handleAddToCart = async () => {
    
  //       await Promise.all(cart.map(product => {
  //           const totalItem = product.quantity; // Total quantity for this product
  //           const totalPrice = product.quantity * product.price; // Total price for this product
            
  //           return axios.post('http://127.0.0.1:5000/api/cart', {
  //               userId: user?._id,
  //               productId: product._id,
  //               totalItem: totalItem,
  //               totalPrice: totalPrice,
  //           });
  //       }))};
      
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
          <button className='remove-button' >Check Out</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
