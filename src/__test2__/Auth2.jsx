import React, { useEffect, useRef, useState } from "react";
import { auth, googleProvider, storage } from "../../src/config/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

const Auth2 = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  // const storageRef = ref(storage, "SF");
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
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
            });
          }
        );
      }
    }
  };
  return (
    <div>
      Auth2
      <input
        type="file"
        accept=".mp3"
        onChange={handleFileChange}
        name=""
        id=""
      />
      {uploadProgress > 0 && (
        <div>Upload Progress: {uploadProgress.toFixed(2)}%</div>
      )}
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
};

export default Auth2;
