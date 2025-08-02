"use client"
import React, { useContext } from 'react'
import Header from '@/Components/Header'
import NewArrivals from '@/Components/NewArrivals'
import Extra from '@/Components/Extra'
import Tape from '@/Components/Tape'
import Aboutus from '@/Components/Aboutus'
import Feedback from '@/Components/Feedback'
import Footer from '@/Components/Footer'
import Loginpopup from '@/Components/Loginpopup'
import ThriftContextProvider, { ThriftContext } from '@/Context/ThriftContext'
import Showlogin from '@/Components/Showlogin'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


const page = () => {
 

  return (
    <ThriftContextProvider>
      <ToastContainer theme='light'/>
    <div>
    
      <Header/>
      <NewArrivals/>
      <Extra/>
      <Tape/>
      <Aboutus/>
      <Feedback/>
      <Footer/>
   
 
    </div>
    </ThriftContextProvider>
  )
}

export default page
