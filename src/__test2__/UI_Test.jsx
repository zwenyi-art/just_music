import React, { useState } from "react";
import { BsMusicNoteList } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { ImMenu } from "react-icons/im";
import { CgLogOut } from "react-icons/cg";
const UI_Test = () => {
  const [show, setShow] = useState(true);
  return (
    <div className="max-w-sm bg-fixed relative overflow-hidden h-screen container flex flex-col mx-auto   bg-black">
      <div className="fixed py-3 bg-indigo-50 top-0 max-w-sm w-full h-fit flex flex-row justify-between items-center px-4">
        <button
          className="cursor-default"
          onClick={() => setShow((show) => !show)}
        >
          <ImMenu className="text-2xl"></ImMenu>
        </button>
        <div className="text-black text-xl">jk@gmail.com</div>
      </div>

      {/* slider */}
      <div
        onClick={() => setShow((show) => !show)}
        className={`absolute transition delay-150 duration-300 ease-in-out 
       ${
         !show && "translate-x-0"
       }   -translate-x-full px-2 pt-3 mx-auto  container  flex flex-col gap-y-3 max-w-[250px] h-full bg-slate-600/25 backdrop-blur-sm`}
      >
        <div className="hover:bg-slate-400/70 transition-all duration-200 hover:text-white bg-[#FDFFF5] px-4 py-[10px] rounded-md ">
          <button className="select-none  flex items-center justify-center gap-x-2">
            <BsMusicNoteList></BsMusicNoteList>
            <span>My Music Lists</span>
          </button>
        </div>
        <div className="hover:bg-slate-400/70 transition-all duration-200 hover:text-white bg-[#FDFFF5] px-4 py-[10px] rounded-md ">
          <button className="select-none flex items-center justify-center gap-x-2">
            <MdFavorite size={19}></MdFavorite>
            <span>Favorites</span>
          </button>
        </div>
        <div className="w-full h-[60vh] flex flex-col gap-y-2 scroll-smooth over_flow_hide overflow-y-scroll">
          <div className="hover:bg-slate-400/70 transition-all duration-200 hover:text-white bg-[#FDFFF5] px-4 py-[7.5px] rounded-md ">
            <button className="select-none flex items-center justify-center gap-x-2">
              <IoPersonCircleSharp size={25}></IoPersonCircleSharp>
              <span>Zar Ni</span>
            </button>
          </div>
          <div className="hover:bg-slate-400/70 transition-all duration-200 hover:text-white bg-[#FDFFF5] px-4 py-[7.5px] rounded-md ">
            <button className="flex items-center justify-center gap-x-2">
              <IoPersonCircleSharp size={25}></IoPersonCircleSharp>
              <span>Zar Ni</span>
            </button>
          </div>
          <div className="hover:bg-slate-400/70 transition-all duration-200 hover:text-white bg-[#FDFFF5] px-4 py-[7.5px] rounded-md ">
            <button className="flex items-center justify-center gap-x-2">
              <IoPersonCircleSharp size={25}></IoPersonCircleSharp>
              <span>Zar Ni</span>
            </button>
          </div>
          <div className="hover:bg-slate-400/70 transition-all duration-200 hover:text-white bg-[#FDFFF5] px-4 py-[7.5px] rounded-md ">
            <button className="flex items-center justify-center gap-x-2">
              <IoPersonCircleSharp size={25}></IoPersonCircleSharp>
              <span>Zar Ni</span>
            </button>
          </div>
          <div className="hover:bg-slate-400/70 transition-all duration-200 hover:text-white bg-[#FDFFF5] px-4 py-[7.5px] rounded-md ">
            <button className="flex items-center justify-center gap-x-2">
              <IoPersonCircleSharp size={25}></IoPersonCircleSharp>
              <span>Zar Ni</span>
            </button>
          </div>
          <div className="hover:bg-slate-400/70 transition-all duration-200 hover:text-white bg-[#FDFFF5] px-4 py-[7.5px] rounded-md ">
            <button className="flex items-center justify-center gap-x-2">
              <IoPersonCircleSharp size={25}></IoPersonCircleSharp>
              <span>Zar Ni</span>
            </button>
          </div>
          <div className="hover:bg-slate-400/70 transition-all duration-200 hover:text-white bg-[#FDFFF5] px-4 py-[7.5px] rounded-md ">
            <button className="flex items-center justify-center gap-x-2">
              <IoPersonCircleSharp size={25}></IoPersonCircleSharp>
              <span>Zar Ni</span>
            </button>
          </div>
          <div className="hover:bg-slate-400/70 transition-all duration-200 hover:text-white bg-[#FDFFF5] px-4 py-[7.5px] rounded-md ">
            <button className="flex items-center justify-center gap-x-2">
              <IoPersonCircleSharp size={25}></IoPersonCircleSharp>
              <span>Zar Ni</span>
            </button>
          </div>{" "}
          <div className="hover:bg-slate-400/70 transition-all duration-200 hover:text-white bg-[#FDFFF5] px-4 py-[7.5px] rounded-md ">
            <button className="flex items-center justify-center gap-x-2">
              <IoPersonCircleSharp size={25}></IoPersonCircleSharp>
              <span>Zar Ni</span>
            </button>
          </div>
          <div className="hover:bg-slate-400/70 transition-all duration-200 hover:text-white bg-[#FDFFF5] px-4 py-[7.5px] rounded-md ">
            <button className="flex items-center justify-center gap-x-2">
              <IoPersonCircleSharp size={25}></IoPersonCircleSharp>
              <span>Zar Ni</span>
            </button>
          </div>
          <div className="hover:bg-slate-400/70 transition-all duration-200 hover:text-white bg-[#FDFFF5] px-4 py-[7.5px] rounded-md ">
            <button className="flex items-center justify-center gap-x-2">
              <IoPersonCircleSharp size={25}></IoPersonCircleSharp>
              <span>Zar Ni</span>
            </button>
          </div>
        </div>
        <div className="hover:bg-blue-400/70 flex items-center justify-center w-full h-fit transition-all duration-200 hover:text-white bg-[#FDFFF5]  py-[10px] rounded-md ">
          <button className="select-none flex  items-center justify-center gap-x-3">
            <CgLogOut size={25}></CgLogOut>
            <span className="text-xl">Logout</span>
          </button>
        </div>
      </div>

      <div className="pt-12"></div>
      <div
        onClick={() => {
          !show && setShow(true);
        }}
        className=" bg-transparent text-xl  px-3 pt-3 text-white flex flex-col gap-y-2 w-full h-full scroll-smooth  overflow-y-auto over_flow_hide"
      >
        <div className="bg-lime-500/50 py-2 px-2 rounded-md">
          <span>1.</span>sfsfsfjslkfjskfjskfjskdjfskjkj
        </div>
        <div className="py-2 px-2 rounded-md">
          <span>2.</span>sfsfsfjslkfjskfjskfjskdjfskjkj
        </div>
      </div>
    </div>
  );
};

export default UI_Test;
