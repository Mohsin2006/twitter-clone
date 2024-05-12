import React, { useEffect } from 'react'
import LeftSideBar from './LeftSideBar.js'
import RightSideBar from './RightSideBar.js'
import { Outlet, useNavigate } from 'react-router-dom'
import useOtherUsers from '../hooks/useOtherUsers.js'
import { useSelector } from 'react-redux'
import useGetMyTweet from '../hooks/useGetMyTweet.js'
const Home = () => {
  const {user, otherUsers}=useSelector(store=>store.user);

  const navigate=useNavigate()
  useEffect(()=>{
    if(!user){
      navigate("/login")
        }
  },[navigate,user])
 
//custom hook
useOtherUsers(user?._id)
useGetMyTweet(user?._id)
  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <LeftSideBar/>
      <Outlet/>
      <RightSideBar otherUsers={otherUsers}/>
    </div>
  )
}

export default Home
