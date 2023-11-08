import React, { useEffect, useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import Button from "./Button";
import { useMusic } from "./provider/MusicProvider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { CgHello } from "react-icons/cg";
import { getSingle } from "./firebase_auth/Music_Data_Fetch";
const UserLists = () => {
  const { setSelectedUser, songs, setSong } = useMusic();
  const [allUser, setAllUser] = useState([]);
  const [choiceUser, setChoiceUser] = useState();
  const getAllUid = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const citesData = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      citesData.push({ id: doc.id, data: doc.data() });
    });
    setAllUser([...citesData]);
  };

  useEffect(() => {
    getAllUid();
    console.log("component mounted");
  }, []);

  useEffect(() => {
    console.log(allUser);
  }, [allUser]);
  const selectedUser = (user, index) => {
    const userId = user.id;
    setChoiceUser(index);
    console.log("user List", user);
    if (userId) {
      getSingle(setSong, userId);
    }
  };

  return (
    <>
      {allUser?.map((e, index) => {
        return (
          <Button
            onClick={() => selectedUser(e, index)}
            key={e.id}
            className={`hover:bg-slate-400/70 transition-all duration-200 hover:text-white ${
              choiceUser == index ? "bg-blue-400" : ""
            } bg-[#FDFFF5] px-4 py-[7.5px] rounded-md `}
          >
            <IoPersonCircleSharp size={25}></IoPersonCircleSharp>
            <span>Zar Ni</span>
          </Button>
        );
      })}
    </>
  );
};

export default UserLists;
