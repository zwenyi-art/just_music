import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../../config/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Music_Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  // const storageRef = ref(storage, "SF");
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const addNewData = async (music_link) => {
    const newSong = {
      title: "Dax Life_Ok",
      url: music_link,
    };
    const sfDocumentRef = doc(db, "users", "SF");
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
              addNewData(downloadURL);
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
