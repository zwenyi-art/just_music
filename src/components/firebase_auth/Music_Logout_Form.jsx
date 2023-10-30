import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Music_Logout_Form = ({ logout }) => {
  return (
    <div>
      <button onClick={logout}>LogOut</button>
    </div>
  );
};

export default Music_Logout_Form;
