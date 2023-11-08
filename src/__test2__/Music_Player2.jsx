import React, { useEffect, useRef, useState } from "react";
import { useMusic } from "../components/provider/MusicProvider";

const Music_Player2 = () => {
  const {
    intervalId,
    setIntevalId,
    songs,
    selectedSong,
    backSong,
    nextSong,
    setSelectedSong,
    isReady,
  } = useMusic();
  const [canPlay, setcanPlay] = useState(false);
  const currentSong = songs[selectedSong]?.url;
  const song = useRef(new Audio());
  const audio_source = (songs, selectedSong) => {
    if (selectedSong != null) {
      return songs[selectedSong]?.url;
    }
  };
  useEffect(() => {
    console.log(songs);
    const audio_object = audio_source(songs, selectedSong);
    if (song.current) {
      song.current.pause();
      song.current.currentTime = 0;
    }
    song.current = new Audio(audio_object);
    song.current.addEventListener("canplay", () => {
      canPlaysong();
    });
    return () => {
      song.current.removeEventListener("canplay", () => {
        canPlaysong();
      });
    };
  }, [selectedSong]);

  const canPlaysong = () => {
    playSong();
  };
  useEffect(() => {
    console.log(canPlay);
  }, [canPlay]);
  //component mounted and unmounted

  useEffect(() => {
    console.log("player mounted");
    return () => {
      if (song.current) {
        song.current.pause();
        song.current.currentTime = 0;
        song.current = new Audio();
      } else {
        return;
      }
      console.log("Player Unmounted");
    };
  }, []);
  const playSong = async () => {
    console.log("clicked play");
    song.current.play();
    // startTimer();
  };
  const pauseSong = () => {
    song.current.pause();
  };
  const handleCanPlay = () => {
    console.log("can play audio");
    // setCanPlay(true);
  };
  const handleWaiting = () => {
    console.log("waiting audio");
    // setCanPlay(false);
  };
  //   useEffect(() => {
  //     song.current.addEventListener("canplay", handleCanPlay);
  //     song.current.addEventListener("waiting", handleWaiting);
  //     return () => {
  //       song.current.removeEventListener("canplay", handleCanPlay);
  //       song.current.removeEventListener("waiting", handleWaiting);
  //     };
  //   }, [selectedSong]);

  return (
    <div>
      Music_Player2
      <button onClick={() => playSong()}>Play</button>
    </div>
  );
};

export default Music_Player2;
