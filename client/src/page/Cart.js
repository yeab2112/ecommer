import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

function Cart() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, currency, delivery_fee,naviget } =
    useContext(ShopContext);

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border p-4 rounded-lg shadow-md"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                {/* Product Details */}
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-600">{currency}{item.price}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decreaseQuantity(item.id, item.size)}
                    className="bg-gray-300 p-2 rounded-md"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item.id, item.size)}
                    className="bg-gray-300 p-2 rounded-md"
                  >
                    <FaPlus />
                  </button>
                </div>

                {/* Remove Item Button */}
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-red-600 p-2"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-6 p-4 border rounded-lg shadow-md">
            <p className="text-lg font-medium">Subtotal: {currency}{totalPrice.toFixed(2)}</p>
            <p className="text-gray-600">Delivery Fee: {currency}{delivery_fee.toFixed(2)}</p>
            <hr className="my-2" />
            <p className="text-xl font-semibold">
              Total: {currency}{(totalPrice + delivery_fee).toFixed(2)}
            </p>
            <button
      onClick={() => naviget('/place-order')}  
      className="mt-4 bg-blue-500 text-white p-2 rounded-md"
    >
      Proceed to Checkout
    </button>           
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
