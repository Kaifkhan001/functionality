"use client"
import axios from 'axios';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import useStore from '@/helpers/store';

const Page = () => {
    const { toggleLogg, isLogged } = useStore();
    useEffect(() => {
     try {
         axios.get("/api/users/logout");
         console.log("Successfuly Logged Out");
         toast.success("Successfully Logged Out");
         toggleLogg(false);
         localStorage.setItem("isLogged", JSON.stringify(false));
     } catch (error) {
        console.log("Error while logging out user",error);
        toast.error("Error Logout");
     }
    }, [isLogged]);
    
  return (
    <div>
      This is a logout page
    </div>
  )
}

export default Page
