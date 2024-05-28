import React, { useRef, useState } from 'react';

const Camera = ({ setImageSrc }) => {
  const fileInputRef = useRef(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('Image selected:', e.target.result);
        setImageSrc(e.target.result);
        setIsImageSelected(true);
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
      {!isImageSelected && (
        <>
        
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-transform transform hover:scale-105"
          >
            Select Picture
          </button>
        </>
      )}
    </div>
  );
};

export default Camera;