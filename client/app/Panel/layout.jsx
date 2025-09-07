"use client"
import Sidebar from "@/Components/PanelComponents/Sidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import ThriftContextProvider, { ThriftContext, useThriftContext } from '@/Context/ThriftContext'
import Footer from "@/Components/Footer";

export default function Layout({children}){
    const {sidebar} = useThriftContext();
    return(
        <>

         <ToastContainer theme='light'/>
        <div className="flex min-h-screen bg-[#f8fcfe] ">
    <Sidebar  />
      <main className="flex-grow">{children}</main>
      

    </div>
  

        </>
    )
}
