import React, { useContext, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { userDataContext } from "../context/userContext";
import dp from "../assets/dp.png";
import { FaPlus } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import axios from "axios";
import { authDataContext } from "../context/authContext";
const EditProfile = () => {
  let { edit, setEdit, userData, setUSerData } = useContext(userDataContext);

  let {serverUrl} = useContext(authDataContext);

  let[firstName, setFirstName] = useState(userData.firstName || "");
  let[lastName, setLastName] = useState(userData.lastName || "");
  let[headLine, setHeadLine] = useState(userData.headLine || "");
  let[location, setLocation] = useState(userData.location || "");
  let[userName, setUserName] = useState(userData.username || "");
  let[gender, setGender] = useState(userData.gender || "");

  let[skills, setSkills] = useState(userData.skills || []);

  let[newSkills, setNewSkills] = useState("");

  
  let[education, setEducation] = useState(userData.education || []);

  let[newEducation, setNewEducation] = useState({
    college:"",
    degree:"",
    fieldOfStudy:""
  });

  let[experience, setExperience] = useState(userData.experience || []);

  let[newExperience, setNewExperience] = useState({
    title:"",
    company:"",
    description:"",
  });

  let[frotendProfileImage, setFrotendProfileImage] = useState(userData.profileImage || dp);
  let[backendProfileImage, setBackendProfileImage] = useState(null);

  let[frotendCoverImage, setFrotendCoverImage] = useState(userData.coverImage || null);
  let[backendCoverImage, setBackendCoverImage] = useState(null);

  const profileImage = useRef();
  const coverImage = useRef();

  const addSkill = (e)=>{
    e.preventDefault();
    if(newSkills && !skills.includes(newSkills)){
        setSkills([...skills, newSkills])
    }
    setNewSkills("");
  }

  const removeSkill =(skill)=>{
    if(skills.includes(skill)){
        setSkills(skills.filter((s)=> s!==skill));
    }
  }

  const addEducation = (e)=>{
    e.preventDefault();
    if(newEducation.college && newEducation.degree && newEducation.fieldOfStudy){
        setEducation([...education, newEducation])
    }
    setNewEducation({
        college:"",
        degree:"",
        fieldOfStudy:""
    });
  }

  const removeEducation = (edu)=>{
    if(education.includes(edu)){
        setEducation(education.filter((e)=> e!==edu));
    }
  }

  const addExperience = (e)=>{
    e.preventDefault();
    if(newExperience.title && newExperience.company && newExperience.description){
        setExperience([...experience, newExperience])
    }
    setNewExperience({
        title:"",
        company:"",
        description:""
    });
  }

  const removeExperience = (exp)=>{
    if(experience.includes(exp)){
        setExperience(experience.filter((e)=> e!==exp));
    }
  }

  const handleProfileImage = (e)=>{
    let file = e.target.files[0];
    setFrotendProfileImage(URL.createObjectURL(file));
    setBackendProfileImage(file);
  }

  const handleCoverImage = (e)=>{
    let file = e.target.files[0];
    setFrotendCoverImage(URL.createObjectURL(file));
    setBackendCoverImage(file);
  }

  const handleSaveProfile = async () =>{
    try{
      let formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userName", userName);
      formData.append("headLine", headLine);
      formData.append("location", location);
      formData.append("skills", JSON.stringify(skills));
      formData.append("education",JSON.stringify(education));
      formData.append("experience",JSON.stringify(experience));

      if(backendProfileImage){
        formData.append("profileImage", backendProfileImage); 
      }
      if(backendCoverImage){
        formData.append("coverImage", backendCoverImage); 
      }

      let result = await axios.put(serverUrl + "/api/user/updateprofile", formData, {withCredentials:true});
      console.log(result);
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div className="w-full h-[100vh] fixed top-0  z-[100] flex items-center justify-center">

      {/* input for profile image */}
      <input type="file" accept="/image/*" hidden ref={profileImage} onChange={handleProfileImage}/>  

      {/* input for cover image */}
      <input type="file" accept="/image/*" hidden ref={coverImage} onChange={handleCoverImage}/>  

      <div className="w-full h-full bg-black opacity-[0.5] absolute "></div>
      <div className="w-[90%] max-w-[500px] h-[600px] bg-white relative z-index-[200] rounded-lg shadow-lg p-[10px] overflow-auto ">
        <div
          className="absolute  right-[20px] top-[20px] cursor-pointer "
          onClick={() => setEdit(false)}
        >
          <RxCross1 className="text-gray-800 font-bold w-[25px] h-[25px] cursor-pointer " />
        </div>

        <div className="w-full h-[150px] bg-gray-500 rounded-lg mt-[40px] overflow-hidden cursor-pointer " onClick={()=>coverImage.current.click()}>
          <img src={frotendCoverImage} className="w-full" />
          <CiCamera className='absolute right-[20px] top-[70px] w-[25px] h-[25px] text-white' />
        </div>
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden absolute top-[150px] ml-[20px] cursor-pointer " onClick={()=>profileImage.current.click()}>
          <img src={frotendProfileImage} className="w-full h-full" />
        </div>
        <div className="w-[20px] h-[20px] bg-[aqua] absolute top-[200px] left-[90px] rounded-full flex items-center justify-center cursor-pointer">
          <FaPlus className="text-white" />
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-[20px] mt-[50px]">
            <input className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg" type="text" placeholder="firstName..." value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
            <input className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg" type="text" placeholder="lastname..." value={lastName} onChange={(e)=>setLastName(e.target.value)}  />
            <input className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg" type="text" placeholder="username..." value={userName} onChange={(e)=>setUserName(e.target.value)} />
            <input className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg" type="text" placeholder="headline..." value={headLine} onChange={(e)=>setHeadLine(e.target.value)} />
            <input className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg" type="text" placeholder="location..." value={location} onChange={(e)=>setLocation(e.target.value)} />
            <input className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg" type="text" placeholder="gender(male/female/other)" value={gender} onChange={(e)=>setGender(e.target.value)}  />

           <div className="w-full border-2 p-[10px] border-gray-600 rounded-lg flex flex-col gap-[10px]">
            <h1>Skills</h1>
            {
                skills && <div className="flex flex-col gap-[10px]">
                    {skills.map((skills, index)=>(
                        <div key={index} className="w-full h-[40px] border-[1px] border-gray-600 bg-gray-200 p-[10px] rounded-lg flex justify-between items-center"><span>{skills}</span><RxCross1 className="text-gray-800 font-bold w-[20px] h-[20px] cursor-pointer " onClick={()=>removeSkill(skills)} /></div>
                    ))}
                </div>
            }
            <div action="" className="flex flex-col items-start  gap-[10px] " >
                <input type="text" placeholder="Add new skills" value={newSkills} onChange={(e)=>setNewSkills(e.target.value)} className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"  />
                <button className="w-[100%] h-[40px] rounded-full border-2 border-[#63e6e6] text-[#63e6e6] cursor-pointer" onClick={addSkill}>Add</button>
            </div>
           </div>

           <div className="w-full border-2 p-[10px] border-gray-600 rounded-lg flex flex-col gap-[10px]">
            <h1>Education</h1>
            {
                education && <div className="flex flex-col gap-[10px]">
                    {education.map((edu, index)=>(
                        <div key={index} className="w-full  border-[1px] border-gray-600 bg-gray-200 p-[10px] rounded-lg flex justify-between items-center">
                            <div>
                                <div>College:{edu.college}</div>
                                <div>Degree:{edu.degree}</div>
                                <div>FieldOfStudy:{edu.fieldOfStudy}
                            </div>
                        </div><RxCross1 className="text-gray-800 font-bold w-[20px] h-[20px] cursor-pointer" onClick={()=>removeEducation(edu)}/></div>
                    ))}
                </div>
            }
            <div action="" className="flex flex-col items-start  gap-[10px] " >
                <input type="text" placeholder=" college..." value={newEducation.college} onChange={(e)=>setNewEducation({...newEducation, college:e.target.value})} className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"  />

                <input type="text" placeholder=" degree..." value={newEducation.degree} onChange={(e)=>setNewEducation({...newEducation, degree:e.target.value})} className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"  />

                <input type="text" placeholder=" fieldofstudy..." value={newEducation.fieldOfStudy} onChange={(e)=>setNewEducation({...newEducation, fieldOfStudy:e.target.value})} className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"  />
                <button className="w-[100%] h-[40px] rounded-full border-2 border-[#63e6e6] text-[#63e6e6] cursor-pointer" onClick={addEducation}>Add</button>
            </div>
           </div>

           <div className="w-full border-2 p-[10px] border-gray-600 rounded-lg flex flex-col gap-[10px]">
            <h1>Experience</h1>
            {
                experience && <div className="flex flex-col gap-[10px]">
                    {experience.map((exp, index)=>(
                        <div key={index} className="w-full  border-[1px] border-gray-600 bg-gray-200 p-[10px] rounded-lg flex justify-between items-center">
                            <div>
                                <div>titile:{exp.title}</div>
                                <div>company:{exp.company}</div>
                                <div>description:{exp.description}
                            </div>
                        </div><RxCross1 className="text-gray-800 font-bold w-[20px] h-[20px] cursor-pointer" onClick={()=>removeExperience(exp)}/></div>
                    ))}
                </div>
            }
            <div action="" className="flex flex-col items-start  gap-[10px] " >
                <input type="text" placeholder=" title..." value={newExperience.title} onChange={(e)=>setNewExperience({...newExperience, title:e.target.value})} className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"  />

                <input type="text" placeholder=" company..." value={newExperience.company} onChange={(e)=>setNewExperience({...newExperience, company:e.target.value})} className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"  />

                <input type="text" placeholder=" description..." value={newExperience.description} onChange={(e)=>setNewExperience({...newExperience, description:e.target.value})} className="w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"  />
                <button className="w-[100%] h-[40px] rounded-full border-2 border-[#63e6e6] text-[#63e6e6] cursor-pointer" onClick={addExperience}>Add</button>
            </div>
          </div>

          <button className='w-[100%] h-[50px] bg-[#1dc9fd] text-white rounded-full mt-[40px]' onClick={()=>handleSaveProfile()} >Save Profile</button>

        </div>
      </div>
    </div>
  );
};

export default EditProfile;
