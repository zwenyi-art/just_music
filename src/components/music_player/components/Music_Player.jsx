import React, { useEffect, useRef, useState } from "react";
import { useMusic } from "../../provider/MusicProvider";

const Music_Player = () => {
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
  const currentSong = songs[selectedSong]?.url;
  const song = useRef(new Audio(songs[selectedSong]?.url));
  const [music_volume, setMusic_volume] = useState(0.5);
  const [trackProgress, setTrackProgress] = useState(0);
  // const [intervalId, setIntevalId] = useState(null);
  const [canPlay, setCanPlay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { duration } = song.current;
  const intervalRef = useRef();

  useEffect(() => {
    if (song.current) {
      song.current = null;
    }
    song.current = new Audio(currentSong);
    song.current.volume = music_volume;
    setTrackProgress(song.current.currentTime);
    if (isReady) {
      song.current.play();
      startTimer();
    }
    return () => {
      clearInterval(intervalRef.current);
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
  }, [selectedSong]);
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
  const playSong = () => {
    song.current.play();
    startTimer();
  };
  const pauseSong = () => {
    clearInterval(intervalRef.current);
    song.current.pause();
    song.current.currentTime = 0;
    setPlaying(false);
  };

  const stopSong = () => {
    clearInterval(intervalRef.current);
    song.current.currentTime = 0;
    song.current.pause();
    setPlaying(false);
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
  useEffect(() => {
    console.log("Music component mounted");
    return () => {
      console.log("Music component unmounted");

      // Stop playing the audio, if it's playing
      if (song.current) {
        setPlaying(false);
        song.current.pause();
        song.current.currentTime = 0;
      }
      // Clean up the audio object
      song.current = null;
    };
  }, []);
  return (
    <div>
      Song_Player <br />
      {canPlay ? <h1>Can Play Muisic</h1> : <h1>Fetching</h1>}
      {playing ? (
        <>
          <button onClick={() => pauseSong()}>Pause</button>
          <button onClick={() => toBackTrack()}>Back</button>
          <button onClick={() => toNextTrack()}>Next</button>
        </>
      ) : (
        <button onClick={() => playSong()}>Play</button>
      )}
      <button onClick={() => stopSong()}>Stop</button>
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
