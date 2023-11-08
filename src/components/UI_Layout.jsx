import React, { useEffect, useState } from "react";

import NavBar from "./NavBar";
import Slider from "./Slider";


import { ImVolumeDecrease, ImVolumeIncrease } from "react-icons/im";
import MusicList from "./MusicList";
import MusicProvider, { useMusic } from "./provider/MusicProvider";
import Cookies from "js-cookie";
import { signOut } from "firebase/auth";
import { getSingle } from "./firebase_auth/Music_Data_Fetch";
import { auth } from "../config/firebase";
import MusicPlayer from "./MusicPlayer";
const UI_Layout = () => {
  const [show, setShow] = useState(true);

  const { currentUser, setSong } = useMusic();
  const token = Cookies.get("1519NKO");
  // const navigate = useNavigate();
  const [myData, setMyData] = useState();

  useEffect(() => {
    // GetData(setMyData);
    if (currentUser) {
      myMusic();
    }
  }, [currentUser]);
  useEffect(() => {
    if (myData) {
      console.log(myData);
    }
  }, [myData]);
  const myMusic = () => {
    getSingle(setSong, currentUser);
    console.log("My Music");
  };
  return (
    <div className="max-w-sm bg-fixed relative overflow-hidden h-screen container flex flex-col mx-auto   bg-white">
      <NavBar setShow={setShow}></NavBar>
      {/* slider */}
      <Slider show={show} onClick={() => setShow((show) => !show)}></Slider>
      <div className="pt-16"></div>
      <div className="w-full flex flex-col px-3 ">
        <input
          className="w-full h-1"
          type="range"
          min="0"
          max="1"
          step="0.01"
        />
        <div className="select-none pt-2 flex justify-between items-center w-full text-[10px]">
          <ImVolumeDecrease
            size={14}
            className="hover:text-lime-600"
          ></ImVolumeDecrease>
          <ImVolumeIncrease
            size={14}
            className="hover:text-lime-600"
          ></ImVolumeIncrease>
        </div>
      </div>
      <MusicList
        onClick={() => {
          !show && setShow(true);
        }}
      ></MusicList>

      {/* music player  */}
      <MusicPlayer></MusicPlayer>
    </div>
  );
};

export default UI_Layout;
