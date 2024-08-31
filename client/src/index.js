// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './component/contextprovide.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <CartProvider>
    <App />
   </CartProvider>
);

