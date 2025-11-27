"use client"
import React from 'react'
import Image from 'next/image'
import axios from 'axios';
import { useState,useEffect } from 'react';

const NewArrivals = () => {
 const [products, setproducts] = useState([]);
 let count=0;

    const fetchproducts = async () => {
        const {data} = await axios.get('/api/products/allproducts');
        setproducts(data.products);
        console.log(data.products);
    }

    useEffect(()=>{
fetchproducts();
},[])

  return (
    <>
       <div id="NewArrivals" className="w-full py-12 px-6  text-center">
      
      {/* Small intro phrase */}
      <p className="text-xs md:text-sm  tracking-wide text-black">
        Just In Store
      </p>

      {/* Heading */}
      <h2 className="mt-1 text-3xl md:text-4xl font-bold font-[Playfair_Display] text-black">
        What’s New
      </h2>

      {/* Small description */}
      <p className="mt-2 text-sm md:text-base text-black">
        Fresh finds just added to our collection. Shop the latest pieces!
      </p>

      {/* Items grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
         
          {products.map((item,index)=>{
            count++;
            if(count>4){
              return <div key={index}> </div>
            }
            else{
            return <div key={index}  >

               <div className="bg-white rounded-lg shadow p-4">

          <Image 
            src={item.image[0]} 
             width={200}
          height={150}
            alt="" 
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-700">{item.productname}</h3>
          <p className="text-sm text-gray-500">Rs.{item.price}</p>
        </div>
             </div>
}})}
       
     </div> 
      </div>

    
    </>
  )
}

export default NewArrivals

