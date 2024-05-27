import React from 'react';

const Upload = ({ imageSrc, setImageUrl }) => {
  const uploadImage = async () => {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageSrc }),
    });

    const data = await response.json();
    setImageUrl(data.imageUrl);
  };

  return (
    <div>
      {imageSrc && (
        <>
          <img src={imageSrc} alt="Captured" />
          <button onClick={uploadImage}>Upload Image</button>
        </>
      )}
    </div>
  );
};

export default Upload;
