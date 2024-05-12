import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant.js"; // Importing the tweet API endpoint constant
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice.js";
import { MdOutlineDelete } from "react-icons/md";


const Tweet = ({ tweet }) => {
  const { user } = useSelector(store =>store.user);
  const dispatch = useDispatch();

  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };
 
  const deleteTweetHandler=async(id)=>{
try {
  const res=await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`,{
    withCredentials:true
  })
  console.log(res)
  dispatch(getRefresh())
  toast.success(res.data.message)
} catch (error) {
  toast.success(error.response.data.message)

  console.log(error);
}
  }
  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1710788763~exp=1710789363~hmac=c90d42e36808129bd1d3ce5b16e936b12e79981ba1052a2cafa12bd09708166c"
            size="50"
            round={true}
          />
          <div className="ml-2 w-full">
            <div className="flex items-center ml-1">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ">{`@${tweet?.userDetails[0]?.username} .1m`}</p>
            </div>
            <div>
              <p>{tweet?.description}</p>
            </div>
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <FaRegComment size="20px" />
                </div>
                <p>0</p>
              </div>
              <div className="flex items-center">
                <div onClick={() => likeOrDislikeHandler(tweet?._id)} className="p-2 hover:bg-pink-200 rounded-full cursor-pointer">
                  <CiHeart size="24px" />
                </div>
                <p>{tweet?.like?.length}</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer">
                  <CiBookmark size="24px" />
                </div>
                <p>0</p>
              </div>
             {
              user?._id===tweet?.userId && (
                <div onClick={()=>deleteTweetHandler(tweet?._id)} className="flex items-center">
                <div className="p-2 hover:bg-red-500 rounded-full cursor-pointer">
                  < MdOutlineDelete size="24px" />
                </div>
                <p>0</p>
              </div>
              )
             }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
