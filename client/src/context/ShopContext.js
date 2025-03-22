import React, { createContext, useState } from "react";
import { products } from "../asset/asset";
import { useNavigate } from 'react-router-dom';
// Create the context
export const ShopContext = createContext();

function ShopContextProvider({ children }) {
  // Shared states and constants
  const currency = "$";
  const delivery_fee = 10;
  const naviget=useNavigate()

  const [search, setSearch] = useState(""); // Search query state
  const [showSearch, setShowSearch] = useState(false); // Controls visibility of the search bar
  const [cart, setCart] = useState([]); // Cart state

  // Function to add an item to the cart (increment quantity if exists)
  const addToCart = (productId, size) => {
    const product = products.find((item) => item.id === productId);
    if (product) {
      const existingItemIndex = cart.findIndex(
        (item) => item.id === productId && item.size === size
      );

      if (existingItemIndex > -1) {
        // Update quantity if the item exists
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += 1;
        setCart(updatedCart);
      } else {
        // Add new item to the cart
        setCart([...cart, { ...product, size, quantity: 1 }]);
      }
    }
  };

  // Function to decrease quantity (remove if quantity = 1)
  const decreaseQuantity = (productId, size) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove if quantity reaches 0
    );
  };

  // Function to remove item completely
  const removeFromCart = (productId, size) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === productId && item.size === size)));
  };

  // Values provided by the context
  const value = {
    delivery_fee,
    products,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cart, // Expose cart state
    addToCart, // Expose addToCart function
    decreaseQuantity, // Expose decreaseQuantity function
    removeFromCart, // Expose removeFromCart function
    naviget
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export default ShopContextProvider;
