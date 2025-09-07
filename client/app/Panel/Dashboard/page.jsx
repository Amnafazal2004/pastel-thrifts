"use client"

import React, { useState, useEffect } from 'react';
import headerimg from '@/Assets/headerimg.png';
import Image from 'next/image';
import axios from 'axios';
import bin from '@/Assets/bin.png';
import { useThriftContext } from '@/Context/ThriftContext';

const Page = () => {

  const [gettinguser, setgettinguser] = useState();
  const [products, setProducts] = useState([]);
  const [deletepopup,setdeletepopup] = useState()
  const { user, userId } = useThriftContext();



  // Fetch user info
  const fetchuser = async () => {
    const { data } = await axios.get("/api/user");
    setgettinguser(data.user);
  }

  // Fetch products
  const fetchproducts = async () => {
    const { data } = await axios.get('/api/products/allproducts');
    setProducts(data.products);
  }

  const handletogglechange = async (productid,checked) => {

    
  //database main change 
    await axios.put('/api/products/allproducts', {
      id: productid,
      soldout: checked
    });

    //so it will display the items with soldout 
 fetchproducts()

  }
  const deleteproduct = async (productid) =>{
    await axios.delete('/api/products/allproducts',{
       data: { id:productid}
    })

    //so it will display the items with removing deleted products
 fetchproducts();
  }



  useEffect(() => {
    if (user) fetchproducts();
  }, [user]);

  useEffect(() => {
    fetchuser();
  }, []);

  return (
    <div className="p-10 pr-16 w-full">

      {/* Breadcrumb */}
      <p className="text-[12px] text-[#3c5e78]/60 mb-3">Home / Dashboard</p>
      <hr className="border-[#A3CCE9] mb-6" />

      {/* Dashboard Welcome Section */}
      <div className="relative flex justify-between items-center bg-[#ccdce8] rounded-3xl p-6 h-32 overflow-visible mb-10">
        {/* Left Side */}
        <div className="flex flex-col justify-center h-full">
          <h2 className="text-3xl ml-2 font-bold font-[playfair_display] text-[#3c5e78]">
            Hey, {gettinguser?.username || "User"}!
          </h2>
          <p className="mt-1 ml-2 text-sm text-[#3c5e78]/80">
            Explore your products and make the changes you like
          </p>
        </div>

        {/* Right Side */}
        <div className="absolute right-1 -top-9 w-32 h-32 md:w-40 md:h-40">
          <Image
            src={headerimg}
            alt="Dashboard Hero"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Your Products Heading */}
      <h2 className="text-2xl font-bold font-[playfair_display] ml-3 text-[#3c5e78] mb-6">Your Products</h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"> 
        {products.map((product) => (
          (userId===product.userId ?
          <div
            key={product._id}
            className="bg-white rounded-2xl border border-[#A3CCE9] p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300"
            style={{ minWidth: "280px" }}
          >

            {/* Top row: Name + Delete */}
            <div  className="flex items-center justify-between">
              <h3 className="font-[playfair_display] font-bold text-lg text-[#3c5e78] truncate">{product.productname}</h3>
              <Image
              onClick={()=>setdeletepopup("yes")}
                src={bin}
                alt='delete'
                className="w-4 h-4 cursor-pointer hover:opacity-70"
              />
            </div>
            {
              deletepopup? 
              <div>{
  deletepopup ? (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000090] bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-6 w-80 shadow-lg">
        <h2 className="text-lg font-bold font-[playfair_display] text-[#3c5e78] mb-4">Confirm Delete</h2>
        <p className="text-sm text-[#3c5e78]/80 mb-6">
          Are you sure you want to delete this product?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setdeletepopup(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              deleteproduct(product._id);
              setdeletepopup(false);
            }}
            className="px-4 py-2 rounded-lg bg-[#3c5e78] text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : null
}
</div>
              : <></>
            }

            {/* Product Image */}
            <div className="w-full h-44 relative rounded-xl overflow-hidden border border-[#A3CCE9]">
              <Image
                src={product.image[0]}
                alt={product.productname}
                fill
                className="object-cover"
              />
            </div>

            {/* Description (2 lines max) */}
            <p className="text-sm text-[#3c5e78]/80 mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Sold Out toggle at bottom row */}
            <div  className="flex items-center justify-between mt-auto">
              <span className="text-sm md:text-base font-bold text-[#3c5e78]">Sold Out</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={product.soldout}  //ye dekhta product ki soldout false hai k true us k hisab se change kerta 
                onChange={(e) => {  //onchange hoonay per database update hogi k konsa product ki database main value change kerni hai
                   handletogglechange(product._id,e.target.checked)  
                }} 
                className="sr-only peer" />
                <div className="w-10 h-5 bg-[#A3CCE9] rounded-full peer-checked:bg-[#2b5e84] peer-focus:ring-2 peer-focus:ring-[#2b5e84] transition-all"></div>
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
              </label>

            </div>

          </div>
        : null)))}
      </div>



    </div>
  );
};

export default Page;
