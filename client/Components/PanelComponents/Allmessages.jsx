"use client"
import { messageSocket, recievemessage, tradechatRoom } from '@/Components/PanelComponents/Sockets';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'next/navigation';
import Image from 'next/image'
import wishlist from '@/Assets/wishlist.png';
import add from '@/Assets/add.png';
import msgicon from '@/Assets/msgicon.png';
import userlogin from '@/Assets/userlogin.png';
import orderhistory from '@/Assets/orderhistory.png';
import home from '@/Assets/home.png';
import { useThriftContext } from '@/Context/ThriftContext';

const Allmessages = () => {
  const params = useParams();
  const { userId, setsidebar } = useThriftContext();
  const [themessage, setthemessage] = useState('')
  const [conversation, setConversation] = useState(null);
  const [selectedchatid, setselectedchatid] = useState();
   const [selectedchatname, setselectedchatname] = useState();
  const [chatroom, setchatroom] = useState();
  const [allConversations, setallConversations] = useState([]);
  const [allproducts, setallproducts] = useState([]);
  const [allmessages,setallmessages] = useState([]);
  let recieverId, productId,userkiId;



  const updateconversation = async () => {

    await axios.put(`/api/conversation`, {
      id: chatroom,
      message: {
        text: themessage,
        sender: userId

      },

    })
  }

  const fetchallConversations = async () => {
    const { data } = await axios.get("/api/conversation")
    console.log("got it")
    setallConversations(data.conversations);
    console.log(data.conversations);

  }

  const fetchallProducts = async () => {
    const { data } = await axios.get("/api/products/allproducts")
    console.log("got it")
    setallproducts(data.products);
    console.log(data.products);

  }

  const submitHandler = async (e) => {
    e.preventDefault();
   await updateconversation();  //wait for the message to be saved in database then go further
    messageSocket(themessage, chatroom);
    setthemessage("");
  };

  useEffect(() => {
    //callback se real time messages idher arrahay jo allmessages main store kerrahay takay wo print kersakyein
 recievemessage( (msg)=>{
setallmessages((allmessages)=>[...allmessages,{text: msg , sender: userId}])
 })
   
    fetchallConversations();
    fetchallProducts();

  }, [])

  useEffect(() => {
  setsidebar(false);
}, [setsidebar]);



  return (
    <>
      {/* <div>
        <form onSubmit={submitHandler}>
          <input type="text"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
          />
          <button className='bg-red-500' type='submit'>Send</button>
        </form>
      </div> */}

      <div id="messages"className="h-screen w-full flex bg-gray-100">
     
      
        {/* Sidebar */}
        <div className="w-16 bg-[#ccdce8] flex flex-col items-center py-4 space-y-6 text-white">
          <Image src={home} alt="Home" width={22} height={22} className="mb-12" />
          <Image src={add} alt="Add" width={22} height={22} />
          <Image src={msgicon} alt="Conversation" width={22} height={22} />
          <Image src={wishlist} alt="Wishlist" width={22} height={22} />
          <Image src={userlogin} alt="User Login" width={22} height={22} />
          <Image src={orderhistory} alt="Order History" width={22} height={22} />
        </div>

        {/* Main Content (Breadcrumb + Chats) */}
        <div className="flex-1 flex flex-col">
          {/* Breadcrumb */}
          <div className="px-6 py-3 border-b bg-white">
            <p className="text-[12px] text-gray-500">Home /  <span className="text-[12px] text-black">Your Inbox</span></p>
          </div>

          {/* Chat Area */}
          <div className="flex flex-1 overflow-hidden">
            {/* Chat List */}
            <div className="w-72 bg-white border-r flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 className="font-extrabold text-2xl font-[playfair_display] text-gray-700">
                  Your Inbox
                </h2>
              </div>

              {/* Search */}
              <div className="p-3">
                <input
                  type="text"
                  placeholder="Find a room"
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>

              {/* Chat list */}
              <div className="flex flex-col text-sm overflow-y-auto divide-y">
                {allConversations.map((item, index) => {
                  return <div key={index}>
                    <div onClick={() => {
                      setselectedchatid(item.userId);
                      setselectedchatname(item.userName);
                      setchatroom(item._id);
                      //saarey msgs is main ajayein takay history bhi print kersakyein
                    setallmessages(item.messages);

                      console.log(allmessages)
                    }}
                      className='cursor-pointer'>
                        {allproducts.map((item2,index)=>{
                          if(userId === item2.userId){
                           return <p key={index}>{item.userName}</p>  
                              
                          }
                          else{
                           return <p key={index}>{item.recieverName}</p>  
                          }
                        })}
                         
                      </div>
                    
                    {console.log(selectedchatid, selectedchatname, chatroom)}

                     {/* gives the last index value of an array */}
                    <p>{item.messages.at(-1).text}</p>

                  </div>
                })}
              </div>
            </div>

            {selectedchatid ? (
  <div>
    {allConversations.map((item, index) => {
      if (item.userId === selectedchatid) {
        allproducts.map((item4, index2) => {
          if (userId !== item4.productId) {
            userkiId = userId;
            recieverId = item4.userId;
            productId = item4.productId;
          } else {
            userkiId = selectedchatid;
            recieverId = userId;
            productId = item.productId;
            console.log(userkiId,recieverId)
          }

        });

        // yahan tum apni socket call rakh sakte ho
        tradechatRoom(chatroom, userkiId, recieverId, productId);

        return (
            //jesay hi selected chat khulay to saarey history k msg bhi aasakyein aur real timek bhi
          <div className="flex-1 p-4 overflow-y-auto">
    {allmessages.map((msg, i) => (
      <p key={i} className={userId===msg.sender?'bg-blue-600':'bg-white'}>{msg.text}</p>
    ))}
  </div>
        );
      }
    })}
  </div>
) : (
  "No chats available"
)}

            <div>
              <form onSubmit={submitHandler}>
                <input type="text"
                  value={themessage}
                  onChange={(e) => setthemessage(e.target.value)}
                />
                <button className='bg-red-500' type='submit'>Send</button>
              </form>
            </div>
      

          </div>
        </div>
      </div>




    </>

  )

}
export default Allmessages     
