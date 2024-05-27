import React from 'react';

const Camera = ({ setImageSrc }) => {
  const fileInputRef = React.useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-lg">
        {fileInputRef.current && fileInputRef.current.files.length > 0 && (
          <img
            src={URL.createObjectURL(fileInputRef.current.files[0])}
            alt="Captured"
            className="w-full rounded-lg"
          />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        Take Picture
      </button>
    </div>
  );
};

export default Camera;
