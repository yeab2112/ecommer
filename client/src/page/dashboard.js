import React from "react";
import  '../asett/dashboard.css'
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';
import { AuthContext } from "../App";
import { useContext } from "react";

const Dashboard = () => {
  const {user}=useContext(AuthContext)

  return (

    <div className="admin-dashboard">
           {user && <> 

      <aside className="sidebar">

        <ul>
          <li>
            <Link to="/admin/contactget">Contact Get</Link> {/* Update the label */}
          </li>
          <li>
            <Link to="/admin/addproduct">Add Product</Link>  {/* Correct spelling */}
          </li>
          <li>
            <Link to="/admin/shop">Products</Link> {/* Update the label */}
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li> 
        </ul>
      </aside>

      <main className="content">
        <Outlet />  {/*  Make sure Outlet is inside the main section */}
      </main>
     </> }

    </div>
    
  );
};

export default Dashboard