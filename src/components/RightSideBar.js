import React from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const RightSideBar = ({otherUsers}) => {
  return (
    <div className="w-[25%]">
      <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none ">
        <CiSearch size="21px" />
        <input
          type="text"
          className="bg-transparent outline-none px-2"
          placeholder="Search"
        />
      </div>
      <div className="p-4  bg-gray-100 rounded-2xl my-4">
        <h1 className="font-bold  text-lg">Who to Follow</h1>
       {
        otherUsers?.map((user)=>{
          return(
            <div key={user?._id} className="flex items-center justify-between my-3">
            <div className="flex">
              <div>
              <Avatar
                src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1710788763~exp=1710789363~hmac=c90d42e36808129bd1d3ce5b16e936b12e79981ba1052a2cafa12bd09708166c"
                size="50"
                round={true}
              />
              </div>
             
              <div className="ml-2">
                <h1 className="font-bold">{user?.name}</h1>
                <p className="text-sm">{`@${user?.username}`}</p>
              </div>
            </div>
            <div>
              <Link to={`/profile/${user?._id}`}>
              <button className="px-4 py-1 bg-black text-white rounded-full">Profile</button>

              </Link>
  
            </div>
          </div>
          )
        })
       }

       
       
      </div>

      
    </div>
  );
};

export default RightSideBar;
