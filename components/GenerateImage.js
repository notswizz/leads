import React, { useEffect } from 'react';

const GenerateImage = ({ transcription, filter, setGeneratedImageSrc }) => {
  useEffect(() => {
    const generateImage = async () => {
      try {
        const response = await fetch('/api/generate-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: transcription, filter: filter }),
        });

        if (!response.ok) {
          throw new Error('Error generating image');
        }

        const data = await response.json();
        setGeneratedImageSrc(data.imageUrl);
      } catch (error) {
        console.error('Error generating image:', error);
      }
    };

    if (transcription) {
      generateImage();
    }
  }, [transcription, filter, setGeneratedImageSrc]);

  return null;
};

export default GenerateImage;