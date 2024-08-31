import React, { useContext } from 'react'
import '../asett/nav.css'
import Swal from "sweetalert2";
import  {BsCart} from 'react-icons/bs'
import withReactContent from "sweetalert2-react-content";
import { Link, useNavigate } from 'react-router-dom';
import { cartcontext } from '../component/contextprovide.js';

import { AuthContext } from '../App'
import { Auth } from '../App';
function Nav() {
  const { user, setUser } = useContext(AuthContext)
  const { role } = useContext(Auth)
   const { cart } = useContext(cartcontext)
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  
  console.log({user})
  const handleLogout = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You want to Exit!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token'); // Clear the token
          setUser(null); // Update the user state in the context
          navigate("/");
        }
      });
  };

  return (
    <div className='nav'>
      <div className='navbar-left'>
        < Link to="/" className='navbrand' >
          ECOMMERS
        </Link>
      </div>
      <div className='.navbar-right'>
      <Link to="/about" className='nave-link'>About</Link>
        {user ? <>
          {role === "admin" ? <>
            <Link to="/" className='nave-link'> {user.name}</Link>
          </> : <>
            <Link to="/shop" className='nave-link'>Shop</Link>
            <Link to="/contact" className='nave-link'>Contact Us</Link>
            <Link to="/cart" className='nave-link '><BsCart/> {(cart||[]).length}</Link>

          </>}
          <Link to="/" onClick={handleLogout} className='nave-link'>Logout</Link>

        </>
          :
          <>
            <Link to="/login" className='nave-link '>login</Link>

          </>
        }

      </div>
      {/* <div>
        <button className="button">Shop Now</button>

      </div> */}
    </div>
  )
}
export default Nav