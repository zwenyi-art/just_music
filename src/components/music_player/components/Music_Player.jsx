import React, { useEffect, useRef, useState } from "react";
import { useMusic } from "../../provider/MusicProvider";

const Music_Player = () => {
  const { songs, selectedSong, nextSong, setSelectedSong, isReady } =
    useMusic();
  const currentSong = songs[selectedSong]?.url;
  const song = useRef(new Audio(songs[selectedSong]?.url));
  const [music_volume, setMusic_volume] = useState(0.5);
  const [trackProgress, setTrackProgress] = useState(0);
  const [intervalId, setIntevalId] = useState(null);
  const [canPlay, setCanPlay] = useState(false);
  const { duration } = song.current;
  const intervalRef = useRef();
  useEffect(() => {
    song.current = new Audio(currentSong);
    song.current.volume = music_volume;
    setTrackProgress(song.current.currentTime);
    if (isReady) {
      song.current.play();
      startTimer();
    }
    return () => {
      clearInterval(intervalId);
      song.current.pause();
    };
  }, [selectedSong]);
  const handleCanPlay = () => {
    console.log("can play audio");
    setCanPlay(true);
  };
  const handleWaiting = () => {
    console.log("waiting audio");
    setCanPlay(false);
  };
  useEffect(() => {
    song.current.addEventListener("canplay", handleCanPlay);
    song.current.addEventListener("waiting", handleWaiting);
    return () => {
      song.current.removeEventListener("canplay", handleCanPlay);
      song.current.removeEventListener("waiting", handleWaiting);
    };
  }, [song.current]);
  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    song.current.currentTime = value;
    setTrackProgress(song.current.currentTime);
  };
  const onScrubEnd = () => {
    // If not already playing, start
    startTimer();
  };
  const startTimer = () => {
    console.log("timer start");
    const logCurrentTime = () => {
      console.log("am playing");
      if (song.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(song.current.currentTime);
        console.log("saving progress");
      }
    };
    const interval = setInterval(logCurrentTime, 1000);
    setIntevalId(interval);
  };
  const playSong = () => {
    song.current.play();
    startTimer();
  };
  const pauseSong = () => {
    song.current.pause();
  };

  const toNextTrack = () => {
    if (selectedSong < songs.length - 1) {
      nextSong(selectedSong);
    } else {
      setSelectedSong(0);
    }
  };
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
  //volume changer
  return (
    <div>
      Song_Player <br />
      {canPlay ? <h1>Can Play Muisic</h1> : <h1>Fetching</h1>}
      <button onClick={() => playSong()}>Play</button>
      <button onClick={() => pauseSong()}>Pause</button>
      <button onClick={() => toNextTrack()}>Next</button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={music_volume}
        onChange={handleVolumeChange}
      />
      <br />
      <input
        value={trackProgress}
        type="range"
        name=""
        id=""
        min="0"
        max={duration ? duration : `${duration}`}
        onChange={(e) => onScrub(e.target.value)}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
      />
    </div>
  );
};

export default Music_Player;
