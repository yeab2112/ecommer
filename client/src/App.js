import React, { createContext, useEffect, useState } from 'react';
import Home from './page/homs';
import Login from './page/login';
import Register from './page/rigster';
import About from './page/about';
import Nav from './component/nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify"
import Contact from './page/contact';
import Footer from './page/footer';
import Shop from './page/shop';
import Cart from './page/cart';
import Logout from './page/logout';
import 'react-toastify/dist/ReactToastify.min.css'
import Addproduct from './page/addproduct';
import EditProduct from './page/edit'
import Dashboard from './page/dashboard.js';
import  AdminOrderSummary from './page/orderSummry.js'
import axios from 'axios';
import ProductDetails from './page/productdetial.js'
import Contactget from './page/contactget.js';
import Checkouts from './page/ckackouts.js';
import Payment from './page/Payment.js';
import Order from './page/order.js';
import Shipping from './page/shipping.js';
import Forgetpassword from './page/forgetpassword.js';
import ResetPassword from './page/reset.js';
export const AuthContext = createContext(null)
export const proq =createContext()
export const Auth = createContext(null)
function App() {
  const [user, setUser] = useState();
const[product,setproduct]=useState()
const[quantity,setQuantity]=useState()
  const [role, setRole] = useState();
  
  const verifyUser = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/verify', {
        headers:
          { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      
      if (res.data.success) {
        setUser(res.data.user);
        console.log(user)
      }
    }
    catch (error) {
      console.log({ error })
      console.error('Error fetching user data:', error);
    };
  }
  useEffect(() => {
    verifyUser()
  }, []);


  return (
    <div className="App">
      <ToastContainer />
      <AuthContext.Provider value={{ user, setUser,product,setproduct,quantity,setQuantity }}>
        <Auth.Provider value={{ role, setRole }}>
          <BrowserRouter>

            <Nav />
            <Routes>
              <Route path="/" element={
                <Home />
              } />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />s
              <Route path='/shop' element={<Shop role={role} />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Register />} />

              <Route path='/logout' element={<Logout />} />

              <Route path="/admin" element={<Dashboard />}>
                <Route path="addproduct" element={<Addproduct />} />
                <Route path="contactget" element={<Contactget />} />
                <Route path="shop" element={<Shop />} />
                <Route path="orders" element={ <AdminOrderSummary 
                orderId="647538f9284f453d96132145" />}/>
              </Route>
              <Route path="/products/edit/:productId" element={<EditProduct />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/checkouts" element={<Checkouts />} /> 
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<Payment />} />
          <Route path='/shiping' element={<Shipping/>}/>
          <Route path='/forget-password' element={<Forgetpassword/>}/>
          <Route path="/reset-password/:token" element={ResetPassword} />

            </Routes>
            <Footer />
          </BrowserRouter>
        </Auth.Provider>
      </AuthContext.Provider>
    </div>
  );
}
export default App;
