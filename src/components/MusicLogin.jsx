import React, { useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { useMusic } from "./provider/MusicProvider";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";
import { PiMusicNote } from "react-icons/pi";
const MusicLogin = () => {
  const { setCurrentUser } = useMusic();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const signIn = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // const email = "abc@gmail.com";
    // const password = "abcdefghijk";
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            Cookies.set("1519NKO", user?.accessToken, { expires: 7 });
          }
        });
        console.log("Log in success");
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
    console.log(email, password);
  };
  return (
    <div className="flex flex-col items-center bg-white  justify-center w-full h-screen">
      <form
        onSubmit={signIn}
        className="flex flex-col p-3  gap-y-3 items-center justify-center w-[250px] h-fit"
      >
        <div className="flex flex-row gap-x-1 w-full items-center justify-center">
          <PiMusicNote
            className="text-red-500 font-extrabold"
            size={23}
          ></PiMusicNote>
          <h1 className="text-xl font-extrabold">Just Music</h1>
          <PiMusicNote
            className="text-red-500 font-extrabold"
            size={23}
          ></PiMusicNote>
        </div>
        <div className="flex flex-col w-full">
          <span>Email</span>
          <input
            ref={emailRef}
            type="email"
            placeholder="example@gmail.com"
            className="py-1 border-gray-500 border rounded-sm  outline-none pl-1"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <span>Password</span>
          <input
            ref={passwordRef}
            type="password"
            placeholder="password"
            className="py-1 border-gray-500 border rounded-sm outline-none pl-1"
            required
          />
        </div>
        <button type="submit" className="w-full py-1 bg-blue-400 rounded-md">
          Login
        </button>
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
