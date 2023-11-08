import React, { useEffect } from "react";
import { useMusic } from "../provider/MusicProvider";
import { getSingle } from "./Music_Data_Fetch";
import Music_List from "../music_player/components/Music_List";
import Music_Player from "../music_player/components/Music_Player";
import { useParams } from "react-router-dom";
import Music_Player2 from "../../__test2__/Music_Player2";

const Selected_User_Dashboard = () => {
  const { setSelectedSong, selectedUser, setSong, songs } = useMusic();
  const { userId } = useParams();
  useEffect(() => {
    if (userId) {
      getSingle(setSong, userId);
    }
  }, [userId]);
  useEffect(() => {
    console.log("I am songs");
  }, [songs]);
  function refreshPage() {
    window.location.reload();
  }
  useEffect(() => {
    console.log("selected user dashboard mounted");
    // refreshPage();
    return () => {
      console.log("selected user dashboard unmounted");
      setSelectedSong();
    };
  }, []);
  useEffect(() => {
    // Set up an interval to refresh the page every 5 seconds (5000 milliseconds)
    // const refreshInterval = setInterval(() => {
    //   window.location.reload();
    // }, 5000);
    // // Clean up the interval when the component unmounts
    // return () => {
    //   clearInterval(refreshInterval);
    // };
  }, []);
  return (
    <div>
      Selected_User_Dashboard
      <h5>{selectedUser?.id}</h5>
      <Music_List></Music_List>
      {/* <Music_Player></Music_Player> */}
      <Music_Player2></Music_Player2>
    </div>
  );
};

export default Selected_User_Dashboard;
