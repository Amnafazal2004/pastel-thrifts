'use client'
import React, { useContext, useState, useEffect } from 'react'
import userlogin from '@/Assets/userlogin.png';
import wishlist from '@/Assets/wishlist.png';
import Image from 'next/image';
import sparkle from '@/Assets/sparkle.png';
import bg1 from '@/Assets/bg1.png';
import bg22 from '@/Assets/bg22.png';
import thinkbox from '@/Assets/thinkbox.png';
import { ThriftContext } from '@/Context/ThriftContext';
import { useClerk, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {

  const { user } = useContext(ThriftContext);
  const { openSignIn } = useClerk();
 


  return (
    <>
      <div className="w-full bg-[#155076] py-[1px] font-[poppins] px-4 flex justify-between items-center text-[10px] font-outfit text-white justify-center ">
        Get the best experince, Shop Now
      </div>

      <div className="w-full relative bg-[#FAF6FB] px-6 flex justify-center items-center shadow-sm">

        {/* Centered logo + title */}
        <div className="flex py-2 items-center">
          {/* <Image src={logo1} alt="Clothing Logo" className="w-10 h-10" />  */}
          <div className="text-xl font-bold font-[Playfair_Display] text-[#155076]">
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
        <nav className="flex space-x-8 text-[14px] font-[poppins] text-white">
          {/* id lagao her page per jaker phir ye scroll kareyga */}
          <a href="/" className="hover:text-gray-400" >Home</a>
          <a href="#NewArrivals" className="hover:text-gray-400 scroll-smooth" >New Arrival</a>
          <a href="#About" className="hover:text-gray-400 scroll-smooth">About</a>
          <a href="#Blog" className="hover:text-gray-40 scroll-smooth">Blog</a>
          <a href="#Feedback" className="hover:text-gray-400 scroll-smooth">Feedback</a>
          <a href="#Contact" className="hover:text-gray-400 scroll-smooth">Contact</a>
        </nav>
      </div>

     <div className="relative w-full h-[450px] bg-[#ccdce8] overflow-hidden flex items-center justify-center">

        {/* Left Clothes Rack */}
        <div className="absolute left-10 top-28 flex flex-col items-center space-y-2">
          <Image src={bg1} alt="Clothes 1" className="w-[350px] h-auto" />
        </div>

        {/* Right Hanging Clothes */}
        <div className="absolute right-10 bottom-18 flex space-x-2">
          <Image src={bg22} alt="Hanging 1" className="w-[400px] h-auto" />
        </div>
     
  
  {/* Sparkle Image (top-left) */}
  <Image 
  src={sparkle}
  alt="sparkle"
  className="absolute left-[28%] top-[8%] w-[200px]"
/>

  {/* Right-side small box */}
<Image 
  src={thinkbox}
  alt="thinkbox"
  className="absolute right-[24%] top-[36%] w-[260px]"
/>


  {/* Text Section */}
  <div className="flex flex-col items-center text-center px-4 z-10">

    <h1 className="font-[Playfair_Display] text-white font-bold text-[70px] leading-[70px]">
      Style that fits
    </h1>

    <div className="flex font-[Playfair_Display] font-bold text-[70px] leading-[70px]">
      <span className="text-white pr-4">your</span>
      <span className="text-[#155076] italic">DREAM</span>
    </div>

    <p className="mt-3 font-[#155076] text-[#155076] text-sm tracking-wide">
      Discover the most unique and beloved finds at Pastel Thrift
    </p>

    {user ? (
      <Link href="/Panel/ShowProducts">
        <button className="mt-5 bg-[#155076] text-white text-sm px-12 py-2 rounded-full hover:text-gray-400 duration-200">
          Shop Now
        </button>
      </Link>
    ) : (
      <button
        onClick={openSignIn}
        className="mt-5 bg-[#155076] text-white text-sm px-12 py-2 rounded-full hover:bg-[#A3CCE9] duration-200"
      >
        Shop Now
      </button>
    )}

  </div>
</div>

     
    </>
  )
}

export default Header



// 'use client'
// import React, { useContext, useState, useEffect } from 'react'
// import userlogin from '@/Assets/userlogin.png';
// import wishlist from '@/Assets/wishlist.png';
// import Image from 'next/image';
// import heroimg from '@/Assets/heroimg.png';
// import bgimage from '@/Assets/bgimage.png';
// import logo from '@/Assets/logo.png';
// import logo1 from '@/Assets/logo1.png';
// import sparkle from '@/Assets/sparkle.png';
// import bg1 from '@/Assets/bg1.png';
// import bg2 from '@/Assets/bg2.png';
// import thinkbox from '@/Assets/thinkbox.png';
// import { ThriftContext } from '@/Context/ThriftContext';
// import { useClerk, UserButton } from '@clerk/nextjs';
// import Link from 'next/link';
// const Header = () => {
//   const { user } = useContext(ThriftContext)
//   const { openSignIn } = useClerk()

//   return (
//     <>
//       {/* Top Notification */}
//       <div className="w-full bg-[#155076] py-[1px] px-4 flex justify-center items-center text-[10px] text-white font-outfit">
//         Get the best experience, Shop Now
//       </div>

//       {/* Logo and icons */}
//       <div className="w-full relative bg-[#FAF6FB] px-6 flex justify-center items-center shadow-sm">
//         <div className="flex py-2 items-center">
//           <div className="text-xl font-bold font-[Playfair_Display] text-[#155076]">
//             Pastel Thrifts
//           </div>
//         </div>

//         <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center space-x-4">
//           {user ? <UserButton /> : <Image src={userlogin} onClick={openSignIn} alt="Login" className="w-5 h-5 cursor-pointer" />}
//           <Image src={wishlist} alt="Wishlist" className="w-5 h-5 cursor-pointer" />
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="w-full bg-[#155076] py-2 px-6 flex justify-center shadow-sm">
//         <nav className="flex space-x-8 text-[14px] font-[poppins] text-white">
//           <a href="/" className="hover:text-gray-400">Home</a>
//           <a href="#NewArrivals" className="hover:text-gray-400 scroll-smooth">New Arrival</a>
//           <a href="#About" className="hover:text-gray-400 scroll-smooth">About</a>
//           <a href="#Blog" className="hover:text-gray-400 scroll-smooth">Blog</a>
//           <a href="#Feedback" className="hover:text-gray-400 scroll-smooth">Feedback</a>
//           <a href="#Contact" className="hover:text-gray-400 scroll-smooth">Contact</a>
//         </nav>
//       </div>

//       {/* Hero Section */}
//       <div className="relative w-full h-[450px] bg-[#ccdce8] overflow-hidden flex items-center justify-center">

//         {/* Left Clothes Rack */}
//         <div className="absolute left-10 bottom-10 flex flex-col items-center space-y-2">
//           <Image src={bg1} alt="Clothes 1" className="w-20 h-auto" />
//         </div>

//         {/* Right Hanging Clothes */}
//         <div className="absolute right-10 top-10 flex space-x-2">
//           <Image src={bg2} alt="Hanging 1" className="w-20 h-auto" />
//         </div>

//         {/* Center Text */}
//         <div className="flex flex-col items-center text-center px-4 z-10">
//           <h1 className="font-[Playfair_Display] text-[#155076] font-bold text-[70px] leading-[70px]">
//             Style that fits
//           </h1>
//           <div className="flex font-[Playfair_Display] font-bold text-[70px] leading-[70px]">
//             <span className="text-[#155076] pr-4">your</span>
//             <span className="text-[#155076] italic">DREAM</span>
//           </div>
//           <p className="mt-3 text-[#155076] text-sm tracking-wide">
//             Discover the most unique and beloved finds at Pastel Thrift
//           </p>

//           {user ? (
//             <Link href="/Panel/ShowProducts">
//               <button className="mt-5 bg-[#155076] text-white text-sm px-12 py-2 rounded-full hover:text-gray-400 duration-200">
//                 Shop Now
//               </button>
//             </Link>
//           ) : (
//             <button
//               onClick={openSignIn}
//               className="mt-5 bg-[#155076] text-white text-sm px-12 py-2 rounded-full hover:bg-[#A3CCE9] duration-200"
//             >
//               Shop Now
//             </button>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default Header



























