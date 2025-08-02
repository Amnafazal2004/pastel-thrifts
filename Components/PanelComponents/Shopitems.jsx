import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Shopitems = ({ id,image, productname, description, category, price }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col">

      {/* Image Box */}
      <Link href={`/products/${id}`} className="w-full h-[250px] overflow-hidden rounded-xl">
        <Image
          src={image}
          alt=''
          width={300}
          height={250}
          className="object-cover w-full h-full"
        />
      </Link>

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
          dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
        ></p>
      </div>

      {/* Price and Button */}
      <div className="mt-4">
        <p className="text-base font-bold text-[#3c5e78] mb-2">
          Rs. {price}
        </p>
        <Link href={`/products/${id}`}    className="w-full bg-[#3c5e78] text-white text-sm px-35 py-2 rounded-xl hover:bg-[#2e4a61] transition">
          See Details
        </Link>
      </div>
    </div>
  )
}

export default Shopitems
