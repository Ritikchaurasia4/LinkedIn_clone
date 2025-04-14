import React, { useContext, useState } from 'react'
import Nav from '../components/Nav';
import dp from "../assets/dp.png"
import { FaPlus } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import { userDataContext } from '../context/userContext';
import { FaPencil } from "react-icons/fa6";
import EditProfile from '../components/EditProfile';


const Home = () => {

  let{userData, setUserData, edit, setEdit} = useContext(userDataContext);

  return (
    <div className='w-full min-h-[100vh] bg-[#f0efe7] pt-[100px] flex items-start justify-center gap-[20px] px-[20px] flex-col lg:flex-row'>
      {edit && <EditProfile edit={edit} setEdit={setEdit} />}
      {/* <EditProfile /> */}
      <Nav/>

      <div className='w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg rounded-lg p-[10px] relative'>
        <div className='w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center relative cursor-pointer' onClick={() => setEdit(true)}>
          <img src="" className='w-full'/>
          <CiCamera className='absolute right-[20px] top-[20px] w-[25px] h-[25px] text-white' />
        </div>
        <div className="w-[70px] h-[70px] rounded-full overflow-hidden items-center justify-center absolute top-[65px] left-[35px] cursor-pointer" onClick={() => setEdit(true)}>
          <img src={dp} className=" h-full" />
        </div>
        <div className='w-[20px] h-[20px] bg-[aqua] absolute top-[105px] left-[90px] rounded-full flex items-center justify-center cursor-pointer' onClick={() => setEdit(true)}>
          <FaPlus className='text-white' />
        </div>

        <div className='mt-[30px] pl-[20px] text-[19px] font-semibold text-gray-700'>
          <div>{`${userData.firstName} ${userData.lastName}`}</div>
          <div className='text-[19px] font-semibold text-gray-700'>{userData.headLine || ""}</div>
          <div className=' text-[16px]  text-gray-500'>{userData.location}</div>
        </div>
        <button className="w-[100%] h-[40px] rounded-full border-2 border-[#63e6e6] text-[#63e6e6] my-[30px] flex items-center justify-center cursor-pointer gap-[10px]" onClick={() => setEdit(true)}>
          Edit Profile
          <div><FaPencil /></div>
        </button>
      </div>

      <div className='w-full lg:w-[50%] min-h-[200px] bg-[white] shadow-lg rounded-lg'></div>

      <div className='w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg rounded-lg'></div>
    </div>
  )
}

export default Home;