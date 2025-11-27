import React from 'react'
import Image from 'next/image'
import wishlist from '@/Assets/wishlist.png';
import add from '@/Assets/add.png';
import msgicon from '@/Assets/msgicon.png';
import userlogin from '@/Assets/userlogin.png';
import Link from 'next/link';


const Sidebar = () => {
  return (
    // used flex-shrink-0 so the sidebar does not get squished
   <div className="min-h-screen flex-shrink-0 w-52 bg-[#ccdce8] rounded-xl text-black px-6 pt-8 shadow-lg flex flex-col">

  {/* Sidebar Heading */}
  <Link href='/' className="text-2xl font-[playfair_display] font-bold mb-8">Pastel Thrifts</Link>

  {/* Subheading */}
  <h2 className="text-[10px] uppercase px-10 text-gray-700 tracking-widest mb-6">Main Menu</h2>

  {/* Menu Items */}
  <nav className="flex flex-col gap-4">

        {/* shop now */}
    <Link href='/Panel/ShowProducts'
     className="flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-[#155076] hover:text-[#e2ebf3]  transition-all cursor-pointer group">
      {/* <Image src={wishlist} alt="Wishlist" width={20} height={20} className="group-hover:scale-105" /> */}
      <span className="text-[12px] font-[playfair_display] font-semibold ">Shop Now</span>
    </Link>
    
    {/* Add Product */}
    <Link href='/Panel/addProduct' className="flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-[#155076] hover:text-[#e2ebf3] transition-all cursor-pointer group">
      {/* <Image src={add} alt="Add Product" width={22} height={22} className="group-hover:scale-105" /> */}
      <span className="text-[12px] font-[playfair_display] font-semibold ">Add Product</span>
    </Link>

    {/* Messages */}
    <Link href='/Panel/allmessages' className="flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-[#155076] hover:text-[#e2ebf3]  transition-all cursor-pointer group">
      {/* <Image src={msgicon} alt="Messages" width={22} height={22} className="group-hover:scale-105" /> */}
      <span className="text-[12px]  font-[playfair_display] font-semibold">Messages</span>
    </Link>


    {/* Dashboard */}
    <Link href='/Panel/Dashboard' className="flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-[#155076] hover:text-[#e2ebf3]  transition-all cursor-pointer group">
      {/* <Image src={userlogin} alt="Dashboard" width={22} height={22} className="group-hover:scale-105" /> */}
      <span className="text-[12px] font-[playfair_display] font-semibold ">Dashboard</span>
    </Link>



  </nav>
</div>


  )
}

export default Sidebar



