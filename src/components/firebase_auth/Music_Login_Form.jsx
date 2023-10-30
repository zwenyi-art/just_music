import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef } from "react";
import { auth } from "../../config/firebase";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useMusic } from "../provider/MusicProvider";

const Music_Login_Form = () => {
  const { setCurrentUser } = useMusic();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const signIn = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // const email = "abc@gmail.com";
    // const password = "abcdefghijk";
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            Cookies.set("1519NKO", user?.accessToken);
          }
        });
        console.log("Log in success");
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      Music_Login_Form
      <form className="flex" onSubmit={signIn}>
        <input
          ref={emailRef}
          type="email"
          name=""
          id="email"
          placeholder="Email..."
        />
        <input
          ref={passwordRef}
          type="password"
          name=""
          id="password"
          placeholder="Password..."
        />
        <button type="submit">SignIn</button>
      </form>
    </div>
  );
};

export default Music_Login_Form;
