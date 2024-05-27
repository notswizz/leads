import React, { useEffect } from 'react';

const Transcribe = ({ imageUrl, setTranscription }) => {
  useEffect(() => {
    const transcribeImage = async () => {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await response.json();
      setTranscription(data.transcription);
    };

    if (imageUrl) {
      transcribeImage();
    }
  }, [imageUrl, setTranscription]);

  return null;
};

export default Transcribe;
