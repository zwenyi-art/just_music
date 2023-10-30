import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import Cookies from "js-cookie";
import { useMusic } from "./provider/MusicProvider";

const RouteGuard = ({ children }) => {
  const { currentUser } = useMusic();
  const token = Cookies.get("1519NKO");
  if (token) return children;
  else return <Navigate to="/login"></Navigate>;
  // if (currentUser) return children;
  // else return <Navigate to="/login"></Navigate>;
};

export default RouteGuard;
