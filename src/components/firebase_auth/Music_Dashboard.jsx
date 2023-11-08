import React, { useEffect, useState } from "react";
import { auth, googleProvider, db } from "../../config/firebase";
import Music_Login_Form from "./Music_Login_Form";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Music_Logout_Form from "./Music_Logout_Form";
import { useMusic } from "../provider/MusicProvider";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import GetData, { getSingle } from "./Music_Data_Fetch";
import Music_List from "../music_player/components/Music_List";
import Music_Player from "../music_player/components/Music_Player";
import Music_Upload from "./Music_Upload";

const Music_Dashboard = () => {
  const { currentUser, setSong } = useMusic();
  const token = Cookies.get("1519NKO");
  const navigate = useNavigate();
  const [myData, setMyData] = useState();
  const logout = async () => {
    try {
      await signOut(auth).then(() => {
        console.log("logout Success");
        Cookies.remove("1519NKO");
        setSong([]);
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };
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
    <div>
      Music_Dashboard
      <h1 className="text-red-500">Hello</h1>
      <h6>{currentUser?.email}</h6>
      <Music_Logout_Form logout={logout}></Music_Logout_Form>
      <br />
      <Music_Upload></Music_Upload>
      <button onClick={myMusic}>My Musics</button>
      <Music_List></Music_List>
      <Music_Player></Music_Player>
      {/* {currentUser && <Music_Logout_Form></Music_Logout_Form>} */}
    </div>
  );
};

export default Music_Dashboard;
