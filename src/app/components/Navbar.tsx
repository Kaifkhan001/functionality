"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import Link from 'next/link';
import useStore from '@/helpers/store';

const Navbar = () => {
  const { isLogged } = useStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const handleMenuP = () => {
       setIsMenuOpen(!isMenuOpen);
    }
  return (
    <div className="w-full flex items-center justify-between px-8 py-8">
      <Image
        className="text-white"
        src={"/images/logo.png"}
        alt="Logo"
        width={45}
        height={45}
      />
      <span className="sm:hidden cursor-pointer hover:bg-gray-500 hover:bg-opacity-45 rounded-full px-3">
        <HiMenuAlt4
          onClick={handleMenuP}
          style={{ color: "white", width: "40px", height: "40px" }}
        />
      </span>
      <span className="sm:flex hidden gap-4">
        {isLogged ? (
          <>
            <Link
              href={"/dashboard"}
              className="border-[2px] border-red-500 text-red-500 text-xl hover:bg-red-500 hover:text-black px-4 py-1 transition-all"
            >
              Dashboard
            </Link>
            <Link
              href={"/profile"}
              className="border-[2px] border-red-500 text-red-500 text-xl hover:bg-red-500 hover:text-black px-4 py-1 transition-all"
            >
              Profile
            </Link>
            <Link
              href={"/logout"}
              className="border-[2px] text-sky-500 border-sky-500 hover:bg-sky-500 hover:text-black px-4 py-1 text-xl"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              href={"/signup"}
              className="border-[2px] border-red-500 text-red-500 text-xl hover:bg-red-500 hover:text-black px-4 py-1 transition-all"
            >
              Sign-up
            </Link>
            <Link
              href={"/login"}
              className="border-[2px] text-sky-500 border-sky-500 hover:bg-sky-500 hover:text-black px-4 py-1 text-xl"
            >
              Log-In
            </Link>
            <HiMenuAlt4
              onClick={handleMenuP}
              className="cursor-pointer hover:bg-gray-500 hover:bg-opacity-45 rounded-full px-3"
              style={{ color: "white", width: "60px", height: "40px" }}
            />
          </>
        )}
      </span>
      <ul
        className={`absolute  ${
          isMenuOpen ? "flex" : "hidden"
        } flex-col items-center justify-center top-0 right-0 sm:w-[40%] w-[80%] sm:bg-black sm:h-full h-[70%] text-5xl text-white bg-black bg-opacity-100`}
      >
        <span className="w-full flex items-center justify-end px-6">
          <IoIosCloseCircle
            onClick={handleMenuP}
            className="w-6 cursor-pointer"
          />
        </span>
        <h3 className="mb-12">Menu</h3>
        <Link
          onClick={() => setIsMenuOpen((prev) => !prev)}
          href={"contact-us"}
          className="w-full h-[15%] flex items-center justify-center text-xl border-b-2 border-gray-600 hover:bg-gray-600 cursor-pointer border-t-2 "
        >
          Contact-Us
        </Link>
        <Link
          onClick={() => setIsMenuOpen((prev) => !prev)}
          href={"about-us"}
          className="w-full h-[15%] flex items-center justify-center text-xl border-b-2 border-gray-600 hover:bg-gray-600 cursor-pointer "
        >
          About-Us
        </Link>
        {isLogged ? (
          <>
            <Link
              onClick={() => setIsMenuOpen((prev) => !prev)}
              href={"/dashboard"}
              className="w-full h-[15%] flex items-center justify-center text-xl border-b-2 border-gray-600 hover:bg-gray-600 cursor-pointer "
            >
              dashboard
            </Link>
            <Link
              onClick={() => setIsMenuOpen((prev) => !prev)}
              href={"/profile"}
              className="w-full h-[15%] flex items-center justify-center text-xl border-b-2 border-gray-600 hover:bg-gray-600 cursor-pointer "
            >
              Profile
            </Link>
            <Link
              onClick={() => setIsMenuOpen((prev) => !prev)}
              href={"/logout"}
              className="w-full h-[15%] flex items-center justify-center text-xl border-b-2 border-gray-600 hover:bg-gray-600 cursor-pointer "
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              onClick={() => setIsMenuOpen((prev) => !prev)}
              href={"signup"}
              className="w-full h-[15%] flex items-center justify-center text-xl border-b-2 border-gray-600 hover:bg-gray-600 cursor-pointer "
            >
              Register
            </Link>
            <Link
              onClick={() => setIsMenuOpen((prev) => !prev)}
              href={"login"}
              className="w-full h-[15%] flex items-center justify-center text-xl border-b-2 border-gray-600 hover:bg-gray-600 cursor-pointer "
            >
              Log-In
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar
