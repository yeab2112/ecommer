import React from 'react'
import '../asett/homes.css'

function Homes() {
    return(
        <>
     <div className='home'>
     <section className="featured-products">
 <h2>Featured Products</h2>
 {/* Display featured products here (using a component or data) */}
 </section>

 <section className="new-arrivals">
 <h2>New Arrivals</h2>
 {/* Display new arrivals here */}
 </section>

 <section className="customer-testimonials">
 <h2>What Our Customers Say</h2>
 {/* Display testimonials or reviews */}
</section>
</div> 
 </>
  )
}

export default Homes