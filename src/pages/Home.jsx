import AllProduct from '@/components/home/AllProduct'
import BestSaller from '@/components/home/BestSaller'
import HeroBanner from '@/components/home/HeroBanner'
import NewArrival from '@/components/home/NewArrival'
import PromotionSection from '@/components/home/PromotionSection'
import React from 'react'

const Home = () => {
  return (
    <div className=''>
      <HeroBanner />
      {/* <PromotionSection /> */}
      {/* <BestSaller /> */}
      <NewArrival />
      <AllProduct />
    </div>
  )
}

export default Home