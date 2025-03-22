import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebare";
 import Add from "./ pages/Add";
 import List from "./ pages/List";
 import Orders from "./ pages/Orders";
import { Routes, Route } from 'react-router-dom';  // Import Routes and Route
import React, { useState, Navigate ,useEffect } from 'react';
import Login from "./Components/Login";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      setIsAuthenticated(true); // Set authenticated to true if token exists
    }
  }, []);

  // Handle login (set token and update state)
  const handleLogin = (token) => {
    localStorage.setItem('token', token); // Store token in localStorage
    setIsAuthenticated(true); // Update authentication state
  };

  const handleLogout = () => {
    console.log("Logout triggered");
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };
  
  return (
    <div className="flex flex-col h-screen">
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Navbar onLogout={handleLogout} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-100">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/order" element={<Orders />} />
              </Routes>
            </main>
          </div>
        </>
      )}
    </div>
  );
  
  ;
}

export default App;