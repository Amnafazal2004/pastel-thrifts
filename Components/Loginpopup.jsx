"use client"
import { ThriftContext } from '@/Context/ThriftContext';
import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
//link doesnt work if there is no content in it

const Loginpopup = () => {

  const { setshowloginpopup, usingusername, setusingusername } = useContext(ThriftContext);
  const [isLogin, setIsLogin] = useState("false");
  const [passlength, setpasslength] = useState("false");
  const [successlogin, setsuccesslogin] = useState(false);
  const [successignup, setsuccessignup] = useState(false);
  const [invalidusername, setinvalidusername] = useState(false);
  const router = useRouter();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const onChangeHandler = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }));
    
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();


    if ((data.password).length < 8) {
      setpasslength("true");
      setData({
        username: "",
        email: "",
        password: ""
      });
    }

    else {
      setpasslength("false");

      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);

      if (isLogin === "false") {
        const response1 = await axios.get('/api/user', {
          params: {
            username: data.username,
            email: data.email
          }
        });
        if (response1.data.success) {
          const response = await axios.post('/api/user', formData);
          if (response.data.success) {
            toast.success(response.data.msg);
            setsuccessignup(true);
            Cookies.set('username', data.username);
            
            setData({
              username: "",
              email: "",
              password: ""
            });
          }
          else {
            toast.error("Error");
          }
        }
        else {
          setinvalidusername(true);
          setData({
            username: "",
            email: "",
            password: ""
          });

        }
      }
      else {
        setData({
          username: data.username,
          email: "",
          password: data.password
        })
        const response = await axios.get('/api/user', {
          params: {
            username: data.username,
            password: data.password
          }
        });
        if (response.data.success) {
          toast.success(response.data.msg);
          Cookies.set('username', data.username);
          setsuccesslogin(true);

          setData({
            username: "",
            email: "",
            password: ""
          });

        }
        else {
          toast.error(response.data.msg);
          setData({
            username: "",
            email: "",
            password: ""
          });
        }
      }
    }
  }

  //this redirects to the panel page from the login 
  useEffect(() => {
    if (successlogin || successignup) {
      router.push('/Panel')
    }
  }, [successlogin,successignup])


  return (
    <>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000090]  absolute bg-opacity-150">
        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
          {/* Close button */}
          <button
            onClick={() => setshowloginpopup("notshow")}

            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>

          {/* Heading */}
          <h2 className="text-2xl font-[playfair_Display] font-bold text-center text-[#2B5E84] mb-4">
            {isLogin == "true" ? 'Login to Your Account' : 'Create a New Account'}
          </h2>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-3">
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={onChangeHandler}
              placeholder="Username"
              className="border font-[outfit] border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A3CCE9]"
            />

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              className={isLogin == "false" ? "border font-[outfit] border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A3CCE9]" : "hidden"}
            />

            <input
              type="password"
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              placeholder="Password"
              className="border border-gray-300 font-[outfit] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A3CCE9]"
            />
            <p className={passlength === "true" ? "text-xs text-red-500 mt-1" : "hidden"}>
              Password must be at least 8 characters long.
            </p>
            <p className={invalidusername && isLogin === "false" ? "text-xs text-red-500 mt-1" : "hidden"}>
              Username or Email already exists
            </p>
            <button href='/Panel'
              type="submit"
              className="bg-[#2B5E84] text-white font-[playfair_Display] rounded px-4 py-2 hover:bg-[#4B85B4] transition"
            >
              {isLogin === "true" ? "Log in" : "Sign up"}

            </button>


          </form>

          {/* Toggle link */}
          <div className="text-sm text-center mt-3">

            {isLogin === "true" ? (
              <div className='font-[outfit]'>
                Don't have an account?{' '}
                <button onClick={() => setIsLogin("false")} className="text-[#2B5E84] font-semibold hover:underline">

                  Sign Up
                </button>

              </div>

            ) :
              <div className='font-[outfit]'>
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin("true")}
                  className="text-[#2B5E84] font-semibold hover:underline"
                >
                  Login
                </button>
              </div>
            }
          </div>
        </div>
      </div>


    </>
  )
}

export default Loginpopup
