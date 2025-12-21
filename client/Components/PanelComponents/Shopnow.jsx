
import Image from "next/image";
import back from "@/Assets/back.png";
import Link from "next/link";
import Showposts from "./Showposts";
import { Suspense } from "react";

const Shopnow = () => {
  //agar hamain kerna hota k agar user logged in hai tb hi usko saarey products dikhain then hum
  //useContext se user bhi latay idher aur useEffect  aesay likhtay k ye dependent hai k fetchproducts tb hi load ho
  //jb user logged in hai
  //    useEffect(()=>{
  // if(user){
  // fetchproducts();
  // }
  // },[user])

  return (
    <>
      <div className="p-10 pr-16 w-full">
        {/* Breadcrumb */}
        <p className="text-[12px] text-[#3c5e78]/60 mb-4  ">Home / Shop now</p>
        <hr className="border-[#A3CCE9] mb-6 " />

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={back}
              alt="Back"
              width={22}
              height={22}
              className="cursor-pointer"
            />
            <h2 className="text-2xl font-bold text-[#3c5e78] font-[playfair_display]">
              SHOP OUR COLLECTION
            </h2>
          </Link>

          <select className="border border-gray-400 bg-[#becfdc] rounded rounded-3xl px-3 py-2 text-sm mr-9">
            <option>All Categories</option>
            <option>Y2K</option>
            <option>Grunge</option>
            <option>Vintage</option>
            <option>Streetwear</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Suspense fallback={<div>Loading...</div>}>
               <Showposts />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Shopnow;
