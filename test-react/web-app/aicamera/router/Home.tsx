import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import PouchDB from "pouchdb";
import { toast } from "sonner";
import { motion } from "framer-motion";
import useAuthStore from "../stores/useAuthStore";
import { useEffect, useState } from "react";
import { useCamera } from "../hooks/useCamera";

const Home = () => {
  const { t } = useTranslation();
  const db = new PouchDB("my_database");
  const login = useAuthStore((state) => state.login);
  const {
    videoRef,
    capturedImageBlob,
    captureImage,
    startCamera,
    stopCamera,
    error,
  } = useCamera({ debugMode: false });
  const [imageURL, setImageURL] = useState<string | null>(null);
  const query = useQuery({
    queryKey: ["todo"],
    queryFn: async () => {
      try {
        const response = await axios.get("https://api.github.com/users/mapbox");
        toast.success("This is a sonner toast");
        return response.data;
      } catch (error) {
        // Handle error
        console.error(error);
      }
    },
  });

  const handleCapture = async () => {
    try {
      const blob = await captureImage();
      console.log(blob);
      const url = URL.createObjectURL(blob);
      setImageURL(url);
    } catch (err) {
      console.error('Failed to capture image:', err);
    }


  };



  return (
    <div>
      <h2>{t("Welcome to React")}</h2>
      <button onClick={() => login()}>login</button>
      <a href="#/">Home</a>
      <a href="#/about">About</a>
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        className="w-40 h-40 bg-black"
      />
      <div className="flex flex-col items-center bg-gray-900 text-white h-[calc(100vh-10rem)] p-4">
        {error && <p className="text-red-500">{error}</p>}

        <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="rounded-lg max-w-full"
          ></video>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300">
            <p className="text-white text-center">Live Camera Feed</p>
          </div>
        </div>

        <div className="mt-6 space-x-4">
          <button
            onClick={handleCapture}
            className="px-4 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Capture Image
          </button>
          <button
            onClick={startCamera}
            className="px-4 py-2 bg-green-600 rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Start Camera
          </button>
          <button
            onClick={stopCamera}
            className="px-4 py-2 bg-red-600 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Stop Camera
          </button>
        </div>

        {imageURL && (
          <div className="mt-6">
            <p className="text-lg font-semibold">Captured Image:</p>
            <img
              src={imageURL}
              alt="Captured"
              className="mt-4 rounded-lg shadow-lg max-w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
