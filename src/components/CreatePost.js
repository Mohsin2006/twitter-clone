import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_END_POINT } from "../utils/constant.js";
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { getIsActive, getRefresh } from "../redux/tweetSlice.js";
const CreatePost = () => {
  const [description, setDescription]=useState("");
const {user}=useSelector(store=>store.user);
const {isActive}=useSelector(store=>store.tweet)
const dispatch=useDispatch()

  const submitHandler= async()=>{
    try {
      const res=await axios.post(`${TWEET_API_END_POINT}/create`,{description, id:user?._id},{
        withCredentials:true
      });
      dispatch(getRefresh())

      if(res.data.success){
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);

      console.log(error);
    }
    setDescription("")
  }
  const forYouHandler=()=>{
dispatch(getIsActive(true))
  }

  const followingHandler=()=>{
    dispatch(getIsActive(false))

  }
  return (
    <div className="w-[100%] ">
      <div className="">
        <div className="flex items-center justify-evenly border-b border-gray-200 ">
          <div onClick={forYouHandler} className={`${isActive?"border-b-4 border-blue-900 ":null}cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
            <h1 className="font-semibold cursor-pointer text-gray-600 text-lg ">
              For You
            </h1>
          </div>
          <div onClick={followingHandler} className={`${!isActive?"border-b-4 border-blue-900 ":null}cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
            <h1 className="font-semibold  text-gray-600 text-lg ">Following</h1>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex item-center p-4">
            <div>
            <Avatar src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1710788763~exp=1710789363~hmac=c90d42e36808129bd1d3ce5b16e936b12e79981ba1052a2cafa12bd09708166c" size="50" round={true} />
            </div>
            <input value={description} onChange={(e)=>setDescription(e.target.value)} className="w-full ml-2 outline-none border-none text-lg" type="text" placeholder="What is happening?!" />
        </div>
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div>
                <CiImageOn size='24'/>
            </div>
           <button onClick={submitHandler} className="bg-[#1D9BF0] rounded-full px-4 py-1 text-lg text-white border-none">Post</button> 
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
