import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../../config/firebase";
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useMusic } from "../provider/MusicProvider";
import { useNavigate } from "react-router-dom";

const Music_Upload = () => {
  const { songs, currentUser } = useMusic();
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  // const storageRef = ref(storage, "SF");
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const addData = async (music_link) => {
    const citiesRef = collection(db, "users");
    await setDoc(doc(citiesRef, currentUser?.uid), {
      id: currentUser?.uid,
      music: [
        {
          title: file?.name.replace(".mp3", ""),
          url: music_link,
        },
      ],
    });
  };
  const addNewData = async (music_link) => {
    const newSong = {
      title: file?.name.replace(".mp3", ""),
      url: music_link,
    };
    const sfDocumentRef = doc(db, "users", currentUser?.uid);
    const dataToUpdate = {
      music: arrayUnion(newSong),
    };
    await updateDoc(sfDocumentRef, dataToUpdate);
  };
  const handleFileUpload = async () => {
    if (file) {
      const allowedExtensions = ["mp3"];
      const extension = file.name.split(".").pop().toLowerCase();
      if (allowedExtensions.includes(extension)) {
        const storageRef = ref(storage, "audio/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        // console.log("File uploaded to:", downloadURL);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            alert("Unsuccessfully");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log(downloadURL);
              if (songs.length > 0) {
                addNewData(downloadURL);
              } else {
                addData(downloadURL);
              }
            });
          }
        );
      }
    }
  };
  return (
    <div>
      Music_Upload ==
      <input
        type="file"
        accept=".mp3"
        onChange={handleFileChange}
        name=""
        id=""
      />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
};

export default Music_Upload;
