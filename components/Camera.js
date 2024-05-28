import React, { useRef } from 'react';

const Camera = ({ setImageSrc }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target.result;
        setImageSrc(base64Image);

        // Upload the image
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64Image }),
        });

        const uploadData = await uploadResponse.json();
        if (uploadResponse.ok) {
          const imageUrl = uploadData.imageUrl;

          // Transcribe the uploaded image
          const transcribeResponse = await fetch('/api/transcribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl }),
          });

          const transcribeData = await transcribeResponse.json();
          if (transcribeResponse.ok) {
            console.log('Transcription:', transcribeData.transcription);
          } else {
            console.error('Error transcribing image:', transcribeData.error);
          }
        } else {
          console.error('Error uploading image:', uploadData.error);
        }
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