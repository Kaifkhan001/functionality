"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: ""
  });
  useEffect(() => {
   const getData = async() => {
   const response = await axios.get("/api/users/profile");
   if(response.data){
     setUser({
       fullName: response.data.user.fullName,
       email: response.data.user.email
      })
      console.log("Email and name:- ", response);
   }
    }

    getData();
  }, []);
  
  return (
    <div className='w-full h-[77vh] bg-pink-400 text-white flex flex-col gap-4 items-center justify-center'>
      <div>Hello, {user.fullName}</div> 
      <div>Email: {user.email}</div>
    </div>
  )
}

export default Page
