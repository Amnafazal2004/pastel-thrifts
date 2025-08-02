import Sidebar from "@/Components/PanelComponents/Sidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import ThriftContextProvider, { ThriftContext } from '@/Context/ThriftContext'

export default function Layout({children}){
    return(
        <>
        <ThriftContextProvider>
         <ToastContainer theme='light'/>
        <div className="flex min-h-screen bg-[#f8fcfe] ">
      <Sidebar  />
      <main className="flex-grow">{children}</main>

    </div>
    </ThriftContextProvider>
       
        </>
    )
}
