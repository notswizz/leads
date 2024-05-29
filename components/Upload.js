import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { compressImage } from '../utils/compress';

const Upload = ({ imageSrc, setImageUrl, setIsImageSelected, setSelectedFilter }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedFilter, setSelectedFilterLocal] = useState('');

  const uploadImage = async () => {
    setIsUploading(true);
    console.log('Uploading image...');
    try {
      const compressedBase64Image = await compressImage(imageSrc); // Compress image before upload
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: compressedBase64Image, filter: selectedFilter }),
      });

      const data = await response.json();
      console.log('Image uploaded:', data.imageUrl);
      setImageUrl(data.imageUrl);
      setIsUploaded(true);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setSelectedFilterLocal(filter);
    setSelectedFilter(filter); // Update the filter in the Home component
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4 w-full">
      {imageSrc && !isUploaded && !isUploading && (
        <>
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="w-full max-w-md px-4 py-2 rounded-lg shadow transition bg-white border border-gray-300"
          >
            <option value="">Select a filter</option>
            <option value="trippy 420">Trippy 420</option>
<option value="american pride">American Pride</option>
<option value="realistic">Realistic</option>
<option value="vintage vibes">Vintage Vibes</option>
<option value="futuristic tech">Futuristic Tech</option>
<option value="dreamy pastel">Dreamy Pastel</option>
<option value="dark noir">Dark Noir</option>
<option value="pop art">Pop Art</option>
<option value="minimalist zen">Minimalist Zen</option>

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
