// components/Post.js
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const Post = ({ imageUrl, generatedImageSrc, transcription }) => {
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    setIsPosting(true);
    try {
      // Save post data to MongoDB
      const postResponse = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl, generatedImageUrl: generatedImageSrc, transcription }),
      });

      const postData = await postResponse.json();
      if (postData.success) {
        alert('Post created successfully!');
      } else {
        alert('Error creating post');
      }
    } catch (error) {
      console.error('Error posting:', error);
      alert('Error creating post');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={handlePost}
        disabled={isPosting}
        className={`px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow hover:from-purple-600 hover:to-pink-600 transition ${isPosting ? 'cursor-not-allowed' : ''}`}
      >
        {isPosting ? 'Posting...' : 'Post to Dope Scopes'}
      </button>
      {isPosting && <ClipLoader color="#09f" />}
    </div>
  );
};

export default Post;
