import React, { useEffect } from "react";
import { useMusic } from "./provider/MusicProvider";

const MusicList = ({ ...musicProps }) => {
  const { songs, selectedUser, selectedSong, setIsReady, setSelectedSong } =
    useMusic();
  const songSelect = (index) => {
    setSelectedSong(index);
    setIsReady(true);
  };
  useEffect(() => {
    console.log("from music list");
  }, [selectedUser]);
  return (
    <div
      {...musicProps}
      className=" bg-transparent text-sm  px-3 pt-3 text-black flex flex-col gap-y-2 w-full h-full scroll-smooth  overflow-y-auto over_flow_hide"
    >
      {songs?.map((e, index) => (
        <div
          key={e.title}
          onClick={() => songSelect(index)}
          className={`flex select-none cursor-pointer  items-center justify-center ${
            selectedSong == index ? "bg-indigo-100 font-semibold" : ""
          } overflow-hidden  py-2 px-2 rounded-md`}
        >
          <span>{index + 1}.</span>
          <p className="truncate w-full">{e.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MusicList;
