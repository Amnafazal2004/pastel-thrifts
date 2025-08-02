'use client'
import React, { useContext, useState } from 'react'
import userlogin from '@/Assets/userlogin.png';
import wishlist from '@/Assets/wishlist.png';
import Image from 'next/image';
import clothes from '@/Assets/clothes.png';
import heroimg from '@/Assets/heroimg.png';
import { ThriftContext } from '@/Context/ThriftContext';
import { useClerk, UserButton } from '@clerk/nextjs';




const Header = () => {

  const {showloginpopup,setshowloginpopup,user} = useContext(ThriftContext);
  const {openSignIn} = useClerk();

  return (
    <>
<div className="w-full bg-[#3c5e78] py-[1px] px-4 flex justify-between items-center text-xs font-outfit text-white justify-center ">
  Get the best experince, Shop Now
</div>

     <div className="w-full relative bg-[#FAF6FB] py-4 px-6 flex justify-center items-center shadow-sm">
      
      {/* Centered logo + title */}
      <div className="flex items-center space-x-2">
        <Image src={clothes} alt="Clothing Logo" className="w-12 h-12" />
        <div className="text-3xl font-bold font-[Playfair_Display] text-black">
          Pastel Thrift
        </div>
      </div>

      {/* Right-side icons */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center space-x-4">    
    {user? 
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
        <Image src={userlogin} onClick={openSignIn}  alt="Login" className="w-5 h-5" />
       
       
    }


        <Image src={wishlist} alt="Cart" className="w-5 h-5" />
      </div>
    </div>

<div className="w-full bg-[#3c5e78] py-2 px-6 flex justify-center shadow-sm">
  <div className="flex space-x-8 text-[14px] font-outfit text-white">
    {/* id lagao her page per jaker phir ye scroll kareyga */}
    <a href="/"  className="hover:text-gray-400" >Home</a>
    <a href="#NewArrivals"  className= "hover:text-gray-400 scroll-smooth" >New Arrival</a>
    <a href="#Shop" className="hover:text-gray-400 scroll-smooth">Shop</a>
    <a href="#About"  className="hover:text-gray-400 scroll-smooth">About</a>
    <a href="#Blog"   className="hover:text-gray-40 scroll-smooth">Blog</a>
    <a href="#Feedback"  className="hover:text-gray-400 scroll-smooth">Feedback</a>
    <a href="#Contact"  className= "hover:text-gray-400 scroll-smooth">Contact</a>
  </div>
</div>

 <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden">
      {/* Banner image */}
      <Image 
        src={heroimg} 
        alt="Banner"
        fill
        className="object-cover"
        priority
      />

      {/* Soft blue tint blending with image */}
      <div className="absolute inset-0 bg-[#A3CCE9] mix-blend-multiply opacity-60"></div>

      {/* Text content */}
      <div className="absolute z-10 w-full h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl md:text-6xl font-bold font-[Playfair_Display] text-white drop-shadow">
          Style that tells your story
        </h1>
        <p className="mt-2 text-sm md:text-base text-white drop-shadow">
          Discover unique finds at Pastel Thrift
        </p>
        <button className="mt-4 bg-[#2b5e84] text-white text-sm px-6 py-2 rounded-full hover:bg-[#A3CCE9]">
          Shop Now
        </button>
      </div>
    </div>

 
    </>
  )
}

export default Header
