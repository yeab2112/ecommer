import React, { createContext, useEffect, useState, useCallback } from 'react';
import Home from './page/Home.js';
import AuthPage from './page/Login.js';
import About from './page/About.js';
import NavBar from './component/NavBar.js';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Contact from './page/Contact.js';
import Footer from './component/footer.js';
import Logout from './page/logout';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import Cart from './page/Cart.js';
import Product from './page/Product.js';
import Collection from './page/Collection.js';
import PlaceOrder from './page/PlaceOrder.js';
import Order from './page/Order.js';
import SearchBar from './component/searchBar.js';

export const AuthContext = createContext(null);
export const proq = createContext();
export const Auth = createContext(null);

function App() {
  const [user, setUser] = useState();

  const verifyUser = useCallback(async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/verify', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (res.data.success) {
        setUser(res.data.user);
        console.log(user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [user]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]); // Now it will be stable and won't trigger the warning

  return (
    <div className="App">
      <ToastContainer />
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/ccarts' element={<Cart />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/order-confirmation' element={<Order />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/login' element={<AuthPage />} />
        <Route path='/signup' element={<AuthPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
