// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
      <ShopContextProvider>
         <App />
      </ShopContextProvider>
   </BrowserRouter>

);

