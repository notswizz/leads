import React, { useEffect } from 'react';

const GenerateImage = ({ transcription, setGeneratedImageSrc }) => {
  useEffect(() => {
    const generateImage = async () => {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: transcription }),
      });

      const data = await response.json();
      setGeneratedImageSrc(data.imageUrl);
    };

    if (transcription) {
      generateImage();
    }
  }, [transcription, setGeneratedImageSrc]);

  return null;
};

export default GenerateImage;
