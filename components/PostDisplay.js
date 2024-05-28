import React, { useState, useEffect } from 'react';

const PostDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [showGeneratedImages, setShowGeneratedImages] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/getPosts');
        const data = await response.json();
        if (data.success) {
          setPosts(data.posts);
          const initialShowGeneratedImages = data.posts.reduce((acc, post) => {
            acc[post._id] = true; // Show AI image by default
            return acc;
          }, {});
          setShowGeneratedImages(initialShowGeneratedImages);
        } else {
          console.error('Error fetching posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const toggleImage = (postId) => {
    setShowGeneratedImages((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-h-80 overflow-y-auto p-4 bg-gray-900 rounded-lg shadow-inner">
      <button
        onClick={() => setShowPostFeed(!showPostFeed)}
        className="w-full px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-full shadow-md hover:from-gray-600 hover:to-gray-800 transition-transform transform hover:scale-105 text-xl font-bold text-center border-2 border-gray-600 overflow-hidden mb-4"
      >
      
      </button>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <div className={`border-4 p-2 rounded-lg ${showGeneratedImages[post._id] ? 'border-dashed border-blue-500' : 'border-solid border-green-500'}`}>
              <img
                src={showGeneratedImages[post._id] ? post.generatedImageUrl : post.imageUrl}
                alt={showGeneratedImages[post._id] ? 'Generated' : 'Original'}
                className="mt-2 mx-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => toggleImage(post._id)}
                className={`w-full px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-full shadow-md hover:from-gray-600 hover:to-gray-800 transition-transform transform hover:scale-105 text-xl font-bold text-center border-2 border-gray-600 overflow-hidden`}
              >
                <div className="relative whitespace-nowrap">
                  {showGeneratedImages[post._id] ? 'Show Original' : 'Show AI'}
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDisplay;