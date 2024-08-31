import { createContext, useReducer } from 'react';
 
const cartReducer = (state, action) => {
  switch (action.type) {
     case 'add':
    //  Check if the product already exists in the cart
     const existingProductIndex = state.findIndex(item => item._id === action.product._id);
     if (existingProductIndex !== -1) {
     // If it exists, increase the quantity
     return state.map((item, index) =>
     index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
     );
     }
    //  If it doesn't exist, add it to the cart with quantity 1
     return [...state, { ...action.product, quantity: 1}];
    
     case 'Remove':
     return state.filter(p => p._id !== action._id);
    
     case 'increase':
     return state.map(item =>
     item._id === action._id ? { ...item, quantity: item.quantity + 1 } : item
     );
    
     case 'decrease':
     return state.map(item =>
     item._id === action._id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
     );
    
     default:
     return state; 
     }
};

const cartcontext = createContext();

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <cartcontext.Provider value={{ cart, dispatch }}>
      {children}
    </cartcontext.Provider>
  );
};

export { cartcontext, CartProvider };
