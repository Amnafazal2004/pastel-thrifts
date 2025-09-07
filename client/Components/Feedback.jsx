import React from 'react'

const Feedback = () => {
  return (
   <div  id="Feedback"className="w-full h-80 flex flex-col justify-center items-center bg-[#ccdce8] px-4">
  <h2 className="text-2xl md:text-3xl font-bold text-[#2B5E84] text-center mb-4">
    We’d love to hear your thoughts!
  </h2>
  <p className="text-sm md:text-base text-gray-600 text-center mb-6 max-w-md">
    Your feedback helps us improve and bring you even better thrift finds. Share your ideas, suggestions, or just say hi!
  </p>
  <button className="bg-[#5F97C3] text-white text-sm md:text-base py-2 px-6 rounded-full hover:bg-[#4B85B4] transition">
    Leave Feedback
  </button>
</div>

  )
}

export default Feedback
