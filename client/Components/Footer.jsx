import React from 'react'
import facebook_icon from '@/Assets/facebook_icon.png';
import twitter_icon from '@/Assets/twitter_icon.png';
import linkedin_icon from '@/Assets/linkedin_icon.png';
import Image from 'next/image';


const Footer = () => {
  return (
   

    <>
      <div id="Contact" className='text-footer bg-grey1 flex-col items-center gap-5 p-5 pt-20 bg-[#155076] ' >
       <div className="flex justify-between ">
        <div className="footercontentleft">
           <h1 className='font-bold text-2xl text-white font-[playfair_display] mb-5'>PASTEL THRIFTS</h1>
           <p className='w-96 font-[outfit] text-sm text-white'>Thank you for visiting our site. We are committed to providing you with the best experience possible. If you have any questions or feedback, please don't hesitate to contact us. Stay connected by following us on social media, and be the first to know about our latest updates and offers. Your privacy is important to us, and we ensure your information is kept secure. All rights reserved</p>
           <div className="flex space-x-3 mt-6 mb-6">
            <Image src={facebook_icon}  alt="" />
            <Image src={twitter_icon} alt="" />
            <Image src={linkedin_icon} alt="" />
           </div>
        </div>
        <div className="">
            <h2 className='font-bold font-[playfair_display] text-white text-xl mb-4 '>COMPANY</h2>
            <ul className='font-[outfit] text-sm text-white'>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="mr-32 ">
            <h2 className='text-xl font-bold mb-4 font-[playfair_display] text-white'>GET IN TOUCH</h2>
            <ul className='font-[outfit] text-sm text-white'>
              <li>+1-233-2333-2233</li>
              <li>contact@PastelThrifts.com</li>
            </ul>
        </div>
       </div>
       <hr className=' text-white'/>
       <p className="text-center font-[outfit] mt-2 text-sm text-white">
        Copyright 2024 © PastelThrifts.com. All rights reserved
       </p>
    </div>

    </>
  )
}

export default Footer

