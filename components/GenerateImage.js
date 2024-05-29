import React, { useEffect } from 'react';

const GenerateImage = ({ transcription, filter, setGeneratedImage }) => {
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
        setGeneratedImage({ imageUrl: data.imageUrl, filter: filter });
      } catch (error) {
        console.error('Error generating image:', error);
      }
    };

    if (transcription) {
      generateImage();
    }
  }, [transcription, filter, setGeneratedImage]);

  return null;
};

export default GenerateImage;
