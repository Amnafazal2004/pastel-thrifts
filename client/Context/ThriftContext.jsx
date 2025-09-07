"use client"
import { useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { connectionSocket, userIdSocket } from '@/Components/PanelComponents/Sockets';
export const ThriftContext = createContext(null);

export const useThriftContext = () =>{
  return useContext(ThriftContext)
}

const ThriftContextProvider = (props) => {

  //use user batata hai k user logged in hai k nhi 
  const { user } = useUser();
  
  const { getToken, userId } = useAuth()

  const [showloginpopup, setshowloginpopup] = useState("notshow");
  const [userData, setUserData] = useState(false)
  const [cartItems, setCartItems] = useState(false)
  const [seller, setseller] = useState(false)
  const [sidebar,setsidebar] = useState(false);

// Use ref to track if socket has been initialized for this user
  const socketInitialized = useRef(false);
  const lastUserId = useRef(null);

  useEffect(() => {
    // Only initialize socket if:
    // 1. User is logged in
    // 2. We have a userId
    // 3. Socket hasn't been initialized for this user yet
    // 4. The userId has changed (user switched accounts)
    
    if (user && userId && (!socketInitialized.current || lastUserId.current !== userId)) {
      console.log('Context useEffect - userIdSocket called for user:', userId);
      
      userIdSocket(userId);
      socketInitialized.current = true;
      lastUserId.current = userId;
    }
  }, [user, userId]); // Keep dependencies, but use ref to control execution

  // Reset socket initialization when user logs out
  useEffect(() => {
    if (!user) {
      socketInitialized.current = false;
      lastUserId.current = null;
    }
  }, [user]);

  const fetchuserdata = async () => {
    try {
      // use it only if u want to give access to some people as seller
      //    if(user.publicMetadata.role==="seller"){
      //     setseller(true)
      // }

      const token = await getToken()
   
      const { data } = await axios.get('api/user', { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        setUserData(data.user)
        setCartItems(data.user.cartItems)
      } else {
        toast.error(data.message)
      }
    
    }
    catch (error) { 
   console.log('Full error:', error);
    console.log('Error response:', error.response?.data);
    toast.error(error.response?.data?.message || error.message);
  }

  }

  //do this also for the seller dashboard
  // useEffect(() => {
  //   if (user) {
  //     fetchuserdata()
  //   }
  // }, [user])


  const contextValue = {
    user, getToken, userData, cartItems,
    showloginpopup, setshowloginpopup, userId,setsidebar,sidebar
  }

  return (
    <ThriftContext.Provider value={contextValue}>
      {props.children}
    </ThriftContext.Provider>
  )
}

export default ThriftContextProvider
