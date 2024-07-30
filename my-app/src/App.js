import React from 'react';
import './App.css';
import Home from './page/homs';
// import Login from './page/login';
// import Register from './page/rigster';
import About from './page/about';
import Nav from './component/nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {ToastContainer, toastContainer} from "react-toastify"
import Contact from './page/contact';
import Footer from './page/footer';


function App() {
  return (
     <div className="App">
            <ToastContainer/>
            <BrowserRouter>
            <Nav/>
            <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/" element={<Login />} /> */}

             <Route path="/about" element={<About />} />
             {/* <Route path="/signup" element={<Register />} /> */}
              <Route path="/contact" element={<Contact />} />
            </Routes>
                <Footer/>
            </BrowserRouter>
    

       </div>
  );
}

export default App;
