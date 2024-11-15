import React from 'react'
import AdImg from "@/assets/image/endmonth.png";

const PromotionSection = () => {
  return (
    <div className="w-[1440px] h-[400px] mx-auto my-2 flex items-center bg-blue-400">
      <img
        src={AdImg}
        alt="Ad"
        className="w-full h-full object-contain"
      />

    </div>
  )
}

export default PromotionSection