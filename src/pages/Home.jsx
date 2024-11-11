import AllProduct from '@/components/home/AllProduct'
import BestSaller from '@/components/home/BestSaller'
import Hero3D from '@/components/home/Hero3D'
import HeroBanner from '@/components/home/HeroBanner'
import NewArrival from '@/components/home/NewArrival'
import PromotionSection from '@/components/home/PromotionSection'
import React from 'react'

const Home = () => {
  return (
    <div className='mx-auto'>
      <Hero3D />
      {/* <HeroBanner /> */}
      {/* <PromotionSection /> */}
      {/* <BestSaller /> */}
      <NewArrival />
      <AllProduct />
    </div>
  )
}

export default Home