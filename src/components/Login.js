import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import USER_API_END_POINT from "../utils/constant.js"; // Importing USER_API_END_POINT from constant.js
import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice.js";
const Login = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler =async (e) => {
    e.preventDefault();
    if(isLogin){
    //login
    try {
      const res=await axios.post(`${USER_API_END_POINT}/login`, {email,password},{
        headers:{
          "Content-Type":"application/json"

          },
          withCredentials:true
        });
        dispatch(getUser(res?.data?.user));
        console.log(res);
        if(res.data.success){
         navigate("/")
          toast.success(res.data.message)
         }
    } catch (error) {
      toast.success(error.response.data.message)

      console.log(error);
    }

    }else{
    //signup
    try {
      const res=await axios.post(`${USER_API_END_POINT}/register`, {name, username,email,password},{
        headers:{
          "Content-Type":"application/json"

        },
        withCredentials:true
      });
      console.log(res);

      if(res.data.success){
        setIsLogin(true)
       toast.success(res.data.message)
      }
    } catch (error) {
      toast.success(error.response.data.message)

      console.log(error);
    }
    }
  };

  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img
            className="ml-5"
            width={"300px"}
            src="https://freepnglogo.com/images/all_img/1691832278twitter-x-logo-png.png"
            alt="twitter-logo"
          />
        </div>
        <div className="">
          <div className="my-5">
            <h1 className="font-bold text-6xl">Happening Now</h1>
          </div>
          <h1 className="my-4 text-4xl font-bold">
            {isLogin ? "Login" : "Signup"}
          </h1>
          <form onSubmit={submitHandler} className="flex flex-col w-[55%]">
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-semibold outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1"
                />
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="font-semibold outline-blue-500  border border-gray-800 px-3 py-1 rounded-full my-1"
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-semibold outline-blue-500  border border-gray-800 px-3 py-1 rounded-full my-1"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-semibold outline-blue-500  border border-gray-800 px-3 py-1 rounded-full"
            />
            <button className="bg-[#1D9BF0] border-none py-2 rounded-full text-lg text-white my-4">
              {isLogin ? "Login" : "Signup"}
            </button>

            <h1>
              {isLogin
                ? "Do not have an account?"
                : " Already have an account?"}{" "}
              <span
                className="text-bold text-blue-600 cursor-pointer"
                onClick={loginSignupHandler}
              >
                {isLogin ? "Create account" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
