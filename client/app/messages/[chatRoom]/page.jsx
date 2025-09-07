"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useThriftContext } from '@/Context/ThriftContext';;
import { useRouter } from 'next/navigation';

const page = () => {
  const params = useParams();
  const { userId } = useThriftContext();
  const [conversation, setConversation] = useState(null);
   const router = useRouter()
  

  const fetchconversation = async () => {

    const { data } = await axios.get(`/api/conversation`, {
      params: {
        id: params.chatRoom
      }
    });
    setConversation(data);
  }

  


  useEffect(() => {
    fetchconversation();
  }, [])

   router.push(`/Panel/allmessages`);
  return (
    <>
    


    </>

  )

}
export default page
