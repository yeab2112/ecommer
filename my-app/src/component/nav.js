import React from 'react'
import '../asett/nav.css'
import { Link } from 'react-router-dom'
function Nav() {
  return (
    <div className='nav'>
      <div className='navbar-left'>
        < Link to="/" className='navbrand' >
        PORTFOLIO'S       
         </Link>
      </div>
      <div className='.navbar-right'>
        <Link to="/about" className='nave-link'>About</Link>
        {/* <Link to="/login" className='nave-link '>login</Link>
        <Link to="/signup" className='nave-link'>register</Link> */}
        <Link to="/contact" className='nave-link'>Contact</Link>

      </div>

    </div>
  )
}
export default Nav