"use client"
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import useStore from '@/helpers/store'

const Page = () => {
  const [loading, setLoading] = useState(false)
  const { toggleLogg} = useStore();
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user, {
          validateStatus: (status) =>
            (status >= 200 && status < 300) || status === 409,
        });
        if (response.status === 409) {
          console.log("User Doesn't exist");
          toast.error("User Doesn't Exist");
          setLoading(false);
          return;
        } else {
          localStorage.setItem("isLogged", JSON.stringify(true));
          console.log("Successfully logged In");
          toast.success("Successfully Logged In");
          toast.success("You are bieng reidrected to the dashboard area");
          toggleLogg(true);
          setLoading(false)
          router.push("/dashboard");
        }
      } catch (error) {
        console.log("Error While Login", error);
        toast.error("Error While Logging");
        setLoading(false);
        return;
      }
    };
  return (
    <div className="w-full h-[77vh] sm:h-[65vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="border-2 flex items-center justify-center flex-col gap-4 border-green-400 rounded-xl p-8 w-[30vmax]"
      >
        <input
          className="bg-transparent outline-none border-b-2 border-gray-500 pb-2"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="email"
          placeholder="Email..."
        />
        <input
          className="bg-transparent outline-none border-b-2 border-gray-500 pb-2"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          placeholder="Password..."
        />
        <button className="px-4 py-1 bg-green-500 rounded-xl text-xl hover:bg-green-600 my-4">
          {loading ? "Processing..." : "Log-In"}
        </button>
      </form>
    </div>
  );
}

export default Page
