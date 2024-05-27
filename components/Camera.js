import React, { useRef } from 'react';

const Camera = ({ setImageSrc }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const takePicture = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const imageDataUrl = canvasRef.current.toDataURL('image/png');
    setImageSrc(imageDataUrl);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-lg">
        <video ref={videoRef} autoPlay className="w-full rounded-lg" />
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={startCamera}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Start Camera
        </button>
        <button
          onClick={takePicture}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          Take Picture
        </button>
      </div>
    </div>
  );
};

export default Camera;
