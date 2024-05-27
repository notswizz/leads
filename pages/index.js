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
    <div>
      <Camera setImageSrc={setImageSrc} />
      <Upload imageSrc={imageSrc} setImageUrl={setImageUrl} />
      <Transcribe imageUrl={imageUrl} setTranscription={setTranscription} />
      <GenerateImage transcription={transcription} setGeneratedImageSrc={setGeneratedImageSrc} />
      {transcription && (
        <div>
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      )}
      {generatedImageSrc && (
        <div>
          <h2>Generated Image:</h2>
          <img src={generatedImageSrc} alt="Generated" />
        </div>
      )}
    </div>
  );
};

export default Home;
