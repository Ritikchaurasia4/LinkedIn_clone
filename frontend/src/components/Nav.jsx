import React, { useContext, useState } from "react";
import logo2 from "../assets/logo2.png";
import { CiSearch } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

import dp from "../assets/dp.png";
import { userDataContext } from "../context/userContext";
import { authDataContext } from "../context/authContext";
import axios from "axios";

import {useNavigate} from 'react-router-dom';

const Nav = () => {
  let [activeSerach, setActiveSearch] = useState(false);

  let { userData, setUserData } = useContext(userDataContext);

  let{serverUrl} = useContext(authDataContext);

  let [showPopUp, setShowPopUp] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = async()=>{
    try{
        let result = await axios.get(serverUrl + "/api/auth/logout", {withCredentials:true});
        setUserData(null);
        navigate("/login")
        console.log(result);
    }
    catch(error){
        console.log(error);
    }
  }

  return (
    <div className="w-full h-[80px] bg-[white] fixed top-0 shadow-lg flex justify-between md:justify-around items-center px-[10px] left-0 z-[80]">
      <div className="flex justify-center items-center gap-[10px]">
        <div onClick={() => setActiveSearch(false)}>
          <img src={logo2} className="w-[50px]" />
        </div>

        {!activeSerach && (
          <div>
            <CiSearch
              className="w-[23px] h-[23px] text-gray-600 lg:hidden"
              onClick={() => setActiveSearch(true)}
            />
          </div>
        )}

        <form
          className={`w-[190px] lg:w-[350px] h-[40px] bg-[#f0efe7] lg:flex items-center gap-[10px] px-[10px] py-[5px] rounded-md ${
            !activeSerach ? "hidden" : "flex"
          }`}
        >
          <div>
            <CiSearch className="w-[23px] h-[23px] text-gray-600" />
          </div>
          <input
            type="text"
            className="w-[250px] h-full bg-transparent outline-none border-0"
            placeholder="Search Users.."
          />
        </form>
      </div>

      <div className="flex justify-around items-center gap-[20px] relative">

      {showPopUp &&  <div className="w-[300px] min-h-[300px] bg-[white] shadow-lg absolute top-[75px] rounded-lg flex flex-col items-center p-[20px] gap-[20px]">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
            <img src={dp} className="w-full h-full" />
          </div>
          <div className="text-[19px] font-semibold text-gray-700">{`${userData.firstName} ${userData.lastName}`}</div>
          <button className="w-[100%] h-[40px] rounded-full border-2 border-[#63e6e6] text-[#63e6e6]">
            View Profile
          </button>
          <div className="w-full h-[1px] bg-gray-700"></div>
          <div className="flex w-full items-center justify-start text-gray-600 gap-[10px]">
            <FaUser className="w-[23px] h-[23px] text-gray-600" />
            <div>My Networks</div>
          </div>
          <button className="w-[100%] h-[40px] rounded-full border-2 border-[#ec7272] text-[#ec7272]" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
        }

        <div className="lg:flex flex-col items-center justify-center text-gray-600 hidden">
          <IoMdHome className="w-[23px] h-[23px] text-gray-600" />
          <div>Home</div>
        </div>
        <div className="md:flex flex-col items-center justify-center text-gray-600 hidden">
          <FaUser className="w-[23px] h-[23px] text-gray-600" />
          <div>My Networks</div>
        </div>
        <div className="flex flex-col items-center justify-center text-gray-600">
          <IoIosNotifications className="w-[23px] h-[23px] text-gray-600" />
          <div className="hidden md:block">Notifications</div>
        </div>
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer" onClick={()=>setShowPopUp(prev=>!prev)}>
          <img src={dp} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
