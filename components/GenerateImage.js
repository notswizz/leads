import React, { useEffect } from 'react';

const GenerateImage = ({ transcription, filter, setGeneratedImageSrc }) => {
  useEffect(() => {
    const generateImage = async () => {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: transcription, filter: filter }),
      });

      const data = await response.json();
      setGeneratedImageSrc(data.imageUrl);
    };

    if (transcription) {
      generateImage();
    }
  }, [transcription, filter, setGeneratedImageSrc]);

  return null;
};

export default GenerateImage;