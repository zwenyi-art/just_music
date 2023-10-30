import React from "react";
import Music_Auth from "./components/firebase_auth/Music_Dashboard";
import { Route, Routes } from "react-router-dom";
import Music_Login_Form from "./components/firebase_auth/Music_Login_Form";
import Music_Register from "./components/firebase_auth/Music_Register";
import Music_Dashboard from "./components/firebase_auth/Music_Dashboard";
import RouteGuard from "./components/RouteGuard";
// import Music_app from "./components/music_player/Music_app";
// import Auth2 from "./__test2__/Auth2";
// import Auth from "./__test2__/Auth";

const App = () => {
  return (
    <div>
      App
      {/* <Auth></Auth> */}
      {/* <Music_app></Music_app> */}
      {/* <Auth></Auth> */}
      {/* <Auth2></Auth2> */}
      {/* <Music_Auth></Music_Auth> */}
      <Routes>
        <Route
          path="/"
          element={
            <RouteGuard>
              <Music_Dashboard />
            </RouteGuard>
          }
        ></Route>
        <Route
          path="/login"
          element={<Music_Login_Form></Music_Login_Form>}
        ></Route>
        <Route
          path="/register"
          element={<Music_Register></Music_Register>}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
