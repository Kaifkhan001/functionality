/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        fullName: "",
        username: "",
        email: "", 
        password: "",
        confirmPass: ""
    })
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(user.password !== user.confirmPass){
        console.log("Password isn't matching");
        toast.error("Password isn't matching");
        return;
    }
    try {
        const response = await axios.post("/api/users/signup", user, {
          validateStatus: (status) =>
            (status >= 200 && status < 300) || status === 409,
        });
        console.log("response status: -",response.status);
        if (response.status === 409) {
          console.log("User already exist");
          toast.error("User already exists");
        } else if (response.status === 200) {
          console.log("Your sign up completed successfully");
          toast.success("Sign-Up Successfull");
          localStorage.setItem("isLogged", JSON.stringify(true));
          setUser({
            fullName: "",
            username: "",
            email: "",
            password: "",
            confirmPass: "",
          });
          router.push("/login");
        }
      } catch (error: any) {
          console.log("Something went wrong while sign-up!!", error);
          toast.error("Sign-up fail");
         }
    }
  return (
    <div className=" w-full h-[77vh] sm:min-h-[100vh] sm:my-8 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex border-2 border-sky-600 flex-col px-6 py-10 rounded-xl items-center justify-center gap-4"
      >
        <input
          className="px-3 py-1 outline-none bg-transparent border-gray-600 border-b-[2px] pb-4  text-white text-xl rounded-xl "
          type="text"
          placeholder="Full Name..."
          value={user.fullName}
          onChange={(e) => setUser({...user, fullName: e.target.value})}
        />

        <input
          className="px-3 py-1 outline-none bg-transparent border-gray-600 border-b-[2px] pb-4  text-white text-xl rounded-xl "
          type="text"
          placeholder="Username..."
          value={user.username}
          onChange={(e) => setUser({...user, username: e.target.value})}
        />

        <input
          className="px-3 py-1 outline-none bg-transparent border-gray-600 border-b-[2px] pb-4  text-white text-xl rounded-xl "
          type="email"
          placeholder="Email..."
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
        />

        <input
          className="px-3 py-1 outline-none bg-transparent border-gray-600 border-b-[2px] pb-4  text-white text-xl rounded-xl "
          type="password"
          placeholder="Password..."
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
        />

        <input
          className="px-3 py-1 outline-none bg-transparent border-gray-600 border-b-[2px] pb-4  text-white text-xl rounded-xl "
          type="password"
          placeholder="Confirm Password..."
          value={user.confirmPass}
          onChange={(e) => setUser({...user, confirmPass: e.target.value})}
        />

        <button className="bg-sky-500 text-xl text-white px-4 py-1 rounded-xl hover:bg-sky-600 ">
          Sign-Up
        </button>
      </form>
    </div>
  );
}

export default Page
