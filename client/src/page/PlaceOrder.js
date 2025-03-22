import React, { useState, useContext } from 'react';
import { ShopContext } from "../context/ShopContext";

function PlaceOrder() {
  const { cart, currency, delivery_fee,navigate } = useContext(ShopContext);

  // State for handling delivery information
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState('');

  // Handle input changes for delivery information
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Final total price (subtotal + delivery fee)
  const finalTotal = totalPrice + delivery_fee;

  // Handle order confirmation
  const handleOrderConfirmation = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    
    // Save the order details to localStorage
    const orderDetails = {
      deliveryInfo,
      paymentMethod,
      cart, // Store cart items as well to display in the confirmation
    };
    
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails)); // Save to localStorage

    // Redirect to the order confirmation page
    navigate('/order-confirmation');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Place Your Order</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Delivery Information */}
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
          <div className="space-y-4">
            {/* First Name and Last Name Side by Side */}
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={deliveryInfo.firstName}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={deliveryInfo.lastName}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={deliveryInfo.email}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md"
              />
            </div>

            {/* Street Address */}
            <div className="mb-4">
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={deliveryInfo.address}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md"
              />
            </div>

            {/* City and State Side by Side */}
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={deliveryInfo.city}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={deliveryInfo.state}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md"
              />
            </div>

            {/* Zip Code and Country Side by Side */}
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={deliveryInfo.zipCode}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={deliveryInfo.country}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={deliveryInfo.phone}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary and Payment */}
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {/* Order Items Summary */}
          <div className="space-y-4 mb-6">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span>{item.name} (x{item.quantity})</span>
                <span>{currency}{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Total Price */}
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

          {/* Payment Method Selection */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Select Payment Method</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`w-1/2 p-2 rounded-md text-white ${paymentMethod === 'Cash on Delivery' ? 'bg-green-500' : 'bg-gray-500'}`}
              >
                Cash on Delivery
              </button>
              <button
                onClick={() => setPaymentMethod('Online Payment')}
                className={`w-1/2 p-2 rounded-md text-white ${paymentMethod === 'Online Payment' ? 'bg-green-500' : 'bg-gray-500'}`}
              >
                Online Payment
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate('/cart')} // Go back to the cart page
              className="bg-gray-500 text-white p-2 rounded-md w-1/3"
            >
              Go Back
            </button>
            <button
              onClick={handleOrderConfirmation} // Confirm the order and handle order placement
              className="bg-blue-500 text-white p-2 rounded-md w-1/3"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
