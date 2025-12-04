'use client'
import React, { useContext, useState, useEffect } from 'react'
import userlogin from '@/Assets/userlogin.png';
import wishlist from '@/Assets/wishlist.png';
import Image from 'next/image';
import heroimg from '@/Assets/heroimg.png';
import bgimage from '@/Assets/bgimage.png';
import logo from '@/Assets/logo.png';
import logo1 from '@/Assets/logo1.png';
import { ThriftContext } from '@/Context/ThriftContext';
import { useClerk, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {

  const { user } = useContext(ThriftContext);
  const { openSignIn } = useClerk();
 


  return (
    <>
      <div className="w-full bg-[#155076] py-[1px] px-4 flex justify-between items-center text-[10px] font-outfit text-white justify-center ">
        Get the best experince, Shop Now
      </div>

      <div className="w-full relative bg-[#FAF6FB] px-6 flex justify-center items-center shadow-sm">

        {/* Centered logo + title */}
        <div className="flex py-2 items-center">
          {/* <Image src={logo1} alt="Clothing Logo" className="w-10 h-10" />  */}
          <div className="text-xl font-bold font-[Playfair_Display] text-black">
            Pastel Thrifts
          </div>
        </div>

        {/* Right-side icons */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center space-x-4">
          {user ?
            <>
              {/*  ye likhtay agar hamain user ne jo bhi profile pic lagai hai wo show kerni hoti  */}
              <UserButton>
                {/* isse wo page bhi is drop down main add hojata */}
                {/* <UserButton.MenuItems>
        <UserButton.Action label='Your orders' labelIcon={orderhistory} onClick={()=> Router.push('/yourorders')}/>
      </UserButton.MenuItems>   */}
              </UserButton>
            </>

            :
            <Image src={userlogin} onClick={openSignIn} alt="Login" className="w-5 h-5" />


          }


          <Image src={wishlist} alt="Cart" className="w-5 h-5" />
        </div>
      </div>

      <div className="w-full bg-[#155076] py-2 px-6 flex justify-center shadow-sm">
        <nav className="flex space-x-8 text-[14px] font-outfit text-white">
          {/* id lagao her page per jaker phir ye scroll kareyga */}
          <a href="/" className="hover:text-gray-400" >Home</a>
          <a href="#NewArrivals" className="hover:text-gray-400 scroll-smooth" >New Arrival</a>
          <a href="#Shop" className="hover:text-gray-400 scroll-smooth">Shop</a>
          <a href="#About" className="hover:text-gray-400 scroll-smooth">About</a>
          <a href="#Blog" className="hover:text-gray-40 scroll-smooth">Blog</a>
          <a href="#Feedback" className="hover:text-gray-400 scroll-smooth">Feedback</a>
          <a href="#Contact" className="hover:text-gray-400 scroll-smooth">Contact</a>
        </nav>
      </div>

      <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden">
        {/* Banner image */}
        <Image
          src={bgimage}
          alt="Banner"
          fill
          className="object-cover"
          priority
        />

        {/* Soft blue tint blending with image */}
        <div className="absolute inset-0 z-10 bg-[#00000040] mix-blend-multiply opacity-60"></div>

        {/* Text content */}
        <div className="absolute z-10 w-full h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-8xl md:text-4xl text-white font-bold font-[Playfair_Display] drop-shadow">
            Style that tells your story
          </h1>
          <p className="mt-2 text-sm  text-white drop-shadow">
            Discover unique finds at Pastel Thrift
          </p>
          <Link href={'/Panel/ShowProducts'}>
            <button className="mt-4 bg-[#155076] text-white text-sm px-12 py-2 rounded-full hover:bg-[#A3CCE9]">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Header


























