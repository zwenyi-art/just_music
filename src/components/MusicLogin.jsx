import React from "react";
import { FcGoogle } from "react-icons/fc";
const MusicLogin = () => {
  return (
    <div className="flex flex-col items-center bg-white  justify-center w-full h-screen">
      <form className="flex flex-col p-3  gap-y-3 items-center justify-center w-[250px] h-fit">
        <h1 className="text-xl font-extrabold">Login Form</h1>
        <div className="flex flex-col w-full">
          <span>Email</span>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="py-1 border-gray-500 border rounded-sm  outline-none pl-1"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <span>Password</span>
          <input
            type="password"
            placeholder="password"
            className="py-1 border-gray-500 border rounded-sm outline-none pl-1"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <button className="w-full py-1 bg-blue-400 rounded-md">Login</button>
        </div>
      </form>
      <div className="">
        <div className="w-full">
          <button className="w-full flex flex-row items-center justify-center gap-x-2 py-1 bg-white rounded-md">
            <FcGoogle size={25}></FcGoogle> Sign in with google
          </button>
        </div>
        <div className="">
          Not a member?<span className="text-blue-900 pl-2">Signup now</span>
        </div>
      </div>
    </div>
  );
};

export default MusicLogin;
