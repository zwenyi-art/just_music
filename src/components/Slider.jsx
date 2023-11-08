import React from "react";
import { BsMusicNoteList } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import Button from "./Button";
import UserLists from "./UserLists";
const Slider = ({ show, ...sliderProps }) => {
  return (
    <div
      {...sliderProps}
      className={`z-50 absolute transition delay-150 duration-300 ease-in-out 
 ${
   !show && "translate-x-0"
 }   -translate-x-full px-2 pt-3 mx-auto  container  flex flex-col gap-y-3 max-w-[250px] h-full bg-slate-600/25 backdrop-blur-sm`}
    >
      <Button
        
        className={
          "hover:bg-slate-400/70 transition-all duration-200 hover:text-white bg-[#FDFFF5] px-4 py-[10px] rounded-md "
        }
      >
        <BsMusicNoteList></BsMusicNoteList>
        <span>My Music Lists</span>
      </Button>
      <Button
        className={
          "hover:bg-slate-400/70 transition-all duration-200 hover:text-white bg-[#FDFFF5] px-4 py-[10px] rounded-md "
        }
      >
        <MdFavorite size={19}></MdFavorite>
        <span>Favorites</span>
      </Button>
      <div className="w-full h-[60vh] flex flex-col gap-y-2 scroll-smooth over_flow_hide overflow-y-scroll">
        <UserLists></UserLists>
      </div>
      <div className="absolute bottom-2 right-0 left-0 flex items-center justify-center">
        <div className=" hover:bg-blue-400/70 flex items-center justify-center w-fit h-fit transition-all duration-200 hover:text-white bg-[#FDFFF5] px-16  py-[10px] rounded-md ">
          <button className="select-none flex  items-center justify-center gap-x-3">
            <CgLogOut size={25}></CgLogOut>
            <span className="text-xl">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
