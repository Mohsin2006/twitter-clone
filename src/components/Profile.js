import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from 'react-redux';
import useGetProfile from '../hooks/useGetProfile.js';
import axios from "axios";
import USER_API_END_POINT from "../utils/constant.js";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice.js";
import { getRefresh } from "../redux/tweetSlice.js";

const Profile = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const { user, profile } = useSelector(store => store.user);
  const {id}=useParams();
  useGetProfile(id);
 const followAndUnfollowHandler=async()=>{
  //Unfollow
  if(user.following.includes(id)){
 try {
  axios.defaults.withCredentials=true;
  const res=await axios.post(`${USER_API_END_POINT}/unfollow/${id}`,{id:user?._id});
  console.log(res);
  dispatch(followingUpdate(id))
  dispatch(getRefresh())
  toast.success(res.data.message)

 } catch (error) {
  toast.error(error.response.data.message)

  console.log(error);
 }
  }
  else{
//follow
try {
  axios.defaults.withCredentials=true;
  const res=await axios.post(`${USER_API_END_POINT}/follow/${id}`,{id:user?._id});
  console.log(res);
  dispatch(followingUpdate(id));
  dispatch(getRefresh())

  toast.success(res.data.message)
 } catch (error) {
  toast.error(error.response.data.message)

  console.log(error);
 }
  }
  
 }
  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div>
        <div className="flex items-center py-2">
          <Link to='/' className="p-2 rounded-full  hover:bg-gray-100 cursor-pointer">
            <IoIosArrowRoundBack size="24px" />
          </Link>
          <div className="ml-2">
            {profile && (
              <>
                <h1 className="font-bold text-lg">{profile.name}</h1>
                <p className="text-gray-500 text-sm">10 post</p>
              </>
            )}
          </div>
        </div>
        <img
          src="https://pbs.twimg.com/profile_banners/132385468/1645007643/600x200"
          alt="banner"
        />
        <div className="absolute top-52 ml-4 border-4 border-white rounded-full">
          <Avatar src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1710788763~exp=1710789363~hmac=c90d42e36808129bd1d3ce5b16e936b12e79981ba1052a2cafa12bd09708166c" size="120" round={true} />
        </div>
        <div className="text-right m-4">
          {
            profile?._id=== user?._id?(
              <button onClick={()=>navigate("/popup")} className="px-4 py-1 hover:bg-gray-200 border border-gray-400 rounded-full">Edit Profile</button>
            ):(
              <button onClick={followAndUnfollowHandler} className="px-4 bg-black text-white  py-1 hover:bg-blue-600 border border-gray-400 rounded-full">{user.following.includes(id)?"Following":"Follow"}</button>

            )
          }
        </div>
        <div className="m-4">
          {profile && (
            <>
              <h1 className="mt-9 font-bold text-xl">{profile.name}</h1>
              <p>{`@${profile.username}`}</p>
            </>
          )}
        </div>
        <div>
          <p>Software Developer and Creator, Film actor, artist, painter, humanitarian, Kolkata Joined April 2010,<br /> <span style={{ color: "black", fontWeight: "bold", marginRight: "6px" }}>45.5M</span>Followers
            <br /> Followed by Anupam Mittal</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
