import React, { createContext, useContext, useEffect, useState } from "react";
// import { songs } from "../../../songs/songList";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
const MusicContext = createContext();
const MusicProvider = ({ children }) => {
  const [selectedSong, setSelectedSong] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [songs, setSong] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const nextSong = (selectedSong) => {
    if (selectedSong < songs.length - 1) {
      setSelectedSong(selectedSong + 1);
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
        currentUser,
        setCurrentUser,
        songs,
        setSong,
        nextSong,
        selectedSong,
        isReady,
        setIsReady,
        setSelectedSong,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
export default MusicProvider;
