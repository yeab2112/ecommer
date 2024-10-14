import React, { useContext } from 'react';
import '../asett/nav.css';
import Swal from "sweetalert2";
import { BsCart } from 'react-icons/bs';
import withReactContent from "sweetalert2-react-content";
import { Link, useNavigate } from 'react-router-dom';
import { cartcontext } from '../component/contextprovide.js';
import { AuthContext } from '../App';
import { Auth } from '../App';

function Nav() {
  const { user, setUser } = useContext(AuthContext);
  const { role } = useContext(Auth);
  const { cart } = useContext(cartcontext);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleLogout = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You want to Exit!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        setUser(null);
        navigate("/");
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          ECOMMERS
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            {user ? (
              <>
                {role === "admin" ? (
                  <li className="nav-item">
                    <Link to="/" className="nav-link">{user.name}</Link>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to="/shop" className="nav-link">Shop</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/contact" className="nav-link">Contact Us</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/cart" className="nav-link">
                        <BsCart /> {cart?.length || 0}
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <Link to="/" onClick={handleLogout} className="nav-link">Logout</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
