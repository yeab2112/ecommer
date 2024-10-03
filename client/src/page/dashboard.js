import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "react-bootstrap";
import '../asett/dashboard.css'
const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container-fluid">
      {user && (
        <Row>
          {/* Sidebar */}
          <Col md={3} lg={2} className="  sidebar mt-2">
            <ul className="nav flex-column p-3"> 
              <li className="nav-item mb-2">
                <Link to="/admin/contactget" className="nav-link">Contact Get</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/admin/addproduct" className="nav-link">Add Product</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/admin/shop" className="nav-link">Products</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/admin/orders" className="nav-link">Orders</Link>
              </li>
            </ul>
          </Col>

          {/* Main Content */}
          <Col md={9} lg={10} className="p-2">
            <Outlet />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Dashboard;
