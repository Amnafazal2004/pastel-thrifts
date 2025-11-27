import React from 'react'
import Image from 'next/image'
import extraImg from '@/Assets/extraImg.png';
import extraImg2 from '@/Assets/extraImg2.png';
import extraimg3 from '@/Assets/extraimg3.png';

const Extra = () => {
  return (
    <>
      <div id="Blog" className="relative w-full py-16 px-6 bg-[#ccdce8] overflow-hidden">

        /* {/* SINGLE BIG background text */}
        <h2 className="absolute top-18 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[50px] md:text-[80px] lg:text-[70px] opacity-70 font-bold text-[#2b5e84] text-center select-none leading-none whitespace-nowrap">
          SUSTAINABLE VINTAGE THRIFT STYLE
        </h2>

         {/* SINGLE BIG background text */}
        <h2 className="absolute top-45 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[50px] md:text-[80px] lg:text-[70px] opacity-70 font-bold text-[#2b5e84] text-center select-none leading-none whitespace-nowrap">
          SUSTAINABLE VINTAGE THRIFT STYLE
        </h2>

         {/* SINGLE BIG background text */}
        <h2 className="absolute top-70 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[50px] md:text-[80px] lg:text-[70px] opacity-70 font-bold text-[#2b5e84] text-center select-none leading-none whitespace-nowrap">
          SUSTAINABLE VINTAGE THRIFT STYLE
        </h2>

         {/* SINGLE BIG background text */}
        <h2 className="absolute top-100 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[50px] md:text-[80px] lg:text-[70px] opacity-70 font-bold text-[#2b5e84] text-center select-none leading-none whitespace-nowrap">
          SUSTAINABLE VINTAGE THRIFT STYLE
        </h2> */

        /* {/* Content over background text */}
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
           */
          {/* Left flashcard image */}
          <div className=" shadow-md overflow-hidden p-1 w-full md:w-1/4">
            <Image 
              src={extraImg}
              alt="Left"
              className="w-full h-60 object-cover "
            />
          </div>

          {/* Center blog card */}
          <div className="relative shadow-lg overflow-hidden p-1 w-full md:w-1/2">
            <div className="relative">
              <Image 
                src={extraimg3}
                alt="Center"
                className="w-full h-60 md:h-80 object-cover "
              />
              <div className="absolute inset-0 bg-[#2B5E84] opacity-50 rounded-3xl"></div>

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                <h3 className="text-xl md:text-2xl font-bold font-[playfair_display] text-white drop-shadow-md mb-2">
                  Explore Our Blog
                </h3>
                <p className="text-xs md:text-sm text-white drop-shadow-md mb-3 max-w-sm">
                  Our blog is where fashion meets purpose. Discover thrift finds, creative styling tips, and sustainable choices that reflect your values.
                </p>
                <button className="bg-white text-[#2B5E84] text-xs md:text-sm py-1.5 px-6 rounded-full hover:bg-[#3c5e78]  hover:text-white transition">
                  Read More
                </button>
              </div>
            </div>
          </div>

          {/* Right flashcard image */}
          <div className=" shadow-md overflow-hidden p-1 w-full md:w-1/4">
            <Image 
              src={extraImg2}
              alt="Right"
              className="w-full h-60 object-cover "
            />
          </div>

        {/* </div> */}
      </div>
    </>
  )
}

export default Extra



