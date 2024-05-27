import React, { useState } from 'react';
import Camera from '../components/Camera';
import Upload from '../components/Upload';
import Transcribe from '../components/Transcribe';
import GenerateImage from '../components/GenerateImage';

const Home = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [generatedImageSrc, setGeneratedImageSrc] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">AI Photo</h1>
        <Camera setImageSrc={setImageSrc} />
        <Upload imageSrc={imageSrc} setImageUrl={setImageUrl} />
        <Transcribe imageUrl={imageUrl} setTranscription={setTranscription} />
        <GenerateImage transcription={transcription} setGeneratedImageSrc={setGeneratedImageSrc} />
        {transcription && (
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold">Transcription:</h2>
            <p className="mt-2">{transcription}</p>
          </div>
        )}
        {generatedImageSrc && (
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold">Generated Image:</h2>
            <img src={generatedImageSrc} alt="Generated" className="mt-2 mx-auto rounded-lg shadow-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
