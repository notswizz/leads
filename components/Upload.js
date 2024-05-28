import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const Upload = ({ imageSrc, setImageUrl }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  const uploadImage = async () => {
    setIsUploading(true);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: 'a white siamese cat', filter: selectedFilter }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
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
      {imageSrc && !isUploaded && !isUploading && (
        <>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg shadow transition bg-white border border-gray-300"
          >
            <option value="">Select a filter</option>
            <option value="trippy 420">Trippy 420</option>
            <option value="old timey retro">Old Timey Retro</option>
            <option value="american pride">American Pride</option>
            <option value="purple">Purple</option>
          </select>
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
        </>
      )}
      {isUploading && <ClipLoader color="#09f" />}
    </div>
  );
};

export default Upload;