"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import back from '@/Assets/back.png';
import Footer from '@/Components/Footer';
import { useThriftContext } from '@/Context/ThriftContext';
import { messageSocket, tradechatRoom } from '@/Components/PanelComponents/Sockets';
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';

const page = () => {
  const params = useParams();
  const [productdata, setproductdata] = useState(null);
  const [moreproducts, setmoreproducts] = useState([])
  const { userId, getToken } = useThriftContext();
  const [conversation, setConversation] = useState(null);
  const [mainimage, setmainimage] = useState();
  const [gettinguser, setgettinguser] = useState();
  const router = useRouter()
  const messages = [];

  const fetchaproduct = async () => {
    const { data } = await axios.get(`/api/products/allproducts`, {
      params: { id: params.id }
    });
    setproductdata(data);
    setmainimage(data.image[0])
  }

  const fetchmoreproducts = async () => {
    const { data } = await axios.get(`/api/products/allproducts`);
    setmoreproducts(data.products);
  }

  const tradeHandler = async (userId, userName, productId, recieverId, recieverName) => {
    const { data: conversationData } = await axios.get(`/api/conversation`)
    const allConversations = conversationData.conversations
    let existingChatRoom = null;

    for (let conv of allConversations) {
      const hasUser1 = conv.userId === userId && conv.recieverId === recieverId;
      const hasUser2 = conv.userId === recieverId && conv.recieverId === userId;
      if ((hasUser1 || hasUser2)) {
        existingChatRoom = conv._id;
        break;
      }
    }
    let chatRoom;

    if (existingChatRoom) {
      chatRoom = existingChatRoom;
      toast.info('Joining existing conversation');
    } else if (userId === recieverId) {
      toast.info("You can not chat with yourself")
    } else {
      chatRoom = `${userId}-${recieverId}-product${productId}`
      const formData = new FormData();
      formData.append('_id', chatRoom);
      formData.append('userId', userId);
      formData.append('userName', userName);
      formData.append('productId', productId);
      formData.append('recieverId', recieverId);
      formData.append('recieverName', recieverName);
      formData.append('messages', messages)

      const { data } = await axios.post('/api/conversation', formData);
      if (data.success) {
        toast.success(data.message);
      }
    }

    tradechatRoom(chatRoom, userId, recieverId, productId);
    router.push(`/messages/${chatRoom}`);
  }

  const fetchuser = async () => {
    const { data } = await axios.get("/api/user");
    setgettinguser(data.user);
  }

  useEffect(() => {
    fetchuser()
    fetchaproduct()
    fetchmoreproducts()
  }, [userId]);

  return (productdata ? <>
    <div className="bg-white min-h-screen px-6 md:px-20 py-10 font-sans">

      {/* Breadcrumb */}
      <div className="flex ">
        <Link href={'/Panel/ShowProducts'}>
          <Image src={back} alt='' width={20} height={20} className="cursor-pointer " ></Image>
        </Link>
        <p className='text-sm text-gray-500 ml-2 '>
          Home / <Link href={'/Panel/ShowProducts'} className='text-gray-500'>Shop Now</Link> / <span className="text-black">{productdata.productname}</span>
        </p>
      </div>
      <div className="text-[28px] font-[playfair_display]  text-center mb-6 font-semibold text-[#3c5e78]">
        SHOP THIS LOOK
      </div>
      <hr className="border-[#A3CCE9] mb-6" />

   {/* Product Section */}
<div className="grid md:grid-cols-2 gap-16 items-start">
  {/* Left: Images */}
  <div>
    {/* Main Image */}
    <div className="w-full h-[300px] relative rounded-lg overflow-hidden mb-6">
      <Image src={mainimage} fill alt={productdata.productname} className="object-cover" />
    </div>
    {/* Thumbnails */}
    <div className="grid grid-cols-3 gap-4">
      {productdata.image?.slice(0, 3).map((img, index) => (
        <div
          key={index}
          onClick={() => setmainimage(img)}
          className="relative h-[120px] rounded-lg overflow-hidden cursor-pointer border hover:shadow-lg transition"
        >
          <Image src={img} fill alt={`Thumbnail ${index}`} className="object-cover" />
        </div>
      ))}
    </div>
  </div>

  {/* Right: Product Info */}
  <div className="flex flex-col justify-end">
    <div>
      <h1 className="text-2xl font-[playfair_display] text-[#3c5e78] font-semibold mb-4">
        {productdata.productname}
      </h1>
      <p className="text-[14px] uppercase tracking-widest font-[outfit] font-semibold underline text-black mb-4">
        {productdata.category}
      </p>

      <p className="mb-1 font-semibold">Condition:</p>
      <p className="text-gray-600 text-sm mb-4">{productdata.condition}</p>

      <p className="mb-1 font-semibold">Size:</p>
      <p className="border px-3 py-2 w-24 rounded mb-4">{productdata.size}</p>

      <p className="mb-1 font-semibold">Used For:</p>
      <p className="text-gray-600 mb-4">{productdata.usagefrequency}</p>

      <p className="mb-1 font-semibold">Description:</p>
      <p className="text-gray-600 leading-relaxed mb-6">
        A dress with thin straps will accentuate your refined neck and graceful shoulders.
        The cut of the dress is a little fitted, but at the same time it is quite loose, 
        which provides comfort and freedom of movement. Add a BISI blazer over it, 
        white or milky, and set to the party.
      </p>

      <div className="flex items-center justify-between mb-6">
        <p className="text-xl font-bold">${productdata.price}</p>
      </div>

      <div className="flex gap-4">
        <button className={productdata.forbuy ? "text-white px-8 py-2 bg-[#3c5e78] hover:bg-gray-900 transition rounded-xl" : "hidden"}>
          Buy Now
        </button>

        <button
          onClick={() => {
            tradeHandler(userId, gettinguser.username, productdata._id, productdata.userId, productdata.userName);
          }}
          className={productdata.fortrade ? "text-white px-8 py-2 bg-[#3c5e78] hover:bg-gray-900 transition rounded-xl" : "hidden"}>
          Trade Now
        </button>

        <button className={productdata.forbuy ? "border px-8 py-2 hover:bg-gray-900 hover:text-white transition rounded-xl" : "hidden"}>
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>


      {/* SHOP WITH THIS */}
      <div className="relative my-20 font-[playfair_display]">
        <hr className="border-[#A3CCE9] mb-4" />
        <h2 className="text-5xl mb-6 tracking-widest text-gray-500 text-center opacity-30 select-none">
          SHOP MORE LIKE THIS SHOP MORE LIKE
        </h2>
        <h2 className="absolute top-1/2 left-1/2 mb-2 transform -translate-x-1/2 -translate-y-1/2 
                       text-3xl font-bold text-[#3c5e78]">
          SHOP MORE LIKE THIS
        </h2>
        <hr className="border-[#A3CCE9] mb-6" />
      </div>

      {/* More Products (smaller height) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {moreproducts.slice(0, 6).map((item, index) => (
          <div key={index} className="group relative">
            <div className="h-[250px]  rounded-md overflow-hidden relative">
              <Image src={item.image[0]} fill alt={item.productname}
                className="object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute z-50 inset-0 bg-[#00000090]  bg-opacity-30 opacity-0 group-hover:opacity-100 
                              flex items-center justify-center transition">
                <button className="text-white border border-white px-5 py-2 rounded-full text-sm">+ ADD TO CART</button>
              </div>
            </div>
            <div className="mt-3 text-center">
              <h3 className="font-semibold uppercase text-sm">{item.productname}</h3>
              <p className="text-gray-500 text-xs">{item.category}</p>
              <p className="font-bold mt-1 text-sm">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </> : <></>);
}

export default page
