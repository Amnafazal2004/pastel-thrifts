import React from 'react'
import Image from 'next/image'
import aboutimg from '@/Assets/aboutimg.png';

const Aboutus = () => {
  return (
    <>
    <div id="About" className="w-full px-6 py-16 bg-[#A3CCE9]">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">

    {/* LEFT: Text content */}
    <div className="w-full md:w-1/2">
      
      {/* Curved large bold heading */}
      <h2 className="text-[40px] md:text-[60px] font-extrabold font-[playfair_display] text-[#2B5E84] [text-wrap:balance]">
        <span className="block">ABOUT OUR</span>
        <span className="block">THRIFT STORY</span>
      </h2>

      <p className="mt-4 text-sm md:text-base text-gray-600">
        At Pastel Thrift, we believe that fashion should be kind — to the planet, to your wallet, and to your unique style. Our carefully curated collection of pre-loved pieces tells stories of sustainability, creativity, and individuality. Join us in redefining style through conscious choices and timeless finds.
      </p>

    </div>

    {/* RIGHT: Image */}
    <div className="w-full md:w-1/2">
      <div className="overflow-hidden rounded-3xl shadow-md">
        <Image 
          src={aboutimg} 
          alt="About Pastel Thrift"
          className="w-full h-100 object-cover"
        />
      </div>
    </div>

  </div>
</div>

    </>
  )
}

export default Aboutus
