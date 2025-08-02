import React from 'react'
import Image from 'next/image'
import wishlist from '@/Assets/wishlist.png';
import add from '@/Assets/add.png';
import conversation from '@/Assets/conversation.png';
import login from '@/Assets/login.png';
import orderhistory from '@/Assets/orderhistory.png';
import Link from 'next/link';


const Sidebar = () => {
  return (
    // used flex-shrink-0 so the sidebar does not get squished
   <div className="min-h-screen flex-shrink-0 w-64 bg-[#becfdc] rounded-xl text-black px-6 pt-8 shadow-lg flex flex-col">

  {/* Sidebar Heading */}
  <Link href='/' className="text-3xl font-[playfair_display] font-bold mb-8">Pastel Thrifts</Link>

  {/* Subheading */}
  <h2 className="text-sm uppercase px-10 text-gray-700 tracking-widest mb-6">Main Menu</h2>

  {/* Menu Items */}
  <nav className="flex flex-col gap-4">
    
    {/* Add Product */}
    <Link href='/Panel/addProduct' className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-[#3c5e78] hover:text-[#e2ebf3] transition-all cursor-pointer group">
      <Image src={add} alt="Add Product" width={22} height={22} className="group-hover:scale-105" />
      <span className="text-base font-[playfair_display] font-medium">Add Product</span>
    </Link>

    {/* Messages */}
    <div className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-[#3c5e78] hover:text-[#e2ebf3]  transition-all cursor-pointer group">
      <Image src={conversation} alt="Messages" width={22} height={22} className="group-hover:scale-105" />
      <span className="text-base font-[playfair_display]font-medium">Messages</span>
    </div>

    {/* Wishlist */}
    <div className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-[#3c5e78] hover:text-[#e2ebf3]  transition-all cursor-pointer group">
      <Image src={wishlist} alt="Wishlist" width={22} height={22} className="group-hover:scale-105" />
      <span className="text-base font-[playfair_display] font-medium">Wishlist</span>
    </div>

    {/* Dashboard */}
    <div className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-[#3c5e78] hover:text-[#e2ebf3]  transition-all cursor-pointer group">
      <Image src={login} alt="Dashboard" width={22} height={22} className="group-hover:scale-105" />
      <span className="text-base font-[playfair_display] font-medium">Dashboard</span>
    </div>

    {/* Order History */}
    <div className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-[#3c5e78] hover:text-[#e2ebf3]  transition-all cursor-pointer group">
      <Image src={orderhistory} alt="Order History" width={22} height={22} className="group-hover:scale-105" />
      <span className="text-base  font-[playfair_display]font-medium">Your Orders</span>
    </div>

  </nav>
</div>


  )
}

export default Sidebar
