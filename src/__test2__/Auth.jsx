import React, { useEffect, useRef, useState } from "react";
import { auth, googleProvider, db } from "../../src/config/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  FieldValue,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import MusicProvider, { useMusic } from "../components/provider/MusicProvider";
const Auth = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const messageRef = useRef(null);
  const [currentUser, setCurrentUser] = useState("");
  const [myData, setMyData] = useState([]);
  const [musicList, setMusicList] = useState([]);
  const register = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(() =>
        console.log("SignIn success")
      );
    } catch (error) {
      console.log(error);
    }
  };
  const signIn = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // const email = "abc@gmail.com";
    // const password = "abcdefghijk";
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() =>
        console.log("Log in success")
      );
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth).then(() => console.log("logout Success"));
    } catch (error) {
      console.error(error);
    }
  };

  // const addData = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), {
  //       first: "Ada",
  //       last: "Lovelace",
  //       born: 1815,
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (error) {
  //     console.error("Error adding document: ", error);
  //   }
  // };

  // const addData = async () => {
  //   const newItem = {
  //     message: messageRef.current.value,
  //     ownerId: currentUser.uid,
  //   };

  //   try {
  //     const docRef = await addDoc(collection(db, "users"), newItem);
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (error) {
  //     console.error("Error adding document: ", error);
  //   }
  // };

  // const addData = () => {
  //   if (currentUser) {
  //     const newItem = {
  //       message: messageRef.current.value,
  //     };
  //     addDoc(collection(db, `users/${currentUser?.uid}/data`), newItem).then(
  //       () => {
  //         console.log("Post Success");
  //       }
  //     );
  //   }
  // };

  const getData = async () => {
    try {
      // const dbCollection = collection(db, "users"),where(
      //   "ownerId",
      //   "==",
      //   currentUser
      // );
      // onSnapshot(dbCollection, (snapShot) => {
      //   const newData = snapShot.docs.map((doc) => {
      //     console.log("Current Data", doc.data());
      //   });
      // });
      const q = query(
        collection(db, "users"),
        where("ownerId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setMyData([...myData, doc.data()]);
      });
    } catch (error) {
      if (error.code === "Missing or insufficient permissions.") {
        console.log(
          "Permission denied. You do not have access to this resource."
        );
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  const currentAuth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      getData();
    }
  }, [currentUser]);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     console.log(currentUser?.uid);
  //     onSnapshot(
  //       collection(db, `users/${currentUser?.uid}/data`),
  //       (resp) => {
  //         console.log("getdata");
  //         setMyData(
  //           resp.docs.map((item) => {
  //             return item.data();
  //           })
  //         );
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   });
  // }, []);
  useEffect(() => {
    console.log(myData);
  }, [myData]);

  //testing
  const addData = async () => {
    const citiesRef = collection(db, "users");
    await setDoc(doc(citiesRef, "SF"), {
      id: currentUser.uid,
      music: [
        {
          title: "Dax Life",
          url: "https://firebasestorage.googleapis.com/v0/b/justmusic-c1a49.appspot.com/o/audio%2F%E1%80%82%E1%80%AE%E1%80%90%E1%80%AC%E1%80%90%E1%80%AE%E1%80%B8%E1%80%95%E1%80%B1%E1%80%AB%E1%80%B7%E1%80%80%E1%80%AD%E1%80%AF%E1%80%80%E1%80%AD%E1%80%AF%E1%80%9B%E1%80%9A%E1%80%BA_cover_by_Thadar_Nann_Htike_%E1%80%9E%E1%80%92%E1%80%B9%E1%80%92%E1%80%AB%E1%80%94%E1%80%94_G6Q-GSlANVg_140.mp3?alt=media&token=adba6e8c-21c2-440f-9736-3b3a0961d5d0",
        },
      ],
    });
  };

  const addNewData = async () => {
    const newSong = {
      title: "Dax Life_Ok",
      url: messageRef.current.value,
    };
    const sfDocumentRef = doc(db, "users", "SF");
    const dataToUpdate = {
      music: arrayUnion(newSong),
    };
    await updateDoc(sfDocumentRef, dataToUpdate);
  };
  const getAllUid = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const citesData = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      citesData.push({ id: doc.id, data: doc.data() });
    });
    setMyData([...citesData]);
  };
  const getSingle = async () => {
    const musicData = [];
    const q = query(
      collection(db, "users"),
      where("id", "==", "GSnrl4I9zKW5AggAODGs484rSj03")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      musicData.push(doc.data().music);
    });
    console.log(musicData);
    setSong([...musicData[0]]);
  };
  // useEffect(() => {
  //   console.log(musicList);
  //   const result = musicList.map((data) => {
  //     console.log("Hello", data.name);
  //     console.log(data.song_url);
  //     // setSong([...song, data.song_url]);
  //   });
  // }, [musicList]);

  const { songs, setSong } = useMusic();
  return (
    <div>
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
      <input
        type="text"
        name=""
        id=""
        ref={messageRef}
        placeholder="Message Here"
      />
      <h1>{currentUser?.email}</h1>
      {myData.map((e) => (
        <div key={e.id}>{e?.id}</div>
      ))}
      <button onClick={logout}>Logout</button>
      <button onClick={addData}>Add Doc</button>
      <button onClick={getData}>GetData</button>
      <button onClick={getAllUid}>Get All Users Id</button>
      <button onClick={getSingle}>Get Single</button>
      <button onClick={addNewData}>Add</button>
    </div>
  );
};

export default Auth;
