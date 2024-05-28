import React, { useEffect } from 'react';

const Transcribe = ({ imageUrl, setTranscription, setIsTranscribing }) => {
  useEffect(() => {
    const transcribeImage = async () => {
      setIsTranscribing(true);
      console.log('Transcribing image...');
      try {
        const response = await fetch('/api/transcribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl }),
        });

        const data = await response.json();
        console.log('Transcription received:', data.transcription);
        setTranscription(data.transcription);
      } catch (error) {
        console.error('Error transcribing image:', error);
      } finally {
        setIsTranscribing(false);
      }
    };

    if (imageUrl) {
      transcribeImage();
    }
  }, [imageUrl, setTranscription, setIsTranscribing]);

  return null;
};

export default Transcribe;