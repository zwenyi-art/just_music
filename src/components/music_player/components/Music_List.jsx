import React, { useEffect } from "react";
import { useMusic } from "../../provider/MusicProvider";

const Music_List = () => {
  const { songs, selectedSong, setIsReady, setSelectedSong } = useMusic();
  const songSelect = (index) => {
    setSelectedSong(index);
    setIsReady(true);
  };
  useEffect(() => {
    console.log(songs);
  }, [songs]);
  return (
    <div>
      Song_List
      {songs?.map((e, index) => (
        <p
          key={e.title}
          className={` ${selectedSong == index ? "active_Music" : ""}`}
          onClick={() => songSelect(index)}
        >
          {e.title}
          {/* {e.url} */}
        </p>
      ))}
    </div>
  );
};

export default Music_List;
