import React, { useRef, useState } from 'react';

const Camera = ({ setImageSrc }) => {
  const fileInputRef = useRef(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size exceeds 10MB. Please select a smaller file.');
        return;
      }
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
    <div className="flex flex-col items-center space-y-4 p-4 w-full max-w-sm mx-auto">
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
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-transform transform hover:scale-105 text-4xl font-extrabold text-center"
          >
            k<span className="text-pink-500">A</span>le<span className="text-pink-500">I</span>doscope
          </button>
        </>
      )}
    </div>
  );
};

export default Camera;