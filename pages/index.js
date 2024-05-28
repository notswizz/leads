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
  const [showGeneratedImage, setShowGeneratedImage] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  const toggleImage = () => {
    setShowGeneratedImage(!showGeneratedImage);
  };

  const startOver = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-md w-full space-y-2 relative">
        <div className="flex justify-between items-center">
         
          {generatedImageSrc && (
            <button
              onClick={startOver}
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition absolute top-0 right-0 mt-2 mr-2"
            >
              Start Over
            </button>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-2">
          <Camera setImageSrc={setImageSrc} isImageSelected={isImageSelected} />
          <Upload imageSrc={imageSrc} setImageUrl={setImageUrl} setIsImageSelected={setIsImageSelected} setSelectedFilter={setSelectedFilter} />
          {imageSrc && (
            <div className="text-center mt-4 p-4 bg-gray-100 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">AI Image:</h2>
              <div className={`border-4 p-2 rounded-lg ${showGeneratedImage ? 'border-dashed border-blue-500' : 'border-solid border-green-500'}`}>
                <img
                  src={showGeneratedImage && generatedImageSrc ? generatedImageSrc : imageSrc}
                  alt={showGeneratedImage && generatedImageSrc ? 'Generated' : 'Original'}
                  className="mt-2 mx-auto rounded-lg shadow-lg"
                />
              </div>
              {generatedImageSrc && (
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    onClick={toggleImage}
                    className={`px-4 py-2 rounded-lg shadow transition ${showGeneratedImage ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  >
                    {showGeneratedImage ? 'Show Original' : 'Show AI'}
                  </button>
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow hover:from-purple-600 hover:to-pink-600 transition"
                  >
                    Post to Dope Scopes
                  </button>
                </div>
              )}
            </div>
          )}
          <Transcribe imageUrl={imageUrl} setTranscription={setTranscription} setIsTranscribing={setIsTranscribing} />
          <GenerateImage transcription={transcription} filter={selectedFilter} setGeneratedImageSrc={setGeneratedImageSrc} />
          {isTranscribing && (
            <div className="w-full flex justify-center">
              <ClipLoader color="#09f" />
            </div>
          )}
          {transcription && (
            <div className="text-center mt-4 p-4 bg-gray-100 rounded-lg shadow-lg max-h-32 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-2">Transcription:</h2>
              <p className="mt-2 text-gray-700">{transcription}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;