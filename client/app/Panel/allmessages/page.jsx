
// // "use client"
// // import { useRef } from "react";
// // import { messageSocket, recievemessage } from '@/Components/PanelComponents/Sockets';
// // import React, { useEffect, useState } from 'react'
// // import axios from 'axios';
// // import { useParams } from 'next/navigation';
// // import Image from 'next/image'
// // import more from '@/Assets/more.png';
// // import send from '@/Assets/send.png';  
// // import msgicon from '@/Assets/msgicon.png';
// // import { useThriftContext } from '@/Context/ThriftContext';

// // const Allmessages = () => {
// //   const params = useParams();
// //   const { userId, setsidebar } = useThriftContext();
// //   const [themessage, setthemessage] = useState('')
// //   const [selectedchatid, setselectedchatid] = useState();
// //   const [selectedchatname, setselectedchatname] = useState();
// //   const [chatroom, setchatroom] = useState();
// //   const [allConversations, setallConversations] = useState([]);
// //   const [allproducts, setallproducts] = useState([]);
// //   const [allmessages, setallmessages] = useState([]);
// //   const messagesEndRef = useRef(null);

// //   const updateconversation = async () => {
// //     await axios.put(`/api/conversation`, {
// //       id: chatroom,
// //       message: {
// //         text: themessage,
// //         sender: userId
// //       },
// //     })
// //   }

// //   const fetchallConversations = async () => {
// //     const { data } = await axios.get("/api/conversation")
// //     setallConversations(data.conversations);
// //   }

// //   const fetchallProducts = async () => {
// //     const { data } = await axios.get("/api/products/allproducts")
// //     setallproducts(data.products);
// //   }

// //   const submitHandler = async (e) => {
// //     e.preventDefault();
// //     await updateconversation();
// //     messageSocket(themessage, chatroom);
// //     setthemessage("");
// //   };

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   };

// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [allmessages]);

// //   useEffect(() => {
// //     recievemessage((msg) => {
// //       setallmessages((allmessages) => [...allmessages, { text: msg, sender: userId }])
// //     })

// //     fetchallConversations();
// //     fetchallProducts();
// //   }, [])

// //   useEffect(() => {
// //     setsidebar(false);
// //   }, [setsidebar]);

// //   return (
// //     <div className="h-screen w-full flex bg-white">
// //       {/* Main Content */}
// //       <div className="flex-1 flex flex-col p-6">
// //         {/* Chat Container */}
// //         <div className="flex-1 flex overflow-hidden">
// //           {/* Chat List */}
// //           <div className="w-80 bg-white rounded-2xl shadow-lg border border-gray-300 flex flex-col overflow-hidden">
// //             <div className="p-5 border-b border-gray-300">
// //               <h1 className="text-3xl font-bold font-[playfair_display] text-[#3c5e78]">Your Inbox</h1>
// //               <div className="relative mt-3">
// //                 <input
// //                   type="text"
// //                   placeholder="Search conversation..."
// //                   className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ccdce8]"
// //                 />
// //                 <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
// //                   <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //                   </svg>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Conversation List */}
// //             <div className="flex-1 overflow-y-auto pt-2 bg-white">
// //               {allConversations.map((item, index) => (
// //                 <div
// //                   key={index}
// //                   onClick={() => {
// //                     setselectedchatid(item.userId);
// //                     setselectedchatname(item.userName);
// //                     setchatroom(item._id);
// //                     setallmessages(item.messages);
// //                   }}
// //                   className={`cursor-pointer mx-3 mb-2 rounded-xl transition-all duration-200 border ${
// //                     selectedchatid === item.recieverId
// //                       ? "bg-[#ccdce8] text-[#2d4456] border-gray-400 shadow-md"
// //                       : "hover:bg-gray-50 bg-white border-gray-300"
// //                   }`}
// //                 >
// //                   <div className="flex items-center space-x-3 px-3 py-3">
// //                     <div
// //                       className={`w-9 h-9 rounded-full flex items-center justify-center font-medium text-sm shadow-sm border ${
// //                         selectedchatid === item.recieverId
// //                           ? "bg-white text-[#2d4456] border-gray-400"
// //                           : "bg-[#ccdce8] text-[#2d4456] border-gray-300"
// //                       }`}
// //                     >
// //                       {item.userName?.charAt(0).toUpperCase() || "U"}
// //                     </div>
// //                     <div className="flex-1 min-w-0">
// //                       <div className="flex items-center justify-between">
// //                         <p
// //                           className="font-bold text-sm truncate text-[#2d4456]"
// //                         >
// //                           {item.recieverName}
// //                         </p>
// //                         <Image
// //                           src={more}
// //                           alt="more"
// //                           width={12}
// //                           height={12}
// //                           className="opacity-50"
// //                         />
// //                       </div>
// //                       <p className="text-[11px] truncate text-gray-500">
// //                         {item.messages.at(-1)?.text || "No messages yet"}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Chat Window */}
// //           <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-300 flex flex-col overflow-hidden ml-4">
// //             {selectedchatid ? (
// //               <>
// //                 {/* Chat Header */}
// //                 <div className="flex items-center justify-between px-6 py-4 bg-white text-[#2d4456] border-b border-gray-300">
// //                   <div className="flex items-center space-x-3">
// //                     <div className="w-10 h-10 bg-[#ccdce8] rounded-full flex items-center justify-center text-[#2d4456] font-semibold text-sm shadow-sm border border-gray-400">
// //                       {selectedchatname?.charAt(0).toUpperCase() || 'U'}
// //                     </div>
// //                     <div>
// //                       <p className="font-bold text-sm">{selectedchatname}</p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Messages Area */}
// //                 <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white border-b border-gray-300">
// //                   {allmessages.map((msg, i) => (
// //                     <div key={i} className={`flex ${userId === msg.sender ? 'justify-end' : 'justify-start'}`}>
// //                       <div
// //                         className={`max-w-lg px-4 py-3 rounded-2xl shadow-sm flex items-end space-x-2 border ${
// //                           userId === msg.sender
// //                             ? 'bg-[#ccdce8] text-[#2d4456] rounded-br-none border-gray-400'
// //                             : 'bg-white text-[#2d4456] border-gray-300 rounded-bl-none'
// //                         }`}
// //                       >
// //                         <p className="text-sm flex-1">{msg.text}</p>

// //                       </div>
// //                     </div>
// //                   ))}
// //                   <div ref={messagesEndRef} />
// //                 </div>

// //                 {/* Message Input */}
// //                 <div className="px-6 py-4 bg-white border-t border-gray-300 shadow-inner">
// //                   <form onSubmit={submitHandler} className="flex items-center space-x-3">
// //                     <input
// //                       type="text"
// //                       value={themessage}
// //                       onChange={(e) => setthemessage(e.target.value)}
// //                       placeholder="Type a message..."
// //                       className="flex-1 px-4 py-3 bg-gray-50 border border-gray-400 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#ccdce8] transition-all"
// //                     />
// //                     <button
// //                       type="submit"
// //                       disabled={!themessage.trim()}
// //                       className="p-3 bg-[#ccdce8] rounded-full border border-gray-400 hover:opacity-90 disabled:opacity-50 transition-all"
// //                     >
// //                       <Image src={send} alt="Send" width={20} height={20} />
// //                     </button>
// //                   </form>
// //                 </div>
// //               </>
// //             ) : (
// //               <div className="flex-1 flex items-center justify-center bg-white">
// //                 <div className="text-center">
// //                   <div className="w-16 h-16 bg-[#ccdce8]/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-400">
// //                     <Image src={msgicon} alt='conversation' width={35} height={35}/>
// //                   </div>
// //                   <h3 className="text-lg font-semibold text-[#2d4456] mb-2">No chats available</h3>
// //                   <p className="text-gray-500">Choose from your existing conversations or start a new trade</p>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Allmessages


"use client"
import { useRef } from "react";
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
import more from '@/Assets/more.png';
import send from '@/Assets/send.png';
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
  const [allmessages, setallmessages] = useState([]);
  const [remembername, setremembername] = useState()
  const messagesEndRef = useRef(null);
  let recieverId, productId, userkiId, displayname;

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
    await updateconversation(); //wait for the message to be saved in database then go further
    messageSocket({ text: themessage, sender: userId }, chatroom);
    setthemessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allmessages]);

  useEffect(() => {
    //callback se real time messages idher arrahay jo allmessages main store kerrahay takay wo print kersakyein
    recievemessage((msg) => {
      setallmessages((allmessages) => [...allmessages, msg])
    })

    fetchallConversations();
    fetchallProducts();
  }, [])

  useEffect(() => {
    setsidebar(false);
  }, [setsidebar]);

  useEffect(() => {
    console.log("selevted chat id", selectedchatid)
    console.log("selevted chat name", selectedchatname)
  }, [allmessages]);

  useEffect(() => {
    console.log("user id", userkiId)
    console.log("receiver id", recieverId)
    console.log("products ", productId)
  }, [allmessages]);

  return (
    <>
      <div id="messages" className="h-screen w-full flex bg-gray-100">


        {/* Main Content (Breadcrumb + Chats) */}
        <div className="flex-1 flex flex-col">


          {/* Chat Area */}
          <div className="flex flex-1 overflow-hidden bg-white p-6">
            {/* Chat List */}
            <div className="w-80 bg-white rounded-2xl shadow-lg border border-gray-300 flex flex-col overflow-hidden">
              {/* Header */}
              <div className="p-5 border-b border-gray-300">
                <h1 className="text-3xl font-bold font-[playfair_display] text-[#3c5e78]">Your Inbox</h1>
                <div className="relative mt-3">
                  <input
                    type="text"
                    placeholder="Find a room"
                    className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ccdce8]"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Chat list */}
              <div className="flex-1 overflow-y-auto pt-2 bg-white">
                {allConversations.map((item, index) =>
                  (userId === item.userId || userId === item.recieverId) ? (
                    <div
                      key={index}
                      onClick={() => {
                        setselectedchatid(item.userId);
                        setselectedchatname(item.userName);
                        setchatroom(item._id);
                        setallmessages(item.messages);
                      }}
                      className={`cursor-pointer mx-3 mb-2 rounded-xl transition-all duration-200 border ${selectedchatid === item.userId
                          ? "bg-[#ccdce8] text-[#2d4456] border-gray-400 shadow-md"
                          : "hover:bg-gray-50 bg-white border-gray-300"
                        }`}
                    >
                      <div className="flex items-center space-x-3 px-3 py-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-medium text-sm shadow-sm border ${selectedchatid === item.userId
                              ? "bg-white text-[#2d4456] border-gray-400"
                              : "bg-[#ccdce8] text-[#2d4456] border-gray-300"
                            }`}
                        >
                          {allproducts.map((item2) => {
                             if( userId === item2.userId){
                                  displayname= item.recieverName
                             } else {
                              displayname= item.userName
                             }                          
                          })}
                          <span >{displayname?.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-sm truncate text-[#2d4456]">
                              {displayname}
                            </p>
                            <Image
                              src={more}
                              alt="more"
                              width={12}
                              height={12}
                              className="opacity-50"
                            />
                          </div>
                          <p className="text-[11px] truncate text-gray-500">
                            {item.messages.at(-1)?.text || "No messages yet"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-300 flex flex-col overflow-hidden ml-4">
              {selectedchatid ? (
                <>
                  {allConversations.map((item, index) => {
                    if (item.userId === selectedchatid) {
                      allproducts.map((item4, index2) => {
                        if (userId !== item4.userId) {
                          userkiId = userId;
                          recieverId = item4.userId;
                          productId = item4.productId;
                        } else {
                          userkiId = selectedchatid;
                          recieverId = userId;
                          productId = item4.productId;
                        }
                      });

                      // yahan tum apni socket call rakh sakte ho
                      tradechatRoom(chatroom, userkiId, recieverId, productId);

                      return (
                        <React.Fragment key={index}>
                          {/* Chat Header */}
                          
                          <div className="flex items-center justify-between px-6 py-4 bg-white text-[#2d4456] border-b border-gray-300">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-[#ccdce8] rounded-full flex items-center justify-center text-[#2d4456] font-semibold text-sm shadow-sm border border-gray-400">
                                {( userId===item.recieverId? displayname= item.userName : displayname= item.recieverName)?.charAt(0).toUpperCase()}
                              </div>
                              <div>

                             {userId===item.recieverId? displayname= item.userName : displayname= item.recieverName}
                              </div>
                            </div>
                          </div>

                          {/* Messages Area */}
                          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white border-b border-gray-300">
                            {/* jesay hi selected chat khulay to saarey history k msg bhi aasakyein aur real timek bhi */}
                            {allmessages.map((msg, i) => (
                              <div key={i} className={`flex ${userId === msg.sender ? 'justify-end' : 'justify-start'}`}>
                                <div
                                  className={`max-w-lg px-4 py-3 rounded-2xl shadow-sm flex items-end space-x-2 border ${userId === msg.sender
                                      ? 'bg-[#ccdce8] text-[#2d4456] rounded-br-none border-gray-400'
                                      : 'bg-white text-[#2d4456] border-gray-300 rounded-bl-none'
                                    }`}
                                >
                                  <p className="text-sm flex-1">{msg.text}</p>
                                </div>
                              </div>
                            ))}
                            <div ref={messagesEndRef} />
                          </div>

                          {/* Message Input */}
                          <div className="px-6 py-4 bg-white border-t border-gray-300 shadow-inner">
                            <form onSubmit={submitHandler} className="flex items-center space-x-3">
                              <input
                                type="text"
                                value={themessage}
                                onChange={(e) => setthemessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-400 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#ccdce8] transition-all"
                              />
                              <button
                                type="submit"
                                disabled={!themessage.trim()}
                                className="p-3 bg-[#ccdce8] rounded-full border border-gray-400 hover:opacity-90 disabled:opacity-50 transition-all"
                              >
                                <Image src={send} alt="Send" width={20} height={20} />
                              </button>
                            </form>
                          </div>
                        </React.Fragment>
                      );
                    }
                  })}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#ccdce8]/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-400">
                      <Image src={msgicon} alt='conversation' width={35} height={35} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#2d4456] mb-2">No chats available</h3>
                    <p className="text-gray-500">Choose from your existing conversations or start a new trade</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Allmessages
