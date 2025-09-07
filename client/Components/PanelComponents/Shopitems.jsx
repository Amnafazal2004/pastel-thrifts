import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Shopitems = ({id, image, productname, description, category, price , soldout}) => {
  return (
    <div 
      className="bg-white rounded-2xl border-1 border-[#A3CCE9] shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col"
      style={{ minWidth: "320px", minHeight: "420px" }}
    >

      {/* Image Box */}
      <div className="w-full h-[220px] overflow-hidden rounded-xl border border-[#A3CCE9]">
        <Image
          src={image}
          alt=''
          width={400}
          height={220}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Category Badge */}
      <p className="mt-4 mb-1 w-fit px-3 py-1 bg-[#3c5e78] text-white text-xs rounded-md">
        {category}
      </p>

      {/* Product Content */}
      <div className="flex-grow">
        <h5 className="text-lg font-semibold text-gray-800 mt-2">
          {productname}
        </h5>

        <p
          className="text-sm text-gray-600 mt-1"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
        ></p>
      </div>

      {/* Price and Button */}
      <div className="mt-4">
        <p className="text-base font-bold text-[#3c5e78] mb-2">
          Rs. {price}
        </p>
        {soldout ? (
          <div>
            <button className="w-full bg-[#3c5e78] text-white text-sm py-1 mt-2 rounded-xl hover:bg-[#2e4a61] transition">
              Sold out
            </button>  
          </div>
        ) : (
          <Link href={`/singleproduct/${id}`}>
            <button className="w-full bg-[#3c5e78] text-white text-sm py-1 mt-2 rounded-xl hover:bg-[#2e4a61] transition">
              See Details
            </button>  
          </Link>
        )}
      </div>
    </div>
  )
}

export default Shopitems
