import React, { createContext, useContext, useEffect, useState } from "react";
// import { songs } from "../../../songs/songList";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
const MusicContext = createContext();
const MusicProvider = ({ children }) => {
  const [selectedSong, setSelectedSong] = useState();
  const [isReady, setIsReady] = useState(false);
  const [songs, setSong] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [intervalId, setIntevalId] = useState(null);

  const nextSong = (selectedSong) => {
    if (selectedSong < songs.length - 1) {
      setSelectedSong(selectedSong + 1);
      setIsReady(true);
    }
  };
  const backSong = (selectedSong) => {
    if (selectedSong - 1 < 0) {
      setSelectedSong(songs.length - 1);
      setIsReady(true);
    } else {
      setSelectedSong(selectedSong - 1);
      setIsReady(true);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);
  // useEffect(() => {
  //   console.log(song);
  // }, [song]);
  return (
    <MusicContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        currentUser,
        setCurrentUser,
        songs,
        setSong,
        nextSong,
        backSong,
        selectedSong,
        isReady,
        setIsReady,
        setSelectedSong,
        intervalId,
        setIntevalId,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
export default MusicProvider;
