"use client"
import Shopitems from '@/Components/PanelComponents/Shopitems'
import Shopnow from '@/Components/PanelComponents/Shopnow'
import { useThriftContext  } from '@/Context/ThriftContext'
import React from 'react'
import { useEffect } from 'react'

const page = () => {
  const {setsidebar} = useThriftContext()

useEffect(() => {
setsidebar(true);
    }, [setsidebar]);
  return (
    <div>
     
      <Shopnow/>
    </div>
  )
}

export default page
