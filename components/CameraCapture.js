import React, { useState, useRef } from 'react';

const CameraCapture = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [generatedImageSrc, setGeneratedImageSrc] = useState(null);
  const [transcription, setTranscription] = useState('');
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

  const uploadImage = async (imageDataUrl) => {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageDataUrl }),
    });

    const data = await response.json();
    return data.imageUrl;
  };

  const transcribeImage = async (imageUrl) => {
    const response = await fetch('/api/transcribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await response.json();
    return data.transcription;
  };

  const generateImage = async (prompt) => {
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    return data.imageUrl;
  };

  const handleImageUpload = async () => {
    if (imageSrc) {
      const imageUrl = await uploadImage(imageSrc);
      console.log('Image uploaded to:', imageUrl);

      const transcription = await transcribeImage(imageUrl);
      console.log('Transcription:', transcription);
      setTranscription(transcription);

      const generatedImageUrl = await generateImage(transcription);
      console.log('Generated Image URL:', generatedImageUrl);
      setGeneratedImageSrc(generatedImageUrl);
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={takePicture}>Take Picture</button>
      {imageSrc && (
        <>
          <img src={imageSrc} alt="Captured" />
          <button onClick={handleImageUpload}>Upload Image</button>
        </>
      )}
      {transcription && (
        <>
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </>
      )}
      {generatedImageSrc && (
        <>
          <h2>Generated Image:</h2>
          <img src={generatedImageSrc} alt="Generated" />
        </>
      )}
    </div>
  );
};

export default CameraCapture;
