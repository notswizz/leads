import React, { useState } from 'react';
import Camera from '../components/Camera';
import Upload from '../components/Upload';
import Transcribe from '../components/Transcribe';
import GenerateImage from '../components/GenerateImage';
import { ClipLoader } from 'react-spinners';

const Home = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [generatedImageSrc, setGeneratedImageSrc] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-4xl font-extrabold text-center text-gray-900">Image Capture and Processing</h1>
         
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <Camera setImageSrc={setImageSrc} isImageSelected={isImageSelected} />
          <Upload imageSrc={imageSrc} setImageUrl={setImageUrl} setIsImageSelected={setIsImageSelected} />
          <Transcribe imageUrl={imageUrl} setTranscription={setTranscription} setIsTranscribing={setIsTranscribing} />
          <GenerateImage transcription={transcription} setGeneratedImageSrc={setGeneratedImageSrc} />
          {isTranscribing && (
            <div className="w-full flex justify-center">
              <ClipLoader color="#09f" />
            </div>
          )}
          {transcription && (
            <div className="text-center mt-4 p-4 bg-gray-100 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Transcription:</h2>
              <p className="mt-2 text-gray-700">{transcription}</p>
            </div>
          )}
          {generatedImageSrc && (
            <div className="text-center mt-4 p-4 bg-gray-100 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Generated Image:</h2>
              <div className="border-4 border-dashed border-blue-500 p-2 rounded-lg">
                <img src={generatedImageSrc} alt="Generated" className="mt-2 mx-auto rounded-lg shadow-lg" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;