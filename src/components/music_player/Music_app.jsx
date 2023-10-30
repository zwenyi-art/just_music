import React from "react";
import MusicProvider from "../provider/MusicProvider";
import Music_List from "./components/Music_List";
import Music_Player from "./components/Music_Player";
import Auth from "../../__test2__/Auth";

const Music_app = () => {
  return (
    <MusicProvider>
      <Music_List></Music_List>
      <Music_Player></Music_Player>
      <Auth></Auth>
    </MusicProvider>
  );
};

export default Music_app;
