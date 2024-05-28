import React, { useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const Camera = ({ setImageSrc, isImageSelected }) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('Image selected:', e.target.result);
        setImageSrc(e.target.result);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {!isLoading && !isImageSelected && (
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Select Picture
        </button>
      )}
      {isLoading && <ClipLoader color="#09f" />}
    </div>
  );
};

export default Camera;