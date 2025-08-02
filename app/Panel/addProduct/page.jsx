"use client"
import React, { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import bin from '@/Assets/bin.png';
import back from '@/Assets/back.png';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify'
import Cookies from 'js-cookie';

const page = () => {

  const [image, setImage] = useState(false);
  const user = Cookies.get('username')

  const [data, setData] = useState({
    username: user,
    productname: "",
    description: "",
    category: "Y2k",
    fortrade: false,
    forbuy: false,
    condition: "New with tags",
    size: "",
    usagefrequency: "Never used (New)",
    tradelocation: "",
    price: 0,


  })

  const refresher = () => {
    setData({
      username: user,
      productname: "",
      description: "",
      category: "Y2k",
      fortrade: false,
      forbuy: false,
      condition: "New with tags",
      size: "",
      usagefrequency: "Never used (New)",
      tradelocation: "",
      price: 0,
    });
    setImage(false);
  }

  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name)
    console.log(value)
    setData((data) => ({ ...data, [name]: value }))
  }

  const onsubmithandler = async (e) => {
    e.preventDefault();
    console.log(data);

    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('productname', data.productname);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('fortrade', data.fortrade);
    formData.append('forbuy', data.forbuy);
    formData.append('condition', data.condition);
    formData.append('size', data.size);
    formData.append('usagefrequency', data.usagefrequency);
    formData.append('tradelocation', data.tradelocation);
    formData.append('price', data.price);
    formData.append('image', image);

    const response = await axios.post('/api/products', formData);
    if (response.data.success) {

      toast.success(response.data.msg);
      setImage(false);
      setData({
        username: user,
        productname: "",
        description: "",
        category: "Y2k",
        fortrade: false,
        forbuy: false,
        condition: "New with tags",
        size: "",
        usagefrequency: "Never used (New)",
        tradelocation: "",
        price:0,
      });

    }
    else {
      toast.error("Error");
    }

  }



  return (
    <div className="p-10 pr-16 w-full">

      {/* Breadcrumb */}
      <p className="text-sm text-[#3c5e78]/60 mb-3 ">Home / New Product</p>
      <hr className="border-[#A3CCE9] mb-6" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className='flex'>
           <Link href='/Panel' className="flex items-center gap-3">
          <Image src={back} alt="Back" width={24} height={24} className="cursor-pointer" />
           </Link>
          <h2 className="text-3xl font-bold text-[#3c5e78] font-[playfair_display] ">New Product</h2>

        </div>
       
       
        <button className="hover:text-red-500 transition">
          <Image src={bin} onClick={refresher} alt="Delete" width={24} height={24} />
        </button>
      </div>

      {/* Form Grid */}
      <form onSubmit={onsubmithandler} className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">

        {/* Left Column */}
        <div className="space-y-6">
          <div>
            {/* <input type="text" name='username' value={data.username} onChange={onchangehandler} hidden  /> */}
            <label className="block font-semibold text-[#3c5e78] mb-1">Product Name</label>
            <input
              type="text"
              name='productname'
              value={data.productname}
              onChange={onchangehandler}
              placeholder="e.g. Oversized Denim Jacket"
              className="w-full border border-[#A3CCE9] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3c5e78]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-[#3c5e78] mb-1">Description</label>
            <textarea
              name='description'
              value={data.description}
              onChange={onchangehandler}
              placeholder="Describe your item..."
              className="w-full border border-[#A3CCE9] rounded-lg px-4 py-2 text-sm h-24 focus:outline-none focus:ring-1 focus:ring-[#3c5e78]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-[#3c5e78] mb-1">Category</label>
            <select name='category'
              value={data.category} onChange={onchangehandler} className="w-full border border-[#A3CCE9] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3c5e78] bg-white">
              <option>Y2K</option>
              <option>Grunge</option>
              <option>Vintage</option>
              <option>Streetwear</option>
              <option>Cottagecore</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#3c5e78] mb-1">Available For</label>
            <div className="flex gap-6">
              <label  className="flex items-center gap-2 text-sm text-[#3c5e78]">
                <input type="checkbox" name='fortrade'
                  checked={data.fortrade}

                  onChange={(e) => setData((data) => ({ ...data, fortrade: event.target.checked }))}
                  className="accent-[#3c5e78]" />
                Trade
              </label>
              <label className="flex items-center gap-2 text-sm text-[#3c5e78]">
                <input name='forbuy'
                  checked={data.forbuy}
                  onChange={(event) => setData((data) => ({ ...data, forbuy: event.target.checked }))}
                  type="checkbox"
                  className="accent-[#3c5e78]" />
                Buy
              </label>
             
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#3c5e78] mb-1">Condition</label>
            <select name='condition'
              value={data.condition} onChange={onchangehandler} className="w-full border border-[#A3CCE9] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3c5e78] bg-white">
              <option>New with tags</option>
              <option>Lightly used</option>
              <option>Worn vintage</option>
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <label htmlFor="file" className="block font-semibold text-[#3c5e78] mb-1">Upload Product Image</label>
            <div className={!image ? "w-full border-2 border-dashed border-[#A3CCE9] rounded-xl flex items-center justify-center h-36 text-sm text-[#3c5e78] cursor-pointer hover:bg-[#d3e6f3] transition" : "hidden"}>
              Drag & Drop or Click to Upload
            </div>
            <Image src={image ? URL.createObjectURL(image) : null} width={140} height={70} alt='' className={!image ? "hidden" : ""} />
            <input onChange={(e) => setImage(e.target.files[0])} type='file' id='file' hidden required />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-semibold text-[#3c5e78] mb-1">Size</label>
              <input
                name='size'
                value={data.size}
                onChange={onchangehandler}
                type="text"
                placeholder="e.g. XS"
                className="w-full border border-[#A3CCE9] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3c5e78]"
                required
              />
            </div>
           

            <div className="w-1/2">
              <label className="block font-semibold text-[#3c5e78] mb-1">Usage Frequency</label>
              <select name='usagefrequency'
                value={data.usagefrequency} onChange={onchangehandler} className="w-full border border-[#A3CCE9] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3c5e78]">

                <option>Never used (New)</option>
                <option>1-3 times</option>
                <option>4-10 times</option>
                <option>Frequently used</option>
              </select>
            </div>


          </div>

         <div>
               <label className="block font-semibold text-[#3c5e78] mb-1">Price</label>
            <input
              name='price'
              value={data.price}
              onChange={onchangehandler}
              type="text"
              placeholder="eg. Rs.1000"
              className="w-full border border-[#A3CCE9] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3c5e78]"

            />
            </div>

          <div className={!data.fortrade ? "hidden" : ""}>

            <label className="block font-semibold text-[#3c5e78] mb-1">Trade Location</label>
            <input
              name='tradelocation'
              value={data.tradelocation}
              onChange={onchangehandler}
              type="text"
              placeholder="City / Area"
              className="w-full border border-[#A3CCE9] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3c5e78]"

            />
          </div>

          <div className="flex gap-3">
            <button type='submit' className="bg-[#3c5e78] hover:bg-[#2f4c63] text-white px-6 py-2 rounded-lg text-sm transition">
              Add Product
            </button>

          </div>
        </div>
      </form>
    </div>

  )
}

export default page
