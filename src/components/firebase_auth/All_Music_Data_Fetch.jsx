import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { useMusic } from "../provider/MusicProvider";
import { Navigate, useNavigate } from "react-router-dom";

const All_Music_Data_Fetch = () => {
  const { setSelectedUser } = useMusic();
  const [allUser, setAllUser] = useState([]);
  const navigate = useNavigate();
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
  }, []);

  useEffect(() => {
    console.log(allUser);
  }, [allUser]);
  const selectedUser = (user) => {
    const id = user.id;
    console.log(user);
    setSelectedUser(user);
    navigate(id);
  };
  const myProfile = () => {
    navigate("/profile");
  };
  return (
    <div>
      All_Music_Data_Fetch
      <button onClick={() => myProfile()}>My Profile</button>
      {allUser?.map((e) => (
        <div key={e.id} onClick={() => selectedUser(e)}>
          {e.id}
        </div>
      ))}
    </div>
  );
};

export default All_Music_Data_Fetch;
