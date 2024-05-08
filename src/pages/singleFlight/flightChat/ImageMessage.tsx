import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import imageCompression, { Options } from "browser-image-compression";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "@/firebase.config";
import dayjs from "dayjs";

const ImageMessage = () => {
  const { flightID } = useParams();
  if (flightID == undefined || "") {
    return <div>A problem occured</div>;
  }

  const InputImageRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileURL, setImageFileURL] = useState("");

  const CompressionOptions: Options = {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/jpeg",
  };

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.target.files) {
      const image = event.target.files[0];
      if (image) {
        const compressedFile = await imageCompression(
          image,
          CompressionOptions
        );
        setImageFile(compressedFile);
        setImageFileURL(URL.createObjectURL(compressedFile));
      }
    }
  };

  const user = "amir";

  const uploadImageToDB = () => {
    console.log(imageFileURL);
    if (imageFile) {
      const storage = getStorage(app);
      const ImageName = `flightId:${flightID}, user:${user}, date:${dayjs().unix()}`;
      const firebaseStorageRef = ref(storage, ImageName);

      const uploadTask = uploadBytesResumable(firebaseStorageRef, imageFile);
      uploadTask.on("state_changed", null, null, async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setImageFileURL(url);
        console.log(url);
      });
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImageToDB();
    }
  }, [imageFile]);

  return (
    <div
      onClick={() => InputImageRef.current?.click()}
      className="w-8  h-[55px] bg-blue rounded-md shadow-sm flex justify-center items-center cursor-pointer "
    >
      <img src="/camera-solid.svg" className="w-1/2" alt="" />
      <input
        type="file"
        className=" "
        hidden
        ref={InputImageRef}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageMessage;
