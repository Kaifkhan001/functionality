"use client"
import React from 'react'

const Page = () => {
    const handleSubmit = () => {

    }
  return (
    <div className="w-full h-[77vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="border-2 p-8 border-orange-600 rounded-xl  flex flex-col gap-4">
        <input
          className="bg-gray-500 px-2 py-2 text-xl outline-none rounded-xl text-black placeholder:text-gray-700"
          type="text"
          placeholder="Email..."
        />

        <input
          className="bg-gray-500 px-2 py-2 text-xl outline-none rounded-xl text-black placeholder:text-gray-700"
          type="text"
          placeholder="Name..."
        />

        <button className="px-4 py-1 text-xl font-semibold rounded-xl bg-orange-500 text-white hover:bg-orange-600 ">
          Send
        </button>
      </form>
    </div>
  );
}

export default Page
