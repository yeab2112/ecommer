import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from "../context/ShopContext";

function Order() {
  const { cart, currency, delivery_fee ,navigate} = useContext(ShopContext);

  // State to store order confirmation details (from PlaceOrder)
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Get order details from localStorage (or context if needed)
    const savedOrderDetails = JSON.parse(localStorage.getItem('orderDetails')); // Retrieve from localStorage
    if (!savedOrderDetails) {
      // If no order details are found, navigate back to the cart page
      navigate('/cart');
    } else {
      setOrderDetails(savedOrderDetails);
    }
  }, [navigate]);

  if (!orderDetails) {
    return <div>Loading...</div>; // Show loading while fetching order details
  }

  const { deliveryInfo, paymentMethod } = orderDetails;

  // Calculate the total price of the items in the cart
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = totalPrice + delivery_fee;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Order Confirmation</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Delivery Information */}
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
          <p><strong>Name:</strong> {deliveryInfo.firstName} {deliveryInfo.lastName}</p>
          <p><strong>Email:</strong> {deliveryInfo.email}</p>
          <p><strong>Address:</strong> {deliveryInfo.address}, {deliveryInfo.city}, {deliveryInfo.state}, {deliveryInfo.zipCode}, {deliveryInfo.country}</p>
          <p><strong>Phone:</strong> {deliveryInfo.phone}</p>
        </div>

        {/* Right Column: Order Summary */}
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span>{item.name} (x{item.quantity})</span>
                <span>{currency}{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-semibold text-lg">
            <span>Subtotal</span>
            <span>{currency}{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span>Delivery Fee</span>
            <span>{currency}{delivery_fee.toFixed(2)}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-xl">
            <span>Total</span>
            <span>{currency}{finalTotal.toFixed(2)}</span>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            <p>{paymentMethod}</p>
          </div>
        </div>
      </div>

      {/* Order Confirmation Message */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-green-600">Thank you for your order!</h2>
        <p className="text-lg mt-4">Your order has been successfully placed. You will receive an email confirmation shortly.</p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
}

export default Order;
