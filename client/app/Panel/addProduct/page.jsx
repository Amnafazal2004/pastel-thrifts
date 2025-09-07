"use client"
import React, { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import bin from '@/Assets/bin.png';
import back from '@/Assets/back.png';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify'
import { useThriftContext } from '@/Context/ThriftContext';


const page = () => {

  const { getToken,setsidebar } = useThriftContext()
  const [files, setfiles] = useState([]);
  const [gettinguser,setgettinguser] = useState();
  const [productdata, setproductData] = useState({

    productname: "",
    userName: "",
    description: "",
    category: "Y2k",
    fortrade: false,
    forbuy: false,
    condition: "New with tags",
    size: "",
    usagefrequency: "Never used (New)",
    tradelocation: "",
    price: 0,
    soldout: false,


  })

  const refresher = () => {
    setproductData({

      productname: "",
      userName: "",
      description: "",
      category: "Y2k",
      fortrade: false,
      forbuy: false,
      condition: "New with tags",
      size: "",
      usagefrequency: "Never used (New)",
      tradelocation: "",
      price: 0,
      soldout: false,
    });
    setfiles([])
  }

  const fetchuser = async () =>{
    const {data} = await axios.get("/api/user");
    console.log("gotit");
   setgettinguser(data.user);
    console.log(data)
  

  }

  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name)
    console.log(value)
    setproductData((productdata) => ({ ...productdata, [name]: value }))
  }

  const onsubmithandler = async (e) => {
    e.preventDefault();
    console.log('Form data before submission:', productdata);
    console.log('Files:', files);

    const formData = new FormData();

    formData.append('userName', gettinguser.username);
    formData.append('productname', productdata.productname);
    formData.append('description', productdata.description);
    formData.append('category', productdata.category);
    formData.append('fortrade', productdata.fortrade);
    console.log(productdata.fortrade)
    formData.append('forbuy', productdata.forbuy);
    formData.append('condition', productdata.condition);
    formData.append('size', productdata.size);
    formData.append('usagefrequency', productdata.usagefrequency);
    formData.append('tradelocation', productdata.tradelocation);
    formData.append('price', productdata.price);
    formData.append('soldout', productdata.soldout);


    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i])
    }

    try {
      const token = await getToken();
      const { data } = await axios.post('/api/products/addproduct', formData, { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) {

        toast.success(data.message);
        setfiles([]);
        setproductData({
          productname: "",
          userName: "",
          description: "",
          category: "Y2k",
          fortrade: false,
          forbuy: false,
          condition: "New with tags",
          size: "",
          usagefrequency: "Never used (New)",
          tradelocation: "",
          price: 0,
          soldout: false,
          
        });
      }
      else {
        toast.error("Error");
      }
    }
    catch (error) {
      toast.error(error.message)

    }



  }
useEffect(()=>{
  fetchuser()
},[])

useEffect(()=>{
  console.log(gettinguser)
},[gettinguser])




  return (
    <div className="p-10 pr-16 w-full">
   
      {/* Breadcrumb */}
      <p className="text-[12px] text-[#3c5e78]/60 mb-3 ">Home / New Product</p>
      <hr className="border-[#A3CCE9] mb-6" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className='flex'>
          <Link href='/Panel/ShowProducts' className="flex items-center gap-3">
            <Image
              src={back}
              alt="Back" width={22} height={22} className="cursor-pointer" />
          </Link>
          <h2 className="text-2xl ml-2 font-bold text-[#3c5e78] font-[playfair_display] ">NEW  PRODUCT</h2>

        </div>


        <button className="hover:text-red-500 transition">
          <Image
            src={bin}
            onClick={refresher} alt="Delete" width={22} height={22} />
        </button>
      </div>

      {/* Form Grid */}
      <form onSubmit={onsubmithandler} className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">

        {/* Left Column */}
        <div className="space-y-6">
          <div>
          
            <label className="block text-sm font-semibold text-[#3c5e78] mb-1">Product Name</label>
            <input
              type="text"
              name='productname'
              value={productdata.productname}
              onChange={onchangehandler}
              placeholder="e.g. Oversized Denim Jacket"
              className="w-full border border-[#A3CCE9] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3c5e78]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3c5e78] mb-1">Description</label>
            <textarea
              name='description'
              value={productdata.description}
              onChange={onchangehandler}
              placeholder="Describe your item..."
              className="w-full border border-[#A3CCE9]  rounded-lg px-4 py-2 text-sm h-24 focus:outline-none focus:ring-1 focus:ring-[#3c5e78]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3c5e78] mb-1">Category</label>
            <select name='category'
              value={productdata.category} onChange={onchangehandler} className="w-full border border-[#A3CCE9] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3c5e78] bg-white">
              <option>Y2K</option>
              <option>Grunge</option>
              <option>Vintage</option>
              <option>Streetwear</option>
              <option>Cottagecore</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3c5e78] mb-1">Available For</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-[#3c5e78]">
                <input type="checkbox" name='fortrade'
                  checked={productdata.fortrade}

                  onChange={(event) => setproductData((productdata) => ({ ...productdata, fortrade: event.target.checked }))}
                  className="accent-[#3c5e78]" />
                Trade
              </label>
              <label className="flex text-sm items-center gap-2 text-sm text-[#3c5e78]">
                <input name='forbuy'
                  checked={productdata.forbuy}
                  onChange={(event) => setproductData((productdata) => ({ ...productdata, forbuy: event.target.checked }))}
                  type="checkbox"
                  className="accent-[#3c5e78]" />
                Buy
              </label>

            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3c5e78] mb-1">Condition</label>
            <select name='condition'
              value={productdata.condition} onChange={onchangehandler} className="w-full border border-[#A3CCE9] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3c5e78] bg-white">
              <option>New with tags</option>
              <option>Lightly used</option>
              <option>Worn vintage</option>
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            {/* creates a array of 4,of empty elemnts and giving index to each element, then
            if the image is  uploaded then dont write drag and drop, 
            on input if the file is uploaded then in onchange 
            jo file wali array hai usse updatedfile main copy kerdia(takay original main change na kareyin usse bugs attay hain)
            jesay hi ek file upload hogi wo updatedfile[] main 0 index per chali jayegi phir 1 index per jayegi aesi saari update hojayeingi
            
             */}
            <label className="block text-sm font-semibold text-[#3c5e78] mb-1">Upload Product Image </label>
            <div className='flex items-center gap-4'>
              {[...Array(3)].map((_, index) => (
                <label htmlFor={`image${index}`} key={index}>

                  <div className={!files[index] ? "w-40  border-2 border-dashed border-[#A3CCE9] rounded-xl flex items-center justify-center h-36 text-sm text-[#3c5e78] cursor-pointer hover:bg-[#d3e6f3] transition" : "hidden"} >
                    Click to Upload
                  </div>

                  <input onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setfiles(updatedFiles);

                  }} type='file' id={`image${index}`} hidden />
                  <Image key={index}
                    src={files[index]
                      ? URL.createObjectURL(files[index])
                      : bin }
                    width={140}
                    height={70}
                    alt=''
                    className={!files[index] ? "hidden" : ""} />

                </label>
              ))}

            </div>
          </div>

          <div className="flex  gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-[#3c5e78] mb-1">Size</label>
              <input
                name='size'
                value={productdata.size}
                onChange={onchangehandler}
                type="text"
                placeholder="e.g. XS"
                className="w-full border border-[#A3CCE9] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3c5e78]"
                required
              />
            </div>


            <div className="w-1/2">
              <label className="block text-sm font-semibold text-[#3c5e78] mb-1">Usage Frequency</label>
              <select name='usagefrequency'
                value={productdata.usagefrequency} onChange={onchangehandler} className="w-full border border-[#A3CCE9] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3c5e78]">

                <option>Never used (New)</option>
                <option>1-3 times</option>
                <option>4-10 times</option>
                <option>Frequently used</option>
              </select>
            </div>


          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3c5e78] mb-1">Price</label>
            <input
              name='price'
              value={productdata.price}
              onChange={onchangehandler}
              type="text"
              placeholder="eg. Rs.1000"
              className="w-full border border-[#A3CCE9] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3c5e78]"

            />
          </div>

          <div className={!productdata.fortrade ? "hidden" : ""}>

            <label className="block text-sm font-semibold text-[#3c5e78] mb-1">Trade Location</label>
            <input
              name='tradelocation'
              value={productdata.tradelocation}
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
