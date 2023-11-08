import React, { useEffect, useRef, useState } from "react";
import {
  IoPlayCircleOutline,
  IoPlaySkipBackCircleOutline,
  IoPlaySkipForwardCircleOutline,
  IoPauseCircleOutline,
} from "react-icons/io5";
import { useMusic } from "./provider/MusicProvider";
const MusicPlayer = () => {
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
  const [playing, setPlaying] = useState(false);
  const [music_volume, setMusic_volume] = useState(0.5);
  const [trackProgress, setTrackProgress] = useState(0);
  const intervalRef = useRef();
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

  const startTimer = () => {
    console.log("timer start");
    setPlaying(true);
    const logCurrentTime = () => {
      console.log("am playing");
      if (song.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(song.current.currentTime);
        console.log("saving progress");
      }
    };
    intervalRef.current = setInterval(logCurrentTime, 1000);
  };

  const toNextTrack = () => {
    if (selectedSong < songs.length - 1) {
      nextSong(selectedSong);
    } else {
      setSelectedSong(0);
    }
  };
  const toBackTrack = () => {
    backSong(selectedSong);
  };
  const canPlaysong = () => {
    playSong();
    setPlaying(true);
    // startTimer();
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
    setPlaying(true);
    // startTimer();
  };
  const pauseSong = () => {
    song.current.pause();
    setPlaying(false);
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

  //volume changer

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setMusic_volume(newVolume);
  };

  //volume changer
  useEffect(() => {
    song.current.volume = music_volume;
    console.log(music_volume);
  }, [music_volume]);

  return (
    <div className="z-40 absolute bottom-0  bg-indigo-50  flex flex-col w-full  h-28 text-black">
      <div className=" w-full pl-3 h-7 scrolling-container relative">
        <p className="absolute right-0 animate-scrolling-text flex flex-row flex-wrap w-full ">
          {songs[selectedSong]?.title}
        </p>
      </div>
      <div className="w-full flex flex-col px-3">
        <input className="w-full" type="range" min="0" max="1" step="0.01" />
        <div className="select-none flex justify-between items-center w-full text-[10px]">
          <span>12:39</span>
          <span>12:39</span>
        </div>
      </div>
      <div className="flex text-3xl items-center justify-center w-full gap-x-5">
        <IoPlaySkipBackCircleOutline></IoPlaySkipBackCircleOutline>
        {!playing ? (
          <IoPlayCircleOutline
            size={47}
            onClick={() => playSong()}
          ></IoPlayCircleOutline>
        ) : (
          <IoPauseCircleOutline
            size={47}
            onClick={() => pauseSong()}
          ></IoPauseCircleOutline>
        )}

        <IoPlaySkipForwardCircleOutline></IoPlaySkipForwardCircleOutline>
      </div>
    </div>
  );
};

export default MusicPlayer;
