import React from 'react'
import Image from 'next/image'
import clothes3 from '@/Assets/clothes3.png';
import clothes4 from '@/Assets/clothes4.png';
import clothes1 from '@/Assets/clothes1.png';

const Aboutus = () => {
  return (
    <>
    <div id="About" className="w-full px-6 py-16 bg-white">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">

    {/* LEFT: Text content */}
    <div className="w-full md:w-1/2">
      
      {/* Curved large bold heading */}
      <h2 className="text-[40px] md:text-[40px] font-extrabold font-[playfair_display] text-[#155076] [text-wrap:balance]">
        <span className="block">ABOUT OUR</span>
        <span className="block">THRIFT STORY</span>
      </h2>

      <p className="mt-4 text-sm md:text-base font-[poppins]   text-gray-600">
        At Pastel Thrift, we believe that fashion should be kind — to the planet, to your wallet, and to your unique style. Our carefully curated collection of pre-loved pieces tells stories of sustainability, creativity, and individuality. Join us in redefining style through conscious choices and timeless finds.
      </p>

    </div>

    {/* RIGHT: Image */}
      {/* Right: Overlapping Polaroids */}
          <div className="relative flex justify-center md:justify-end">
            <div className="w-40 md:w-48 transform rotate-[-5deg] shadow-lg bg-white p-1 rounded-lg relative z-10">
              <Image src={clothes3} alt="Pottery Class 1" className="rounded-md" />
             
            </div>
            <div className="w-40 md:w-48 transform rotate-[6deg] shadow-lg bg-white p-1 rounded-lg -ml-8 mt-8">
              <Image src={clothes4} alt="Pottery Class 2" className="rounded-md" />
            
            </div>
                     <div className="w-40 md:w-48 transform rotate-[7deg] shadow-lg bg-white p-1 rounded-lg -ml-8 mt-8">
              <Image src={clothes1} alt="Pottery Class 2" className="rounded-md" />
            
            </div>
          </div>

  </div>
</div>

    </>
  )
}

export default Aboutus

