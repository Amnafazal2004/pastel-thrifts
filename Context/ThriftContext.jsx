"use client"
import { useUser } from '@clerk/nextjs';
import React, {createContext, useState } from 'react';
export const ThriftContext=createContext(null);

const ThriftContextProvider = (props) => {

//use user batata hai k user logged in hai k nhi 
   const {user} = useUser();
    const [showloginpopup,setshowloginpopup] = useState("notshow");


    const contextValue={
       user,
        showloginpopup,setshowloginpopup
    }

  return (
   <ThriftContext.Provider value={contextValue}>
    {props.children}
   </ThriftContext.Provider>
  )
}

export default ThriftContextProvider
