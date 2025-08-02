"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import axios from 'axios';
import { useParams } from 'next/navigation';

//the url is saved like this because of the route products/[id] so params.id=1727338929293 
//next js passes the id through params 
//then it passes the whole url (GET /api/products?id=662f38abcd123456789abcde) to the backhend
const page = () => {
    const params = useParams();
    const [data,setdata] = useState(null);

    
    const fetchproducts= async () =>{
      const response = await axios.get('/api/products',{
        params:{
            id:params.id,
        }
      })
      setdata(response.data)
      console.log(data)
    }

  useEffect(()=>{
    fetchproducts();
  },[])

  //since we are using useffect to baar baar data load horaha, to jb bhi load horaha jb fetch bhi nhi hua hai 
  //isliye ye data? wala kia k jb data null nhi hai jb hi sab print ho
  return ( data?<>
    
    <div className="bg-[#0f172a] font-sans min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-lg max-w-6xl w-full">
        
        {/* Left: Product Image */}
        <div className="flex justify-center items-center p-10">
          <div className="w-[300px] h-[350px]">
            <Image
              src={data.image}
              width={500}
              height={450}
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-center px-10 py-10 space-y-6">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              {data.productname}
            </p>
            <h1 className="text-3xl font-semibold text-gray-800 mt-1">
              Drop type cushion chair
            </h1>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-gray-600 text-sm">8/10 - 15 Reviews</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-600">Colors:</span>
            <div className="w-5 h-5 bg-gray-300 rounded-full border-2 border-gray-400 cursor-pointer" />
            <div className="w-5 h-5 bg-orange-300 rounded-full border-2 border-gray-400 cursor-pointer" />
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {data.description}
          </p>

          <div className="grid grid-cols-2 gap-4 w-[250px]">
            <div>
              <p className="text-xs text-gray-400 uppercase">Height</p>
              <p className="text-gray-700 font-semibold">52"</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Width</p>
              <p className="text-gray-700 font-semibold">43"</p>
            </div>
          </div>

          <div>
            <p className="text-2xl font-bold text-gray-800">Rs.{data.price}</p>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="number"
              value="1"
              min="1"
              className="w-16 border border-gray-300 rounded-md px-3 py-1 text-center"
            />
          </div>

          <div className="flex space-x-4 mt-4">
            <button className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
              Trade Now
            </button>
            <button className="bg-white text-gray-800 border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-100 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
   </> : <></> 

      
 
  )
}

export default page
