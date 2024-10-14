import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { cartcontext } from '../component/contextprovide.js';
import '../asett/cart.css';
import { AuthContext } from '../App.js';
import { Link } from 'react-router-dom';
import { Row, Col, Card, ListGroup } from 'react-bootstrap'; 

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
          <p className='text-center'>Your cart is empty.</p>
        ) : (
          <>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  {cart.map(product => (
                    <ListGroup.Item key={product._id} className='d-flex justify-content-between align-items-center'>
                      <div className='d-flex align-items-center'>
                        <img src={product.image} alt={product.name} className="image" style={{ width: '50px', height: '50px' }} />
                        <div className='ms-3'>
                        <h6 className="name">{product.name}</h6>
                          <p className="price">Price: ${product.price}</p>
                        </div>
                      </div>
                      <div className='quantity-controls'>
                        <button className='quantity-button'
                          onClick={() => decrease(product._id)}>-</button>
                        <span>{product.quantity}</span>
                        <button className='quantity-button'
                          onClick={() => increase(product._id)}>+</button>
                        <button className='remove-button'
                          onClick={() => dispatch({ type: "Remove", _id: product._id })}>
                          Remove
                        </button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Cart Summary</Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        Total Items: {totalItems()}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Total Price: ${totalPrice().toFixed(2)}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Link to="/checkouts">
                          <button className=' btn-primary'
                            onClick={handleCheckout} >Check Out</button>
                        </Link>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
    </div>
  );
}

export default Cart;
