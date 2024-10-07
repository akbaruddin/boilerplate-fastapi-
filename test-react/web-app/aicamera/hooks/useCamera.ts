import { useState, useEffect, useRef } from "react";

interface UseCameraOptions {
    debugMode?: boolean;
  }

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  capturedImageBlob: Blob | null;
  captureImage: () => Promise<Blob>;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  error: string | null;
}

export function useCamera({ debugMode = false }: UseCameraOptions): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [capturedImageBlob, setCapturedImageBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: debugMode ? undefined : { exact: "environment" }, // Back camera
          width: { ideal: 9999 }, // Request 4K resolution
          height: { ideal: 9999 }, // Request 4K resolution
          frameRate: { ideal: 60 }, // Ideal frame rate
          aspectRatio: 16 / 9, // Maintain 16:9 aspect ratio
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setStream(newStream);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        "Camera access failed. Please ensure camera permissions are granted."
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const captureImage = (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      if (!videoRef.current)
        return reject(new Error("No video feed available"));

      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      alert(JSON.stringify({ width: videoRef.current.videoWidth, height: videoRef.current.videoHeight }))

      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCapturedImageBlob(blob);
              resolve(blob);
            } else {
              reject(new Error("Failed to capture image"));
            }
          },
          "image/jpeg",
          1.0
        ); // High-quality JPEG
      } else {
        reject(new Error("Failed to get canvas context"));
      }
    });
  };

  useEffect(() => {
    return () => stopCamera(); // Stop the camera when the component unmounts
  }, []);

  return {
    videoRef,
    capturedImageBlob,
    captureImage,
    startCamera,
    stopCamera,
    error,
  };
}
