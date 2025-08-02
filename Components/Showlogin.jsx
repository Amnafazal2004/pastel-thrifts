import { ThriftContext } from '@/Context/ThriftContext'
import React, { useContext } from 'react'
import Loginpopup from './Loginpopup';

const Showlogin = () => {
    const {showloginpopup} = useContext(ThriftContext);

  return (
    <div>
     { showloginpopup==="show"?<Loginpopup/>:""}
    </div>
  )
}

export default Showlogin
