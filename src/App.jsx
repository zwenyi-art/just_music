import React from "react";
import Music_Auth from "./components/firebase_auth/Music_Dashboard";
import { Route, Routes } from "react-router-dom";
import Music_Login_Form from "./components/firebase_auth/Music_Login_Form";
import Music_Register from "./components/firebase_auth/Music_Register";
import Music_Dashboard from "./components/firebase_auth/Music_Dashboard";
import RouteGuard from "./components/RouteGuard";
import All_Music_Data_Fetch from "./components/firebase_auth/All_Music_Data_Fetch";
import Selected_User_Dashboard from "./components/firebase_auth/Selected_User_Dashboard";
// import { useMusic } from "./components/provider/MusicProvider";
import UI_Test from "./__test2__/UI_Test";
import UI_Layout from "./components/UI_Layout";
import MusicLogin from "./components/MusicLogin";
// import Music_app from "./components/music_player/Music_app";
// import Auth2 from "./__test2__/Auth2";
// import Auth from "./__test2__/Auth";

const App = () => {
  // const { selectedUser } = useMusic();
  return (
    <div>
      {/* <Auth></Auth> */}
      {/* <Music_app></Music_app> */}
      {/* <Auth></Auth> */}
      {/* <Auth2></Auth2> */}
      {/* <Music_Auth></Music_Auth> */}
      <Routes>
        {/* <Route path="/profile" element={<Music_Dashboard />}></Route> */}
        <Route path="/login" element={<MusicLogin></MusicLogin>}></Route>
        <Route
          path="/"
          element={
            <RouteGuard>
              <UI_Layout></UI_Layout>
            </RouteGuard>
          }
        ></Route>
        {/* <Route
          path="/register"
          element={<Music_Register></Music_Register>}
        ></Route> */}
        {/* <Route
          path="/all"
          element={<All_Music_Data_Fetch></All_Music_Data_Fetch>}
        ></Route> */}
        {/* <Route
          path="/:userId"
          element={<Selected_User_Dashboard></Selected_User_Dashboard>}
        ></Route> */}
        {/* <Route path="/ui" element={<UI_Test></UI_Test>}></Route> */}
      </Routes>
    </div>
  );
};

export default App;
