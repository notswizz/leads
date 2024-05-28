import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const Upload = ({ imageSrc, setImageUrl, setIsImageSelected }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const uploadImage = async () => {
    setIsUploading(true);
    setIsImageSelected(true); // Hide the "Select Picture" button
    console.log('Starting upload...');
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageSrc }),
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      setImageUrl(data.imageUrl);
      setIsUploaded(true);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4 w-full">
      {imageSrc && (
        <>
          <img
            src={imageSrc}
            alt="Selected"
            className="w-full max-w-md rounded-lg shadow-lg object-cover"
          />
          {!isUploaded && !isUploading && (
            <button
              onClick={uploadImage}
              disabled={isUploading}
              className={`w-full max-w-md px-4 py-2 rounded-lg shadow transition ${
                isUploading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </button>
          )}
          {isUploading && <ClipLoader color="#09f" />}
        </>
      )}
    </div>
  );
};

export default Upload;