import React, { useContext, useState } from 'react'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/authContext';
import axios from 'axios';
const SignUp = () => {

  const{serverUrl} = useContext(authDataContext);

  let[show, setShow] = useState(false);
  let navigate = useNavigate();

  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[userName, setUserName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const[loading, setLoading] = useState(false);

  const[err, setErr] = useState("");  // useState to show the error


  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      let res = await axios.post(serverUrl+"/api/auth/signup",{firstName, lastName, userName, email, password}, {withCredentials:true});
      console.log(res.data);  
      setErr("");
      setLoading(false);
      setFirstName("");
      setLastName("");
      setUserName("");
      setEmail("");
      setPassword("");
    }
    catch(error){
      setErr(error.response.data.message);
      // console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className='w-full h-screen bg-[white] flex  flex-col items-center justify-start gap-[10px]'>
      <div className='p-[30px] lg:p-[35px] w-full flex items-center'>
        <img src={logo}  />
      </div>
      <form className='w-[90%] max-w-[400px] h-[600px] md:shadow-xl flex flex-col justify-center gap-[10px] bg-white rounded-[15px] p-[15px]' onSubmit={handleSignUp}>
        <h1 className='text-gray-800 text-[30px] font-semibold mb-[30px]'>Sign Up</h1>
        <input className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' type="text" placeholder='firstname' required value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
        <input className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' type="text" placeholder='lastname' required value={lastName} onChange={(e)=>setLastName(e.target.value)}  />
        <input className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' type="text" placeholder='username' required value={userName}  onChange={(e)=>setUserName(e.target.value)}/>
        <input className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' type="email" placeholder='email' required value={email}  onChange={(e)=>setEmail(e.target.value)}/>
        
        <div className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] rounded-md relative'>
          <input type={show ? "text" : "password"} className='w-full h-full border-none text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' placeholder='password' required value={password}  onChange={(e)=>setPassword(e.target.value)} />
          <span className='absolute right-[20px] top-[10px] text-blue-800 cursor-pointer' onClick={()=>setShow(prev=>!prev)}>{show ? "hidden" : "show"}</span>
        </div>
        {err && <p className='text-center text-red-500'>*{err}</p> }  
        <button className='w-[100%] h-[50px] bg-[#1dc9fd] text-white rounded-full mt-[40px]' disabled={loading}>{loading?"loading...":"Sign Up"}</button>
        <p className='text-center cursor-pointer' onClick={()=>navigate("/login")}>Already have an Account ? <span className='text-blue-800'>Sign In</span></p> 
      </form>
    </div>
  )
}

export default SignUp;