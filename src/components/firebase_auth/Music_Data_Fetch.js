import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../config/firebase";
import { useMusic } from "../provider/MusicProvider";

const GetData = async (setMyData) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const citesData = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    citesData.push({ id: doc.id, data: doc.data() });
  });
  setMyData([...citesData]);
};
export const getSingle = async (setSong, currentUser) => {
  const musicData = [];
  const queryCondition = currentUser?.uid
    ? where("id", "==", currentUser?.uid)
    : where("id", "==", currentUser);
  const q = query(collection(db, "users"), queryCondition);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    musicData.push(doc.data().music);
  });
  // console.log(musicData);
  if (musicData.length > 0) {
    setSong([...musicData[0]]);
  }
};
export default GetData;
