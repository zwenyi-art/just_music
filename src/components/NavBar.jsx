import React from "react";
import { ImMenu } from "react-icons/im";
const NavBar = ({ setShow }) => {
  return (
    <div className="fixed py-3 bg-indigo-50 top-0 max-w-sm w-full h-fit flex flex-row justify-between items-center px-4">
      <button
        className="cursor-default"
        onClick={() => setShow((show) => !show)}
      >
        <ImMenu className="text-2xl"></ImMenu>
      </button>
      <div className="text-black text-xl">jk@gmail.com</div>
    </div>
  );
};

export default NavBar;
