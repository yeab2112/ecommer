import React from 'react'
import { Link } from 'react-router-dom'

function Sidebare() {
  return (
    <div className='sidebare'>
      <div className='sidebareitem'> <Link to='/contactget'>Contacts</Link></div>
      <div className='sidebareitem'> <Link to='/addproduct'>Addproduct</Link></div>
      <div className='sidebareitem'><Link to='getcontact'>Contacts</Link> </div>
      <div className='sidebareitem'><Link to='getcontact'>Contacts</Link> </div>
      <div className='sidebareitem'> <Link to='getcontact'>Contacts</Link></div>

    </div>
  )
}

export default Sidebare
