import React from 'react'
import Hero from '../component/Hero'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'
import OurPolice from '../component/OurPolice'
import NewsLeterBox from '../component/NewsLeterBox'

function Home() {
    return(
        <>
<Hero/>   
  <LatestCollection/> 
<BestSeller/>
<OurPolice/>
<NewsLeterBox/>
 </>
  )
}

export default Home